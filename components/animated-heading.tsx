"use client";
import {useRef,useEffect} from "react";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
export function AnimatedHeading({children,className=""}:{children:string;className?:string}){
const root=useRef<HTMLHeadingElement>(null);
useEffect(()=>{const el=root.current;if(!el||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;gsap.registerPlugin(ScrollTrigger);const ctx=gsap.context(()=>{gsap.fromTo(el,{autoAlpha:.35,y:25},{autoAlpha:1,y:0,duration:.75,ease:"power2.out",scrollTrigger:{trigger:el,start:"top 87%",once:true}})},el);return()=>ctx.revert()},[]);
return <h2 ref={root} className={className}>{children}</h2>
}
