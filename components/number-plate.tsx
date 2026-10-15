"use client";
import {motion,useReducedMotion} from "motion/react";
export function NumberPlate({label,value}:{label:string;value:string}){const reduced=useReducedMotion();return <motion.div className="v3-stat" initial={reduced?false:{opacity:.3,y:14}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.23,ease:[.2,0,.38,.9]}}><span className="v3-stat-value font-mono">{value}</span><span className="v3-stat-label">{label}</span></motion.div>}
