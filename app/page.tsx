import {StaticHero} from "@/components/static-hero";
import {Rigor, Method, Technologies, Closing} from "@/components/home-blocks";
import {Solutions} from "@/components/solutions";
import {SystemSimulator} from "@/components/system-simulator";
/* Orden de la dirección: hero → señales de rigor → soluciones → demostración → (proyecto, solo con evidencia autorizada) → método → tecnologías → contacto. */
export default function Home(){return <div className="k-home"><StaticHero/><Rigor/><Solutions/><SystemSimulator/><Method/><Technologies/><Closing/></div>}
