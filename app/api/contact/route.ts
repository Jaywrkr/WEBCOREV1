import {NextResponse} from "next/server";
import {z} from "zod";
import {interests} from "@/content/services";
import {site} from "@/content/site";

/* Receptor del formulario. Dos canales, en este orden:
   1. Correo por Resend, si existe RESEND_API_KEY. Destino CONTACT_TO
      (por defecto el correo de la empresa) y remitente CONTACT_FROM, que debe
      pertenecer a un dominio verificado en Resend.
   2. CONTACT_ENDPOINT, un receptor HTTP propio o de un CRM (token opcional
      en CONTACT_ENDPOINT_TOKEN).
   Contrato de respuesta:
   400  cuerpo inválido o campos que no cumplen el esquema.
   429  demasiadas solicitudes desde la misma dirección en poco tiempo.
   503  ningún canal configurado; el cliente ofrece enviar por correo.
   502  el canal respondió con error o no fue alcanzable.
   504  el canal no respondió a tiempo (10 s).
   200  {ok:true} cuando el canal aceptó la solicitud.
   El campo trampa "website" relleno devuelve 200 sin reenviar nada. */

const slugs = interests.map(s => s.slug) as [string, ...string[]];
const optional = (max: number) => z.string().trim().max(max).optional().or(z.literal(""));

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.email().max(200),
  company: z.string().trim().min(1).max(160),
  message: z.string().trim().min(1).max(3000),
  service: z.enum(slugs).optional().or(z.literal("")),
  role: optional(120),
  phone: optional(40),
  website: optional(200),
});

type Data = Omit<z.infer<typeof schema>, "website">;

/* Límite básico por dirección dentro de la misma instancia. */
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter(t => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const esc = (s: string) => s.replace(/[&<>"]/g, c => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;"})[c] as string);

function compose(d: Data) {
  const service = interests.find(s => s.slug === d.service)?.title ?? "No indicado";
  const rows: [string, string][] = [
    ["Nombre", d.name], ["Correo", d.email], ["Empresa", d.company], ["Servicio de interés", service],
    ["Cargo", d.role || "-"], ["Teléfono", d.phone || "-"],
  ];
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n") + `\n\n${d.message}\n\n— Enviado desde el formulario de ${site.url}`;
  const html = `<p>${rows.map(([k, v]) => `<b>${k}:</b> ${esc(v)}`).join("<br>")}</p><p style="white-space:pre-wrap">${esc(d.message)}</p><p style="color:#888">— Enviado desde el formulario de ${esc(site.url)}</p>`;
  return {subject: `Solicitud de evaluación: ${d.company}`, text, html};
}

class Upstream extends Error {}

async function send(d: Data): Promise<"sent" | "none"> {
  const key = process.env.RESEND_API_KEY;
  if (key) {
    const {subject, text, html} = compose(d);
    const r = await fetch(process.env.RESEND_API_URL || "https://api.resend.com/emails", {
      method: "POST",
      headers: {Authorization: "Bearer " + key, "Content-Type": "application/json"},
      body: JSON.stringify({
        from: process.env.CONTACT_FROM || "Coresolutions Web <web@coresolutions.com.ec>",
        to: [process.env.CONTACT_TO || site.email],
        reply_to: d.email,
        subject, text, html,
      }),
      signal: AbortSignal.timeout(10000),
      cache: "no-store",
    });
    if (!r.ok) { console.error("contact: resend", r.status, await r.text().catch(() => "")); throw new Upstream(); }
    return "sent";
  }
  const endpoint = process.env.CONTACT_ENDPOINT;
  if (endpoint) {
    const headers: Record<string, string> = {"Content-Type": "application/json"};
    if (process.env.CONTACT_ENDPOINT_TOKEN) headers.Authorization = "Bearer " + process.env.CONTACT_ENDPOINT_TOKEN;
    const r = await fetch(endpoint, {
      method: "POST", headers,
      body: JSON.stringify({...d, receivedAt: new Date().toISOString(), source: "coresolutions-web"}),
      signal: AbortSignal.timeout(10000),
      cache: "no-store",
    });
    if (!r.ok) { console.error("contact: endpoint", r.status); throw new Upstream(); }
    return "sent";
  }
  return "none";
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({error: "Solicitud inválida."}, {status: 400});
  }
  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({error: "Verifique los campos del formulario."}, {status: 400});
  }
  const {website, ...data} = parsed.data;
  if (website) return NextResponse.json({ok: true});

  const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "na";
  if (limited(ip)) {
    return NextResponse.json({error: "Recibimos varias solicitudes seguidas desde su conexión. Espere unos minutos o escríbanos directamente.", fallback: true}, {status: 429});
  }

  try {
    const result = await send(data);
    if (result === "none") {
      return NextResponse.json({error: "El envío automático no está disponible en este momento.", fallback: true}, {status: 503});
    }
    return NextResponse.json({ok: true});
  } catch (error) {
    const timeout = error instanceof Error && (error.name === "TimeoutError" || error.name === "AbortError");
    return NextResponse.json(
      {error: timeout ? "El envío tardó demasiado en responder." : "No fue posible enviar su solicitud en este momento.", fallback: true},
      {status: timeout ? 504 : 502},
    );
  }
}
