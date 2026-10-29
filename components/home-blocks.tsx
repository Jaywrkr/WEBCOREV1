import type {CSSProperties} from "react";
import Link from "next/link";
import {ArrowRight, ArrowUpRight} from "lucide-react";
import {site} from "@/content/site";
import {InView, PointerGlow} from "@/components/motion";
import {MethodLine, ScopeVenn, StageDiagram, TwoSites} from "@/components/metaphors";

/* Bloques estáticos de la portada. Textos preliminares de la dirección:
   la empresa debe confirmarlos antes de publicar. Sin cifras ni certificaciones.
   Cada bloque lleva una metáfora geométrica que se dibuja una vez al entrar
   en pantalla. */

const i = (n: number) => ({"--i": n}) as CSSProperties;

const rigor = [
  {stage: "plan" as const, label: "ARQUITECTURA", title: "Arquitectura según su entorno", body: "Partimos de las cargas, dependencias y objetivos de su organización para dibujar la solución antes de construirla."},
  {stage: "build" as const, label: "IMPLEMENTACIÓN", title: "Implementación con criterios definidos", body: "Construimos sobre ese plano y validamos con las pruebas y condiciones de entrega acordadas."},
  {stage: "doc" as const, label: "DOCUMENTACIÓN", title: "Documentación para operar", body: "Cuando el alcance lo incluye, dejamos la solución documentada para su administración y continuidad."},
];

/* Sección 1: el mismo sistema en tres momentos, de plano a documento. */
export function Rigor() {
  return (
    <section className="rig" aria-labelledby="rig-h">
      <InView className="container" threshold={0.2}>
        <div className="rig-head">
          <p className="svc-eyebrow mt-up">CÓMO ENTREGAMOS</p>
          <h2 id="rig-h" className="mt-up" style={i(1)}>Primero se dibuja. Luego se construye. Después se documenta.</h2>
          <p className="mt-up" style={i(2)}>El mismo sistema en tres momentos, para que sepa qué recibe en cada etapa.</p>
        </div>
        <ol className="ed-grid ed-grid-3 rig-flow">
          {rigor.map((r, n) => (
            <li className="ed-tile ed-static rig-card" style={{"--s": n * 0.7 + "s"} as CSSProperties} key={r.title}>
              <div className="ed-box">
                <span className="ed-cat"><span className="rig-num">0{n + 1}</span>{r.label}{n < rigor.length - 1 && <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" className="rig-next"/>}</span>
                <span className={"ed-art rig-art rig-art-" + r.stage}><StageDiagram stage={r.stage}/></span>
                <h3 className="ed-title">{r.title}</h3>
                <p className="rig-text">{r.body}</p>
              </div>
            </li>
          ))}
        </ol>
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

/* CoreOnCloud: la nube propia de la empresa, su principal diferenciador. */
export function CoreOnCloudBand() {
  return (
    <section className="coc" aria-labelledby="coc-h">
      <PointerGlow className="cie-glow"/>
      <InView className="container coc-grid">
        <div>
          <p className="sh-eyebrow mt-up">NUBE PROPIA EN ECUADOR</p>
          <h2 id="coc-h" className="mt-up" style={i(1)}>CoreOnCloud: su sitio alterno, en Ecuador.</h2>
          <p className="mt-up" style={i(2)}>Nuestra nube propia, con centros de datos en Cuenca y Guayaquil replicados entre sí. Para alojar cargas, guardar copias fuera de su sitio o mantener servidores listos para funcionar si su sitio principal falla.</p>
          <ul className="coc-list mt-up" style={i(3)}>
            <li>Infraestructura como servicio</li>
            <li>Respaldo gestionado</li>
            <li>Recuperación ante desastres</li>
          </ul>
          <div className="mt-up" style={i(4)}>
            <Link className="btn btn-inverse sh-cta" href="/coreoncloud">Conocer CoreOnCloud <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden="true"/></Link>
          </div>
        </div>
        <TwoSites/>
      </InView>
    </section>
  );
}

export function Closing({service = ""}: {service?: string}) {
  return (
    <section className="cie" id="contacto" aria-labelledby="cie-h">
      <PointerGlow className="cie-glow"/>
      <InView className="container cie-grid">
        <div>
          <h2 id="cie-h" className="mt-up">Conversemos sobre su infraestructura.</h2>
          <p className="mt-up" style={i(1)}>Cuéntenos qué necesita modernizar, proteger o recuperar. Revisaremos su solicitud para conversar sobre el entorno y el alcance de una evaluación.</p>
          <div className="mt-up" style={i(2)}>
            <Link className="btn btn-inverse sh-cta" href={service ? "/contacto?servicio=" + service : "/contacto"}>Solicitar evaluación <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden="true"/></Link>
          </div>
        </div>
        <ScopeVenn/>
      </InView>
    </section>
  );
}
