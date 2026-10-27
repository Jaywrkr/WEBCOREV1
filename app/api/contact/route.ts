import {NextResponse} from "next/server";
import {z} from "zod";
import {services} from "@/content/services";

/* Receptor del formulario. Contrato:
   400  cuerpo inválido o campos que no cumplen el esquema.
   503  CONTACT_ENDPOINT sin configurar (el sitio aún no recibe solicitudes).
   502  el receptor respondió con error o no fue alcanzable.
   504  el receptor no respondió a tiempo (10 s).
   200  {ok:true} cuando el receptor aceptó la solicitud.
   El campo trampa "website" relleno devuelve 200 sin reenviar nada.
   Cliente y servidor comparten campos: nombre, correo, empresa y mensaje
   obligatorios; servicio, cargo y teléfono opcionales. */

const slugs = services.map(s => s.slug) as [string, ...string[]];
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

  const endpoint = process.env.CONTACT_ENDPOINT;
  if (!endpoint) {
    return NextResponse.json({error: "El formulario todavía no está habilitado para recibir solicitudes. Mientras tanto, escríbanos por los medios indicados en la página."}, {status: 503});
  }

  const headers: Record<string, string> = {"Content-Type": "application/json"};
  if (process.env.CONTACT_ENDPOINT_TOKEN) headers.Authorization = "Bearer " + process.env.CONTACT_ENDPOINT_TOKEN;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify({...data, receivedAt: new Date().toISOString(), source: "coresolutions-web"}),
      signal: AbortSignal.timeout(10000),
      cache: "no-store",
    });
    if (!response.ok) {
      return NextResponse.json({error: "El receptor de solicitudes no pudo registrar su mensaje. Sus datos se conservan en el formulario; inténtelo nuevamente en unos minutos."}, {status: 502});
    }
    return NextResponse.json({ok: true});
  } catch (error) {
    const timeout = error instanceof Error && (error.name === "TimeoutError" || error.name === "AbortError");
    return NextResponse.json(
      {error: timeout
        ? "El receptor tardó demasiado en responder. Sus datos se conservan en el formulario; inténtelo nuevamente."
        : "No fue posible comunicarse con el receptor de solicitudes. Sus datos se conservan en el formulario; inténtelo nuevamente."},
      {status: timeout ? 504 : 502},
    );
  }
}
