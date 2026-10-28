import type {CSSProperties, ReactNode} from "react";
import Link from "next/link";
import {ArrowUpRight, ArrowDown} from "lucide-react";
import {PointerGlow} from "@/components/motion";

/* Cabecera de páginas interiores con el mismo lenguaje del hero de portada:
   degradado, cuadrícula, brillo de puntero y entrada en secuencia. */
const d = (ms: number) => ({"--d": ms + "ms"}) as CSSProperties;

export function PageHero({crumbs, eyebrow, title, lede, cta, secondary, figure}: {
  crumbs: [string, string?][];
  eyebrow: string;
  title: ReactNode;
  lede: string;
  cta: {href: string; label: string};
  secondary?: {href: string; label: string};
  figure?: ReactNode;
}) {
  return (
    <section className="sh ph" aria-labelledby="ph-title">
      <PointerGlow className="sh-glow"/>
      <div className="container">
        <nav aria-label="Ruta de navegación" className="ph-crumbs mt-rise" style={d(0)}>
          <ol>
            {crumbs.map(([label, href], n) => (
              <li key={label}>{href ? <Link href={href}>{label}</Link> : <span aria-current="page">{label}</span>}{n < crumbs.length - 1 && <span aria-hidden="true"> / </span>}</li>
            ))}
          </ol>
        </nav>
        <div className={figure ? "sh-grid" : ""}>
          <div className="sh-copy">
            <p className="sh-eyebrow mt-rise" style={d(60)}>{eyebrow}</p>
            <h1 id="ph-title" className="sh-title ph-title mt-rise" style={d(120)}>{title}</h1>
            <p className="sh-desc mt-rise" style={d(220)}>{lede}</p>
            <div className="sh-actions mt-rise" style={d(320)}>
              <Link className="btn btn-inverse sh-cta" href={cta.href}>{cta.label} <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden="true"/></Link>
              {secondary && <a className="sh-secondary" href={secondary.href}>{secondary.label} <ArrowDown size={16} strokeWidth={1.75} aria-hidden="true"/></a>}
            </div>
          </div>
          {figure && <div className="sh-figure ph-figure mt-rise" style={d(300)}>{figure}</div>}
        </div>
      </div>
    </section>
  );
}
