import {StaticHero} from "@/components/static-hero";
import {Rigor, Method, Technologies, Closing, CoreOnCloudBand} from "@/components/home-blocks";
import {Solutions} from "@/components/solutions";
import {SystemSimulator} from "@/components/system-simulator";

/* Orden: hero → señales de rigor → soluciones → demostración (qué pasa si un
   sistema cae) → CoreOnCloud (dónde se recupera) → (proyecto, solo con evidencia
   autorizada) → método → tecnologías → contacto. */
export default function Home() {
  return (
    <div className="k-home">
      <StaticHero/>
      <Rigor/>
      <Solutions/>
      <SystemSimulator/>
      <CoreOnCloudBand/>
      <Method/>
      <Technologies/>
      <Closing/>
    </div>
  );
}
