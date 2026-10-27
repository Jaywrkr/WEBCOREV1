import {SolutionExplorer} from "@/components/solution-explorer";
import {SystemSimulator} from "@/components/system-simulator";
import {KineticCapabilities,KineticJourney} from "@/components/kinetic-experience";
import {StaticHero} from "@/components/static-hero";
import {site} from "@/content/site";
import {AnimatedHeading} from "@/components/animated-heading";
import {Mesh} from "@/components/mesh";
import {Button} from "@/components/ui";
import {ArrowUpRight} from "lucide-react";
export default function Home(){return <div className="k-home"><StaticHero/><KineticCapabilities/><KineticJourney/><SolutionExplorer/><SystemSimulator/>
<section className="k-partners" id="tecnologias"><div className="container"><div className="k-partner-head"><span className="k-kicker">06 / TECNOLOGÍAS QUE INTEGRAMOS</span><h2>La tecnología correcta.<br/><em>La arquitectura adecuada.</em></h2></div></div><div className="k-partner-rail"><div className="k-partner-track">{[...site.partners,...site.partners].map((p,i)=><span key={i} aria-hidden={i>=site.partners.length}>{p}</span>)}</div></div><div className="container"><p className="k-partner-note">Nombres tipográficos provisionales. Los logotipos oficiales se incorporarán cuando sean proporcionados.</p></div></section>
<section className="k-industry" id="industrias"><div className="container"><div className="k-section-top"><span>07 / DONDE TRABAJAMOS</span><span>SECTORES EMPRESARIALES</span></div><div className="k-industry-heading"><span className="k-kicker">INDUSTRIAS</span><AnimatedHeading className="k-display">Infraestructura crítica.<br/><em>En cualquier sector.</em></AnimatedHeading></div>{site.sectors.map((s,i)=><article className="k-industry-row" key={s.title}><span className="k-industry-n">0{i+1}</span><h3>{s.title}</h3><p>{s.desc}</p><ArrowUpRight size={20} strokeWidth={1.75}/></article>)}</div></section>
<section className="k-closing" id="contacto"><Mesh/><div className="container"><div className="k-kicker">08 / INICIE SU PROYECTO</div><AnimatedHeading className="k-close-title">Lo que viene necesita una infraestructura a su altura.</AnimatedHeading><div className="k-close-bottom"><p>Conversemos sobre su entorno, sus desafíos y cómo prepararlo para el futuro.</p><Button href="/contacto" inverse>Solicitar evaluación <ArrowUpRight size={20} strokeWidth={1.75}/></Button></div></div></section>
</div>}
