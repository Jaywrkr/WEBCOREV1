import type {CSSProperties} from "react";
import Link from "next/link";
import {ArrowUpRight} from "lucide-react";
import {site} from "@/content/site";
import {InView, PointerGlow} from "@/components/motion";
import {MethodLine, RigorGlyph, ScopeVenn} from "@/components/metaphors";

/* Bloques estáticos de la portada. Textos preliminares de la dirección:
   la empresa debe confirmarlos antes de publicar. Sin cifras ni certificaciones.
   Cada bloque lleva una metáfora geométrica que se dibuja una vez al entrar
   en pantalla. */

const i = (n: number) => ({"--i": n}) as CSSProperties;

const rigor = [
  {kind: "fit" as const, title: "Arquitectura según su entorno", body: "Partimos de las cargas, dependencias y objetivos de su organización."},
  {kind: "check" as const, title: "Implementación con criterios definidos", body: "Acordamos alcance, pruebas y condiciones de entrega."},
  {kind: "docs" as const, title: "Documentación para operar", body: "La solución incluye información útil para su administración y continuidad."},
];

export function Rigor() {
  return (
    <section className="rig" aria-label="Cómo trabajamos, en resumen">
      <InView className="container rig-grid">
        {rigor.map((r, n) => (
          <article className="rig-item mt-up" style={i(n)} key={r.title}>
            <RigorGlyph kind={r.kind}/>
            <h2>{r.title}</h2>
            <p>{r.body}</p>
          </article>
        ))}
      </InView>
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
      <InView className="container" threshold={0.25}>
        <h2 id="met-h" className="met-title mt-up">Del diagnóstico a la operación.</h2>
        <p className="met-lead mt-up" style={i(1)}>Un entorno complejo se vuelve operable cuando se entiende, se diseña con criterio y se documenta.</p>
        <MethodLine/>
        <ol className="met-grid">
          {steps.map((s, n) => (
            <li className="met-step mt-up" style={i(n + 2)} key={s.title}>
              <span className="n">0{n + 1} / 03</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>
        <Link className="met-link" href="/nosotros">Conocer Coresolutions <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden="true"/></Link>
      </InView>
    </section>
  );
}

export function Technologies() {
  return (
    <section className="tec" id="tecnologias" aria-labelledby="tec-h">
      <InView className="container">
        <h2 id="tec-h" className="mt-up">Tecnologías que integramos.</h2>
        <p className="mt-up" style={i(1)}>Nombres sujetos a confirmación por la empresa. Integrar una tecnología no implica una relación de partner certificado.</p>
        <ul>{site.partners.map((p, n) => <li className="mt-up" style={i(n + 2)} key={p}>{p}</li>)}</ul>
      </InView>
    </section>
  );
}

export function Closing() {
  return (
    <section className="cie" id="contacto" aria-labelledby="cie-h">
      <PointerGlow className="cie-glow"/>
      <InView className="container cie-grid">
        <div>
          <h2 id="cie-h" className="mt-up">Conversemos sobre su infraestructura.</h2>
          <p className="mt-up" style={i(1)}>Cuéntenos qué necesita modernizar, proteger o recuperar. Revisaremos su solicitud para conversar sobre el entorno y el alcance de una evaluación.</p>
          <div className="mt-up" style={i(2)}>
            <Link className="btn btn-inverse sh-cta" href="/contacto">Solicitar evaluación <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden="true"/></Link>
          </div>
        </div>
        <ScopeVenn/>
      </InView>
    </section>
  );
}
