import Link from "next/link";
import {ArrowUpRight} from "lucide-react";
import {site} from "@/content/site";

/* Bloques estáticos de la portada. Textos preliminares de la dirección:
   la empresa debe confirmarlos antes de publicar. Sin cifras ni certificaciones. */

const rigor = [
  {title: "Arquitectura según su entorno", body: "Partimos de las cargas, dependencias y objetivos de su organización."},
  {title: "Implementación con criterios definidos", body: "Acordamos alcance, pruebas y condiciones de entrega."},
  {title: "Documentación para operar", body: "La solución incluye información útil para su administración y continuidad."},
];

export function Rigor() {
  return (
    <section className="rig" aria-label="Cómo trabajamos, en resumen">
      <div className="container rig-grid">
        {rigor.map(r => (
          <article className="rig-item" key={r.title}>
            <h2>{r.title}</h2>
            <p>{r.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

const steps = [
  {title: "Entender el entorno", body: "Revisamos necesidades, dependencias y objetivos para definir el alcance."},
  {title: "Diseñar e implementar", body: "Definimos la arquitectura, planificamos el cambio y validamos la solución."},
  {title: "Documentar y acompañar", body: "Entregamos documentación y acordamos el acompañamiento que requiere la operación."},
];

export function Method() {
  return (
    <section className="met" id="metodologia" aria-labelledby="met-h">
      <div className="container">
        <h2 id="met-h" className="sol-head-title" style={{fontSize: "clamp(30px,4vw,52px)", fontWeight: 500, letterSpacing: "-.025em", lineHeight: 1.05, margin: 0, color: "var(--brand)"}}>Del diagnóstico a la operación.</h2>
        <ol className="met-grid" style={{listStyle: "none", padding: 0}}>
          {steps.map((s, i) => (
            <li className="met-step" key={s.title}>
              <span className="n">0{i + 1} / 03</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>
        <Link className="met-link" href="/nosotros">Conocer Coresolutions <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden="true"/></Link>
      </div>
    </section>
  );
}

export function Technologies() {
  return (
    <section className="tec" id="tecnologias" aria-labelledby="tec-h">
      <div className="container">
        <h2 id="tec-h">Tecnologías que integramos.</h2>
        <p>Nombres sujetos a confirmación por la empresa. Integrar una tecnología no implica una relación de partner certificado.</p>
        <ul>{site.partners.map(p => <li key={p}>{p}</li>)}</ul>
      </div>
    </section>
  );
}

export function Closing() {
  return (
    <section className="cie" id="contacto" aria-labelledby="cie-h">
      <div className="container">
        <h2 id="cie-h">Conversemos sobre su infraestructura.</h2>
        <p>Cuéntenos qué necesita modernizar, proteger o recuperar. Revisaremos su solicitud para conversar sobre el entorno y el alcance de una evaluación.</p>
        <Link className="btn btn-inverse" href="/contacto">Solicitar evaluación <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden="true"/></Link>
      </div>
    </section>
  );
}
