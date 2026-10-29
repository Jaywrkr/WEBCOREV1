import type {CSSProperties} from "react";
import Link from "next/link";
import {ArrowUpRight, ArrowDown} from "lucide-react";
import {site} from "@/content/site";
import {HeroIceberg} from "@/components/metaphors";
import {MotionToggle, PointerGlow} from "@/components/motion";

/* Hero editorial: fondo blanco, titular en peso ligero y, a la derecha, el
   modelo conceptual como pieza de arte sobre negro, en la línea del blog de
   IBM Research. El modelo mantiene su movimiento leve y su botón de pausa. */
const d = (ms: number) => ({"--d": ms + "ms"}) as CSSProperties;

export function StaticHero() {
  const {hero} = site;
  return (
    <section className="hx" aria-labelledby="hx-title">
      <div className="container hx-grid">
        <div className="hx-copy">
          <p className="hx-eyebrow mt-rise" style={d(0)}>{hero.eyebrow}</p>
          <h1 id="hx-title" className="hx-title mt-rise" style={d(80)}>
            {hero.title} <span className="hx-accent">{hero.titleAccent}</span>
          </h1>
          <p className="hx-desc mt-rise" style={d(200)}>{hero.description}</p>
          <div className="hx-actions mt-rise" style={d(320)}>
            <Link className="btn" href="/contacto">{hero.cta} <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden="true"/></Link>
            <a className="hx-secondary" href="#soluciones">Encontrar una solución <ArrowDown size={16} strokeWidth={1.75} aria-hidden="true"/></a>
          </div>
        </div>
        <figure className="hx-art sh-figure mt-rise" style={d(160)}>
          <div className="hx-panel">
            <PointerGlow className="sh-glow"/>
            <HeroIceberg/>
          </div>
          <figcaption className="hx-caption">
            <span>Modelo conceptual. Lo que el usuario ve depende de capas que no se ven.</span>
            <MotionToggle/>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
