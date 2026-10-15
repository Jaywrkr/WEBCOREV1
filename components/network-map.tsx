"use client";
import {useRef,useEffect} from "react";
import {motion,useReducedMotion} from "motion/react";
import gsap from "gsap";
import {Server,ShieldCheck,Database,Cloud,Network,Activity} from "lucide-react";
const units=[{id:"01",name:"Cómputo",x:62,y:84,Icon:Server},{id:"02",name:"Datos",x:428,y:62,Icon:Database},{id:"03",name:"Red",x:493,y:269,Icon:Network},{id:"04",name:"Seguridad",x:55,y:325,Icon:ShieldCheck},{id:"05",name:"Nube",x:272,y:34,Icon:Cloud}];
const paths=["M108 121 L300 225","M470 103 L300 225","M530 305 L300 225","M106 366 L300 225","M314 78 L300 225"];
export function NetworkMap(){
const reduced=useReducedMotion();const root=useRef<HTMLDivElement>(null);
useEffect(()=>{if(reduced||!root.current)return;const c=gsap.context(()=>{gsap.to(".network-dot",{opacity:.42,stagger:{each:.14,repeat:-1,yoyo:true},duration:1.4,ease:"sine.inOut"})},root);return()=>c.revert()},[reduced]);
return <div className="network-map" ref={root} role="img" aria-label="Mapa conceptual de infraestructura: cómputo, datos, redes, seguridad y nube conectados con el núcleo operativo">
<div className="network-topline"><span className="font-mono">CORE / INFRASTRUCTURE</span><span className="network-led"/> <span>TOPOLOGÍA CONCEPTUAL</span></div>
<svg className="network-svg" viewBox="0 0 600 465" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
<defs><pattern id="grid-n" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0H0V32" fill="none" stroke="#d4dcff" strokeOpacity=".095" strokeWidth="1"/></pattern></defs>
<rect width="600" height="465" fill="url(#grid-n)"/>
<circle cx="300" cy="225" r="152" fill="none" stroke="#ced9ff" strokeOpacity=".11"/>
<circle cx="300" cy="225" r="107" fill="none" stroke="#ced9ff" strokeOpacity=".2" strokeDasharray="2 7"/>
{paths.map((d,i)=><g key={d}><path d={d} stroke="#b7c4ff" strokeOpacity=".42" strokeWidth="1" fill="none"/>{!reduced&&<motion.path d={d} stroke="#f1f5ff" strokeWidth="2" strokeDasharray="5 32" fill="none" animate={{strokeDashoffset:[0,-74]}} transition={{duration:3+i*.35,repeat:Infinity,ease:"linear"}}/>}</g>)}
<path d="M108 121 L106 366 M470 103 L530 305" stroke="#b8c4ff" strokeOpacity=".17" strokeDasharray="3 8" fill="none"/>
<rect x="220" y="178" width="160" height="94" fill="#01095c" stroke="#d2dcff" strokeOpacity=".9"/>
<rect x="229" y="187" width="142" height="76" fill="none" stroke="#8191da" strokeOpacity=".28"/>
<path d="M242 244 L264 244 L275 211 L286 250 L297 229 L309 238 L356 238" stroke="#f0f4ff" strokeWidth="1.6" fill="none"/>
<text x="241" y="207" fill="#fff" fontSize="11" fontFamily="monospace" letterSpacing="2">CORE / 00</text>
{units.map(({x,y,id,name},i)=><g key={id}><rect x={x} y={y} width="106" height="64" fill="#01095c" stroke="#d0daff" strokeOpacity=".65"/><text x={x+12} y={y+20} fill="#b4c1e9" fontSize="10" fontFamily="monospace">{id}</text><text x={x+12} y={y+43} fill="white" fontSize="13" fontWeight="600">{name}</text><circle className="network-dot" cx={x+92} cy={y+14} r="3" fill="#eff3ff" opacity={i%2?.85:.45}/></g>)}
<text x="24" y="446" fill="#c8d1ee" fontSize="10" fontFamily="monospace">NODOS INTERCONECTADOS</text>
<text x="575" y="446" textAnchor="end" fill="#c8d1ee" fontSize="10" fontFamily="monospace">VISTA CONCEPTUAL · NO EN VIVO</text>
</svg>
<div className="network-meta"><span><Activity size={15} strokeWidth={1.75}/> ARQUITECTURA EMPRESARIAL</span><span className="font-mono">SYS / 001</span></div>
</div>
}