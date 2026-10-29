import type {CSSProperties} from "react";
import type {Metadata} from "next";
import Link from "next/link";
import {notFound} from "next/navigation";
import {ArrowUpRight, Check, Plus} from "lucide-react";
import {services, getService} from "@/content/services";
import {site} from "@/content/site";
import {PageHero} from "@/components/page-hero";
import {NeedGlyph} from "@/components/metaphors";
import {InView} from "@/components/motion";
import {Closing} from "@/components/home-blocks";

/* Ficha de servicio con el lenguaje de la portada: cuándo conviene, qué
   incluye, cómo se trabaja, tecnologías, preguntas y servicios relacionados.
   Sin cifras ni garantías; el alcance final se define en la propuesta. */

const i = (n: number) => ({"--i": n}) as CSSProperties;

export function generateStaticParams() {
  return services.map(s => ({slug: s.slug}));
}

export async function generateMetadata({params}: {params: Promise<{slug: string}>}): Promise<Metadata> {
  const {slug} = await params;
  const s = getService(slug);
  return {title: s?.title || "Servicio", description: s?.lede, alternates: {canonical: "/servicios/" + slug}};
}

export default async function ServicePage({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;
  const s = getService(slug);
  if (!s) notFound();

  const jsonld = [
    {"@context": "https://schema.org", "@type": "Service", name: s.title, description: s.lede, areaServed: "EC",
      provider: {"@type": "Organization", name: site.name, url: site.url}},
    {"@context": "https://schema.org", "@type": "FAQPage",
      mainEntity: s.faq.map(([q, a]) => ({"@type": "Question", name: q, acceptedAnswer: {"@type": "Answer", text: a}}))},
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonld)}}/>
      <PageHero
        crumbs={[["Inicio", "/"], ["Soluciones", "/#soluciones"], [s.title]]}
        eyebrow={s.eyebrow}
        title={s.title}
        lede={s.lede}
        cta={{href: "/contacto?servicio=" + s.slug, label: "Solicitar evaluación"}}
        secondary={{href: "#alcance", label: "Ver qué incluye"}}
        figure={<div className="ph-card"><NeedGlyph id={s.glyph}/></div>}
      />

      <section className="svc" aria-labelledby="sig-h">
        <InView className="container">
          <p className="svc-eyebrow mt-up">CUÁNDO CONVIENE</p>
          <h2 id="sig-h" className="svc-h2 mt-up" style={i(1)}>Señales de que es momento de revisarlo.</h2>
          <ol className="svc-signals">
            {s.signals.map(([t, b], n) => (
              <li className="mt-up" style={i(n + 2)} key={t}>
                <span className="n">0{n + 1}</span>
                <h3>{t}</h3>
                <p>{b}</p>
              </li>
            ))}
          </ol>
        </InView>
      </section>

      <section className="svc svc-muted" id="alcance" aria-labelledby="inc-h">
        <InView className="container svc-split">
          <div>
            <p className="svc-eyebrow mt-up">ALCANCE</p>
            <h2 id="inc-h" className="svc-h2 mt-up" style={i(1)}>Qué incluye.</h2>
            <p className="svc-note mt-up" style={i(2)}>Los componentes se combinan según su entorno. El alcance final se define por escrito en la propuesta.</p>
            {s.coreoncloud && (
              <Link className="svc-coc mt-up" style={i(3)} href="/coreoncloud">
                <span className="svc-coc-k">COREONCLOUD</span>
                <span>{s.coreoncloud}</span>
                <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden="true"/>
              </Link>
            )}
          </div>
          <ul className="svc-includes">
            {s.includes.map(([t, b], n) => (
              <li className="mt-up" style={i(n + 1)} key={t}>
                <Check size={20} strokeWidth={2} aria-hidden="true"/>
                <div><h3>{t}</h3><p>{b}</p></div>
              </li>
            ))}
          </ul>
        </InView>
      </section>

      <section className="svc" aria-labelledby="stp-h">
        <InView className="container">
          <p className="svc-eyebrow mt-up">MÉTODO</p>
          <h2 id="stp-h" className="svc-h2 mt-up" style={i(1)}>Cómo lo trabajamos.</h2>
          <ol className="svc-steps">
            {s.steps.map(([t, b], n) => (
              <li className="mt-up" style={i(n + 2)} key={t}>
                <span className="dot" aria-hidden="true"/>
                <span className="n">0{n + 1} / 0{s.steps.length}</span>
                <h3>{t}</h3>
                <p>{b}</p>
              </li>
            ))}
          </ol>
        </InView>
      </section>

      <section className="svc svc-muted" aria-labelledby="faq-h">
        <InView className="container svc-split">
          <div>
            <p className="svc-eyebrow mt-up">TECNOLOGÍAS</p>
            <h2 className="svc-h3 mt-up" style={i(1)}>Con qué trabajamos.</h2>
            <ul className="svc-tags mt-up" style={i(2)}>{s.technologies.map(t => <li key={t}>{t}</li>)}</ul>
            <p className="svc-note mt-up" style={i(3)}>Integrar una tecnología no implica una relación de partner certificado. La selección depende de su entorno.</p>
          </div>
          <div>
            <p className="svc-eyebrow mt-up">PREGUNTAS FRECUENTES</p>
            <h2 id="faq-h" className="svc-h3 mt-up" style={i(1)}>Lo que suelen preguntarnos.</h2>
            <div className="svc-faq">
              {s.faq.map(([q, a], n) => (
                <details className="mt-up" style={i(n + 2)} key={q}>
                  <summary>{q}<Plus size={18} strokeWidth={1.75} aria-hidden="true"/></summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </InView>
      </section>

      <section className="svc" aria-labelledby="rel-h">
        <InView className="container">
          <h2 id="rel-h" className="svc-h3 mt-up">Servicios relacionados.</h2>
          <ul className="svc-related">
            {s.related.map((r, n) => {
              const x = getService(r);
              if (!x) return null;
              return (
                <li className="mt-up" style={i(n + 1)} key={r}>
                  <Link href={"/servicios/" + x.slug}>
                    <span className="k">{x.eyebrow}</span>
                    <span className="t">{x.title}</span>
                    <span className="b">{x.summary}</span>
                    <ArrowUpRight size={20} strokeWidth={1.75} aria-hidden="true"/>
                  </Link>
                </li>
              );
            })}
          </ul>
        </InView>
      </section>

      <Closing service={s.slug}/>
    </>
  );
}
