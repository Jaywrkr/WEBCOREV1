import {StaticHero} from "@/components/static-hero";
import {Rigor, Method, Technologies, Closing, CoreOnCloudBand} from "@/components/home-blocks";
import {EditorialGrid} from "@/components/editorial";
import {SystemSimulator} from "@/components/system-simulator";

/* Portada editorial: hero → cuadrícula de soluciones (una tarjeta por tema,
   con su ilustración) → cómo entregamos → demostración → CoreOnCloud →
   método → tecnologías → contacto. */
export default function Home() {
  return (
    <div className="k-home">
      <StaticHero/>
      <EditorialGrid/>
      <Rigor/>
      <SystemSimulator/>
      <CoreOnCloudBand/>
      <Method/>
      <Technologies/>
      <Closing/>
    </div>
  );
}
