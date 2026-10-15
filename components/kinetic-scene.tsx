"use client";
import {Canvas,useFrame} from "@react-three/fiber";
import {Float,Line} from "@react-three/drei";
import {useRef,useMemo} from "react";
import * as THREE from "three";
function DataCore({reduced}:{reduced:boolean}){const group=useRef<THREE.Group>(null);const orbit=useRef<THREE.Group>(null);
const points=useMemo(()=>Array.from({length:80},(_,i)=>{const a=i*2.39996,r=2.3+Math.sqrt(i/80)*4;return [Math.cos(a)*r,(i%11-5)*.31,Math.sin(a)*r] as [number,number,number]}),[]);
useFrame(({clock,pointer},delta)=>{if(!group.current)return;const t=clock.elapsedTime;group.current.rotation.y=THREE.MathUtils.damp(group.current.rotation.y,reduced?-.35:pointer.x*.18+t*.035,1.2,delta);group.current.rotation.x=THREE.MathUtils.damp(group.current.rotation.x,reduced?-.14:pointer.y*.09-.13,1.2,delta);if(orbit.current&&!reduced)orbit.current.rotation.y=t*.055});
return <group ref={group} rotation={[-.14,-.3,0]}>
<ambientLight intensity={1.9}/><directionalLight position={[5,8,6]} intensity={3} color="#b3c1ff"/><pointLight position={[-4,1,4]} intensity={25} color="#2D43E7" distance={10}/>
{Array.from({length:5},(_,i)=><group key={i} position={[(i-2)*1.12,0,0]}>
<mesh position={[0,0,0]}><boxGeometry args={[.92,3.55,.92]}/><meshStandardMaterial color={i===2?"#1428a6":"#081163"} roughness={.28} metalness={.65}/></mesh>
{Array.from({length:11},(_,j)=><group key={j} position={[0,1.48-j*.27,.47]}>
<mesh><boxGeometry args={[.74,.12,.025]}/><meshStandardMaterial color={j%4===0?"#6177ed":"#192e95"} metalness={.6} roughness={.3}/></mesh>
<mesh position={[-.28,0,.022]}><boxGeometry args={[.055,.028,.015]}/><meshBasicMaterial color={j%3===0?"#cad7ff":"#4e63df"}/></mesh></group>)}
<mesh position={[0,1.82,0]}><boxGeometry args={[1,.045,1]}/><meshStandardMaterial color="#d0dcff" metalness={.8} roughness={.18}/></mesh>
</group>)}
<mesh position={[0,-1.9,0]}><boxGeometry args={[6.3,.12,2.3]}/><meshStandardMaterial color="#0c166b" metalness={.65} roughness={.3}/></mesh>
<group ref={orbit}>{points.map((p,i)=><mesh key={i} position={p}><sphereGeometry args={[i%9===0?.038:.014,5,5]}/><meshBasicMaterial color={i%4===0?"#d5ddff":"#536cff"} transparent opacity={.5}/></mesh>)}</group>
<Line points={[[-3.3,-1.92,1.2],[3.3,-1.92,1.2]]} color="#a5b7ff" lineWidth={1}/>
</group>}
export default function KineticScene(){return <div className="kinetic-canvas" aria-label="Visualización tridimensional conceptual de infraestructura de centro de datos"><Canvas camera={{position:[7,4.6,9.8],fov:39}} dpr={[1,1.5]} gl={{antialias:false,powerPreference:"low-power"}} fallback={<div className="kinetic-fallback">Infraestructura / cómputo / datos</div>}><DataCore reduced={typeof window!=="undefined"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches}/></Canvas></div>}
