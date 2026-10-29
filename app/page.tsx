import {StaticHero} from "@/components/static-hero";
import {Rigor, Method, Technologies, Closing} from "@/components/home-blocks";
import {EditorialGrid} from "@/components/editorial";
import {SystemSimulator} from "@/components/system-simulator";

/* Portada sobre un fondo continuo (el del modelo del hero): hero → soluciones
   como capas (CoreOnCloud destacado) → cómo entregamos → demostración →
   método → tecnologías → contacto. */
export default function Home() {
  return (
    <div className="k-home">
      <StaticHero/>
      <EditorialGrid/>
      <Rigor/>
      <SystemSimulator/>
      <Method/>
      <Technologies/>
      <Closing/>
    </div>
  );
}
