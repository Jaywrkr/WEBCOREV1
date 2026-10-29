import type {CSSProperties} from "react";
import type {Metadata} from "next";
import Link from "next/link";
import {ArrowUpRight, Plus} from "lucide-react";
import {site} from "@/content/site";
import {PageHero} from "@/components/page-hero";
import {TwoSites} from "@/components/metaphors";
import {InView} from "@/components/motion";
import {Closing} from "@/components/home-blocks";

export const metadata: Metadata = {
  title: "CoreOnCloud",
  description: "CoreOnCloud es la nube propia de Coresolutions en Ecuador: infraestructura como servicio, respaldo y recuperación ante desastres, con centros de datos en Cuenca y Guayaquil.",
  alternates: {canonical: "/coreoncloud"},
};

/* Contenido recuperado del sitio original. Sin precios, tiempos de recuperación
   ni niveles de servicio: se definen por proyecto. */

const i = (n: number) => ({"--i": n}) as CSSProperties;

const offer = [
  {k: "IaaS", t: "Infraestructura como servicio", b: "Servidores virtuales, almacenamiento y red en nuestra nube, con capacidad que se ajusta a lo que su operación necesita.", href: "/servicios/nube-virtualizacion"},
  {k: "BaaS", t: "Respaldo gestionado", b: "Copias automáticas de sus sistemas fuera de su sitio, con la retención que se defina y pruebas de restauración.", href: "/servicios/proteccion-datos"},
  {k: "DRaaS", t: "Recuperación ante desastres", b: "Sus servidores críticos replicados en CoreOnCloud y preparados para funcionar si su sitio principal falla.", href: "/servicios/proteccion-datos"},
];

const terms = [
  {t: "Respaldo", b: "Guarda copias de los datos para recuperarlos cuando se necesiten. Protege la información, pero restaurar toma tiempo."},
  {t: "Alta disponibilidad", b: "Duplica componentes dentro de un mismo entorno para que una falla puntual no detenga el servicio."},
  {t: "Recuperación ante desastres", b: "Mantiene los sistemas replicados en otro sitio para reanudar la operación si el sitio principal deja de estar disponible."},
];

const faq: [string, string][] = [
  ["¿En qué se diferencia CoreOnCloud de una nube pública internacional?", "CoreOnCloud opera en Ecuador, con centros de datos en Cuenca y Guayaquil y un equipo técnico local que conoce su operación. Muchas organizaciones lo combinan con otros servicios en la nube."],
  ["¿Puedo llevar solo mis respaldos?", "Sí. Puede empezar con respaldo gestionado o recuperación ante desastres y mantener su producción en su propio sitio."],
  ["¿Cómo se cobra?", "Según los recursos y servicios que utilice. Preparamos una propuesta con base en su escenario."],
];

export default function CoreOnCloud() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faq.map(([q, a]) => ({"@type": "Question", name: q, acceptedAnswer: {"@type": "Answer", text: a}})),
      })}}/>
      <PageHero
        crumbs={[["Inicio", "/"], ["CoreOnCloud"]]}
        eyebrow="NUBE PROPIA EN ECUADOR"
        title={<>CoreOnCloud. <em>Su infraestructura, en dos sitios.</em></>}
        lede="Nuestra nube propia: infraestructura como servicio, respaldo y recuperación ante desastres, con centros de datos en Cuenca y Guayaquil replicados entre sí."
        cta={{href: "/contacto?servicio=coreoncloud", label: "Solicitar información"}}
        secondary={{href: "#servicios", label: "Ver qué puede llevar"}}
        figure={<InView><TwoSites/></InView>}
      />

      <section className="svc" id="servicios" aria-labelledby="off-h">
        <InView className="container">
          <p className="svc-eyebrow mt-up">SERVICIOS</p>
          <h2 id="off-h" className="svc-h2 mt-up" style={i(1)}>Lo que puede llevar a CoreOnCloud.</h2>
          <p className="svc-lead mt-up" style={i(2)}>Empiece por un servicio y sume los demás cuando lo necesite.</p>
          <ul className="coc-offer">
            {offer.map((o, n) => (
              <li className="mt-up" style={i(n + 3)} key={o.k}>
                <span className="k">{o.k}</span>
                <h3>{o.t}</h3>
                <p>{o.b}</p>
                <Link href={o.href}>Ver servicio relacionado <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true"/></Link>
              </li>
            ))}
          </ul>
        </InView>
      </section>

      <section className="svc svc-muted" aria-labelledby="sites-h">
        <InView className="container svc-split">
          <div>
            <p className="svc-eyebrow mt-up">DOS SITIOS</p>
            <h2 id="sites-h" className="svc-h2 mt-up" style={i(1)}>Cuenca y Guayaquil, replicados.</h2>
            <p className="svc-lead mt-up" style={i(2)}>Dos centros de datos en Ecuador conectados entre sí, para que una falla en un sitio no obligue a detener la operación. Qué se replica y con qué objetivos de recuperación se define para cada carga.</p>
          </div>
          <ul className="coc-sites">
            {site.sites.map((x, n) => (
              <li className="mt-up" style={i(n + 1)} key={x.code}>
                <span className="code">{x.code}</span>
                <div><h3>{x.city}</h3><p>{x.detail}</p></div>
              </li>
            ))}
          </ul>
        </InView>
      </section>

      <section className="svc" aria-labelledby="terms-h">
        <InView className="container">
          <p className="svc-eyebrow mt-up">CONCEPTOS</p>
          <h2 id="terms-h" className="svc-h2 mt-up" style={i(1)}>Respaldo, alta disponibilidad y recuperación no son lo mismo.</h2>
          <ol className="svc-signals">
            {terms.map((x, n) => (
              <li className="mt-up" style={i(n + 2)} key={x.t}>
                <span className="n">0{n + 1}</span>
                <h3>{x.t}</h3>
                <p>{x.b}</p>
              </li>
            ))}
          </ol>
          <p className="svc-note mt-up" style={i(5)}>La combinación adecuada depende de cuánto tiempo y cuántos datos puede perder cada sistema. <Link className="text-link" href="/#demostracion">Ver la demostración conceptual</Link></p>
        </InView>
      </section>

      <section className="svc svc-muted" aria-labelledby="faq-h">
        <InView className="container svc-split">
          <div>
            <p className="svc-eyebrow mt-up">PREGUNTAS FRECUENTES</p>
            <h2 id="faq-h" className="svc-h2 mt-up" style={i(1)}>Lo que suelen preguntarnos.</h2>
          </div>
          <div className="svc-faq">
            {faq.map(([q, a], n) => (
              <details className="mt-up" style={i(n + 1)} key={q}>
                <summary>{q}<Plus size={18} strokeWidth={1.75} aria-hidden="true"/></summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </InView>
      </section>

      <Closing service="coreoncloud"/>
    </>
  );
}
