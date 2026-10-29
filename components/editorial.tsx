import type {CSSProperties, ReactNode} from "react";
import Link from "next/link";
import {ArrowUpRight} from "lucide-react";
import {InView, PointerGlow} from "@/components/motion";
import {TwoSites} from "@/components/metaphors";
import {ArtLayers, ArtConsolidate, ArtCopy, ArtPerimeter, ArtModel, ArtSignal, ArtFailover} from "@/components/art";

/* Soluciones como capas de lo que sostiene la operación. Cuadrícula de tamaños
   variados sobre el fondo de la portada: CoreOnCloud destacado, la
   demostración en ancho y una tarjeta por servicio. Cada diagrama continúa el
   lenguaje del modelo del hero. Toda la tarjeta es enlace. */

type Tile = {code: string; area: string; art: ReactNode; title: string; body?: string; cta: string; href: string; size?: "big" | "wide"};

const tiles: Tile[] = [
  {code: "PLATAFORMA · CUE ↔ GYE", area: "CoreOnCloud", size: "big", art: <TwoSites/>, cta: "Conocer CoreOnCloud", href: "/coreoncloud",
    title: "Su sitio alterno, en Cuenca y Guayaquil.",
    body: "Nuestra nube propia: dos centros de datos en Ecuador, replicados entre sí, para alojar cargas, guardar copias o recuperar la operación."},
  {code: "CAPA 01", area: "Infraestructura", art: <ArtLayers/>, cta: "Ver servicio", href: "/servicios/infraestructura-centro-datos",
    title: "Lo que sostiene la operación, dimensionado para crecer."},
  {code: "CAPA 02", area: "Nube y virtualización", art: <ArtConsolidate/>, cta: "Ver servicio", href: "/servicios/nube-virtualizacion",
    title: "De muchos servidores a una plataforma."},
  {code: "CAPA 03", area: "Protección de datos", art: <ArtCopy/>, cta: "Ver servicio", href: "/servicios/proteccion-datos",
    title: "Una copia vale cuando se ha probado restaurarla."},
  {code: "CAPA 04", area: "Ciberseguridad", art: <ArtPerimeter/>, cta: "Ver servicio", href: "/servicios/ciberseguridad",
    title: "Un perímetro definido antes del incidente."},
  {code: "MODELO · INTERACTIVO", area: "Demostración", size: "wide", art: <ArtFailover/>, cta: "Explorar la demostración", href: "#demostracion",
    title: "¿Qué sucede cuando un sistema deja de estar disponible?"},
  {code: "CAPA 05", area: "Inteligencia artificial", art: <ArtModel/>, cta: "Ver servicio", href: "/servicios/inteligencia-artificial-on-premise",
    title: "IA sobre sus datos, sin que salgan de su entorno."},
  {code: "CAPA 06", area: "Servicios gestionados", art: <ArtSignal/>, cta: "Ver servicio", href: "/servicios/servicios-gestionados",
    title: "Una señal estable, no una alarma de los usuarios."},
];

export function EditorialGrid() {
  return (
    <section className="lg" id="soluciones" aria-labelledby="lg-h">
      <InView className="container" threshold={0.08}>
        <div className="lg-head">
          <p className="lg-kicker mt-up">LO QUE LO SOSTIENE</p>
          <h2 id="lg-h" className="mt-up" style={{"--i": 1} as CSSProperties}>Soluciones, <em>capa por capa.</em></h2>
          <p className="mt-up" style={{"--i": 2} as CSSProperties}>Cada servicio es una de las capas que mantienen su operación en pie. Empiece por la que necesita reforzar.</p>
        </div>
        <p className="lg-hint" aria-hidden="true">DESLICE PARA VER LAS 8 →</p>
        <ul className="lg-grid">
          {tiles.map((t, k) => (
            <li className={"lg-tile mt-up" + (t.size ? " lg-" + t.size : "")} style={{"--i": k % 4} as CSSProperties} key={t.href}>
              <Link href={t.href}>
                <PointerGlow className="lg-glow"/>
                <span className="lg-code"><span>{t.code}</span><span>{t.area}</span></span>
                <span className="lg-art">{t.art}</span>
                <span className="lg-title">{t.title}</span>
                {t.body && <span className="lg-body">{t.body}</span>}
                <span className="lg-cta">{t.cta} <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true"/></span>
              </Link>
            </li>
          ))}
        </ul>
      </InView>
    </section>
  );
}
