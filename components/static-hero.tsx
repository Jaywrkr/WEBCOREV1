import Link from "next/link";
import {ArrowUpRight, ArrowDown} from "lucide-react";
import {site} from "@/content/site";

/* Hero estático: texto como elemento dominante y un diagrama de arquitectura
   sin animación, con el mismo lenguaje visual que la demostración conceptual.
   Textos preliminares de la dirección, sujetos a validación de la empresa. */
const boxes = [
  {x: 24, y: 150, w: 118, h: 50, label: "USUARIOS"},
  {x: 196, y: 150, w: 118, h: 50, label: "RED"},
  {x: 368, y: 60, w: 118, h: 50, label: "CÓMPUTO", solid: true},
  {x: 540, y: 60, w: 136, h: 50, label: "DATOS", solid: true},
  {x: 368, y: 240, w: 136, h: 50, label: "CONTINGENCIA"},
  {x: 540, y: 240, w: 136, h: 50, label: "RESPALDO"},
];

export function StaticHero() {
  const {hero} = site;
  return (
    <section className="sh" aria-labelledby="sh-title">
      <div className="container sh-grid">
        <div className="sh-copy">
          <p className="sh-eyebrow">{hero.eyebrow}</p>
          <h1 id="sh-title" className="sh-title">{hero.title}</h1>
          <p className="sh-desc">{hero.description}</p>
          <div className="sh-actions">
            <Link className="btn btn-inverse" href="/contacto">{hero.cta} <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden="true"/></Link>
            <a className="sh-secondary" href="#soluciones">Encontrar una solución <ArrowDown size={16} strokeWidth={1.75} aria-hidden="true"/></a>
          </div>
        </div>
        <figure className="sh-figure">
          <svg viewBox="0 0 700 350" role="img" aria-labelledby="sh-fig-title sh-fig-desc" className="sh-svg">
            <title id="sh-fig-title">Diagrama conceptual de una arquitectura empresarial</title>
            <desc id="sh-fig-desc">Usuarios conectados a través de la red con cómputo y datos; en paralelo, recursos de contingencia y respaldo. Modelo conceptual, no una infraestructura real.</desc>
            <defs>
              <pattern id="sh-grid" width="28" height="28" patternUnits="userSpaceOnUse">
                <path d="M28 0H0V28" fill="none" stroke="rgba(255,255,255,.1)"/>
              </pattern>
            </defs>
            <rect width="700" height="350" fill="url(#sh-grid)"/>
            <g fill="none" strokeWidth="1.5">
              <path d="M142 175H196M314 175L368 85H540M314 175L368 265H540" stroke="rgba(255,255,255,.55)"/>
              <path d="M436 110V240M608 110V240" stroke="rgba(255,255,255,.3)" strokeDasharray="4 8"/>
            </g>
            <g fontFamily="var(--font-plex-mono), monospace" fontSize="12" letterSpacing=".06em">
              {boxes.map(b => (
                <g key={b.label}>
                  <rect x={b.x} y={b.y} width={b.w} height={b.h} fill={b.solid ? "#fff" : "transparent"} stroke="#fff" strokeOpacity={b.solid ? 1 : .7}/>
                  <text x={b.x + 14} y={b.y + 30} fill={b.solid ? "#01095c" : "#fff"}>{b.label}</text>
                </g>
              ))}
            </g>
          </svg>
          <figcaption className="sh-caption">Modelo conceptual. No representa infraestructura de un cliente.</figcaption>
        </figure>
      </div>
    </section>
  );
}
