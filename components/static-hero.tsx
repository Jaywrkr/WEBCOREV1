import type {CSSProperties} from "react";
import Link from "next/link";
import {ArrowUpRight, ArrowDown} from "lucide-react";
import {site} from "@/content/site";
import {HeroIceberg} from "@/components/metaphors";
import {PointerGlow} from "@/components/motion";

/* Hero: el texto domina; a la derecha, la metáfora del iceberg explica que lo
   que el usuario ve depende de capas que no se ven. Entrada en secuencia al
   cargar (CSS, una sola vez) y un brillo que responde al puntero.
   Textos preliminares de la dirección, sujetos a validación de la empresa. */
const d = (ms: number) => ({"--d": ms + "ms"}) as CSSProperties;

export function StaticHero() {
  const {hero} = site;
  return (
    <section className="sh" aria-labelledby="sh-title">
      <PointerGlow className="sh-glow"/>
      <div className="container sh-grid">
        <div className="sh-copy">
          <p className="sh-eyebrow mt-rise" style={d(0)}>{hero.eyebrow}</p>
          <h1 id="sh-title" className="sh-title mt-rise" style={d(80)}>
            {hero.title} <span className="sh-accent">{hero.titleAccent}</span>
          </h1>
          <p className="sh-desc mt-rise" style={d(200)}>{hero.description}</p>
          <div className="sh-actions mt-rise" style={d(320)}>
            <Link className="btn btn-inverse sh-cta" href="/contacto">{hero.cta} <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden="true"/></Link>
            <a className="sh-secondary" href="#soluciones">Encontrar una solución <ArrowDown size={16} strokeWidth={1.75} aria-hidden="true"/></a>
          </div>
        </div>
        <figure className="sh-figure">
          <HeroIceberg/>
          <figcaption className="sh-caption">Modelo conceptual. Lo que el usuario ve depende de capas que no se ven.</figcaption>
        </figure>
      </div>
    </section>
  );
}
