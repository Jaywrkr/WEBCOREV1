"use client";
import {useEffect, useRef, useState, type FormEvent} from "react";
import {services} from "@/content/services";

/* Formulario de solicitud de evaluación (dirección, sección 10).
   Campos base: nombre, correo, empresa y descripción de la necesidad.
   Servicio opcional, preseleccionable desde una ficha y editable.
   Cargo y teléfono opcionales.
   Estados: vacío, edición, error por campo, envío, éxito y fallo de recepción.
   Los datos escritos se conservan ante errores; no se puede reenviar durante
   un envío. El éxito no promete reunión ni proyecto: solo recepción. */

type Status = "idle" | "sending" | "sent" | "error";
type Field = "name" | "email" | "company" | "message" | "service" | "role" | "phone";
type Errors = Partial<Record<Field, string>>;

const labels: Record<Field, string> = {
  name: "Nombre", email: "Correo electrónico", company: "Empresa", message: "Qué necesita resolver",
  service: "Servicio de interés", role: "Cargo", phone: "Teléfono",
};

function validate(data: Record<string, string>): Errors {
  const e: Errors = {};
  if (!data.name?.trim()) e.name = "Escriba su nombre.";
  else if (data.name.length > 120) e.name = "El nombre no puede superar 120 caracteres.";
  if (!data.email?.trim()) e.email = "Escriba un correo electrónico.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) e.email = "Revise el formato del correo, por ejemplo nombre@empresa.com.";
  if (!data.company?.trim()) e.company = "Indique la empresa u organización.";
  if (!data.message?.trim()) e.message = "Describa brevemente qué necesita resolver.";
  else if (data.message.length > 3000) e.message = "El mensaje no puede superar 3000 caracteres.";
  if (data.service && !services.some(s => s.slug === data.service)) e.service = "Seleccione un servicio de la lista o deje el campo vacío.";
  if (data.phone && data.phone.trim().length < 6) e.phone = "Si indica un teléfono, escriba al menos 6 dígitos.";
  return e;
}

export function ContactForm({defaultService = ""}: {defaultService?: string}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [serverMessage, setServerMessage] = useState("");
  const summaryRef = useRef<HTMLDivElement>(null);
  const validService = services.some(s => s.slug === defaultService) ? defaultService : "";

  /* Al confirmar, el foco pasa al mensaje de recepción para que un lector de
     pantalla lo anuncie sin recorrer la página. */
  useEffect(() => {
    if (status === "sent") summaryRef.current?.focus();
  }, [status]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    const found = validate(data);
    setErrors(found);
    setServerMessage("");
    if (Object.keys(found).length) {
      setStatus("error");
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(data)});
      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw Error(body.error || "No fue posible enviar la solicitud.");
      setStatus("sent");
      form.reset();
    } catch (error) {
      setStatus("error");
      setServerMessage(error instanceof Error && error.message ? error.message : "No fue posible enviar la solicitud. Sus datos se conservan; inténtelo nuevamente.");
      requestAnimationFrame(() => summaryRef.current?.focus());
    }
  }

  const errorList = (Object.keys(errors) as Field[]).filter(k => errors[k]);
  const describe = (f: Field) => (errors[f] ? f + "-error" : undefined);

  if (status === "sent") {
    return (
      <div className="cf-done" role="status" aria-live="polite" tabIndex={-1} ref={summaryRef}>
        <p className="cf-done-title">Solicitud recibida.</p>
        <p>Su mensaje llegó a Coresolutions. Lo revisaremos y le responderemos al correo indicado para conversar sobre su entorno y el alcance de una evaluación. La recepción no implica una reunión agendada ni un compromiso de proyecto.</p>
        <button type="button" className="btn btn-ghost" onClick={() => {setStatus("idle"); setErrors({});}}>Enviar otra solicitud</button>
      </div>
    );
  }

  return (
    <form className="form-grid cf" onSubmit={submit} noValidate aria-describedby="cf-required-note">
      <p id="cf-required-note" className="cf-note field-full">Los campos marcados con asterisco (*) son obligatorios.</p>

      {(errorList.length > 0 || serverMessage) && (
        <div ref={summaryRef} tabIndex={-1} className="cf-summary field-full" role="alert">
          {serverMessage ? (
            <p>{serverMessage}</p>
          ) : (
            <>
              <p>Revise {errorList.length === 1 ? "el siguiente campo" : "los siguientes campos"}:</p>
              <ul>{errorList.map(f => <li key={f}><a href={"#" + f}>{labels[f]}: {errors[f]}</a></li>)}</ul>
            </>
          )}
        </div>
      )}

      <div>
        <label className="field-label" htmlFor="name">Nombre *</label>
        <input id="name" className="input" name="name" autoComplete="name" required maxLength={120} aria-invalid={!!errors.name} aria-describedby={describe("name")}/>
        {errors.name && <p id="name-error" className="cf-error">{errors.name}</p>}
      </div>
      <div>
        <label className="field-label" htmlFor="email">Correo electrónico *</label>
        <input id="email" className="input" name="email" type="email" autoComplete="email" required maxLength={200} aria-invalid={!!errors.email} aria-describedby={describe("email")}/>
        {errors.email && <p id="email-error" className="cf-error">{errors.email}</p>}
      </div>
      <div>
        <label className="field-label" htmlFor="company">Empresa *</label>
        <input id="company" className="input" name="company" autoComplete="organization" required maxLength={160} aria-invalid={!!errors.company} aria-describedby={describe("company")}/>
        {errors.company && <p id="company-error" className="cf-error">{errors.company}</p>}
      </div>
      <div>
        <label className="field-label" htmlFor="service">Servicio de interés <span className="cf-opt">(opcional)</span></label>
        <select id="service" className="input" name="service" defaultValue={validService} aria-invalid={!!errors.service} aria-describedby={describe("service")}>
          <option value="">Todavía no lo sé / varios</option>
          {services.map(s => <option value={s.slug} key={s.slug}>{s.title}</option>)}
        </select>
        {errors.service && <p id="service-error" className="cf-error">{errors.service}</p>}
      </div>
      <div className="field-full">
        <label className="field-label" htmlFor="message">Qué necesita resolver *</label>
        <p id="message-hint" className="cf-hint">Por ejemplo: qué sistemas están involucrados, qué le preocupa y en qué plazo lo piensa abordar.</p>
        <textarea id="message" className="input min-h-36" name="message" required maxLength={3000} aria-invalid={!!errors.message} aria-describedby={["message-hint", describe("message")].filter(Boolean).join(" ")}/>
        {errors.message && <p id="message-error" className="cf-error">{errors.message}</p>}
      </div>
      <div>
        <label className="field-label" htmlFor="role">Cargo <span className="cf-opt">(opcional)</span></label>
        <input id="role" className="input" name="role" autoComplete="organization-title" maxLength={120}/>
      </div>
      <div>
        <label className="field-label" htmlFor="phone">Teléfono <span className="cf-opt">(opcional)</span></label>
        <input id="phone" className="input" name="phone" type="tel" autoComplete="tel" maxLength={40} aria-invalid={!!errors.phone} aria-describedby={describe("phone")}/>
        {errors.phone && <p id="phone-error" className="cf-error">{errors.phone}</p>}
      </div>

      {/* Campo trampa para formularios automatizados: oculto a personas y lectores de pantalla. */}
      <div className="cf-trap" aria-hidden="true">
        <label htmlFor="website">Sitio web</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off"/>
      </div>

      <div className="field-full">
        <button className="btn" type="submit" disabled={status === "sending"} aria-busy={status === "sending"}>
          {status === "sending" ? "Enviando…" : "Enviar solicitud"}
        </button>
        <p className="cf-privacy">Los datos que envíe se usan únicamente para responder a su solicitud y conversar sobre el alcance de una evaluación. No se comparten con terceros ajenos a la atención de la consulta. El plazo de conservación y el contacto para ejercer sus derechos están pendientes de confirmación por la empresa.</p>
      </div>
    </form>
  );
}
