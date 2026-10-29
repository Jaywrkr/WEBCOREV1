import type {CSSProperties, ReactNode} from "react";
import Link from "next/link";
import {Server, Layers, ShieldCheck, DatabaseBackup, Activity, Cpu, Cloud, GitBranch, ArrowUpRight} from "lucide-react";
import {getService} from "@/content/services";
import {InView} from "@/components/motion";
import {ArtInfra, ArtCloud, ArtSecurity, ArtBackup, ArtOps, ArtAI, ArtTwin, ArtFailover} from "@/components/art";

/* Cuadrícula editorial de la portada, en la línea del blog de IBM Research:
   cada tarjeta es una puerta a un servicio, con una ilustración abstracta,
   un titular que nombra el problema y etiquetas. Toda la tarjeta es enlace. */

type Tile = {cat: string; icon: ReactNode; art: ReactNode; title: string; meta: string; kind: string; href: string; tags: string[]};

const ic = {size: 18, strokeWidth: 1.5, "aria-hidden": true} as const;
const tech = (slug: string) => getService(slug)?.technologies.slice(0, 3) ?? [];
const name = (slug: string) => getService(slug)?.title ?? "";

const tiles: Tile[] = [
  {cat: "Infraestructura", icon: <Server {...ic}/>, art: <ArtInfra/>, kind: "Ficha de servicio",
    title: "Infraestructura que sostiene la operación, no que la limita", meta: name("infraestructura-centro-datos"),
    href: "/servicios/infraestructura-centro-datos", tags: tech("infraestructura-centro-datos")},
  {cat: "Nube", icon: <Layers {...ic}/>, art: <ArtCloud/>, kind: "Ficha de servicio",
    title: "De muchos servidores a una plataforma que se gestiona como una", meta: name("nube-virtualizacion"),
    href: "/servicios/nube-virtualizacion", tags: tech("nube-virtualizacion")},
  {cat: "Continuidad", icon: <DatabaseBackup {...ic}/>, art: <ArtBackup/>, kind: "Ficha de servicio",
    title: "Un respaldo que nunca se ha restaurado es solo una suposición", meta: name("proteccion-datos"),
    href: "/servicios/proteccion-datos", tags: tech("proteccion-datos")},
  {cat: "Plataforma", icon: <Cloud {...ic}/>, art: <ArtTwin/>, kind: "Nube propia",
    title: "CoreOnCloud: su sitio alterno, en Cuenca y Guayaquil", meta: "CoreOnCloud",
    href: "/coreoncloud", tags: ["IaaS", "Respaldo", "DRaaS"]},
  {cat: "Seguridad", icon: <ShieldCheck {...ic}/>, art: <ArtSecurity/>, kind: "Ficha de servicio",
    title: "Reducir la exposición antes de que un incidente detenga todo", meta: name("ciberseguridad"),
    href: "/servicios/ciberseguridad", tags: tech("ciberseguridad")},
  {cat: "Inteligencia artificial", icon: <Cpu {...ic}/>, art: <ArtAI/>, kind: "Ficha de servicio",
    title: "Inteligencia artificial sin que sus datos salgan de su entorno", meta: name("inteligencia-artificial-on-premise"),
    href: "/servicios/inteligencia-artificial-on-premise", tags: tech("inteligencia-artificial-on-premise")},
  {cat: "Operación", icon: <Activity {...ic}/>, art: <ArtOps/>, kind: "Ficha de servicio",
    title: "Enterarse de una falla antes de que la reporten los usuarios", meta: name("servicios-gestionados"),
    href: "/servicios/servicios-gestionados", tags: tech("servicios-gestionados")},
  {cat: "Demostración", icon: <GitBranch {...ic}/>, art: <ArtFailover/>, kind: "Modelo conceptual",
    title: "¿Qué sucede cuando un sistema deja de estar disponible?", meta: "Operación, interrupción y recuperación",
    href: "#demostracion", tags: ["Interactivo"]},
];

export function EditorialGrid() {
  return (
    <section className="ed" id="soluciones" aria-labelledby="ed-h">
      <InView className="container" threshold={0.1}>
        <div className="ed-head">
          <h2 id="ed-h" className="mt-up">Soluciones</h2>
          <p className="mt-up" style={{"--i": 1} as CSSProperties}>Empiece por lo que necesita resolver.</p>
          <Link className="ed-all mt-up" style={{"--i": 2} as CSSProperties} href="/contacto">Solicitar evaluación <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true"/></Link>
        </div>
        <ul className="ed-grid">
          {tiles.map((t, k) => (
            <li className="ed-tile mt-up" style={{"--i": k % 4} as CSSProperties} key={t.href}>
              <Link href={t.href}>
                <span className="ed-cat">{t.icon}{t.cat}</span>
                <span className="ed-art">{t.art}</span>
                <span className="ed-title">{t.title}</span>
                <span className="ed-meta"><span>{t.meta}</span><span>{t.kind}</span></span>
                <span className="ed-tags">{t.tags.map(g => <span key={g}>{g}</span>)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </InView>
    </section>
  );
}
