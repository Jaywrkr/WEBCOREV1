"use client";
import {useState,type MouseEvent,type ReactNode} from "react";
export function SpotlightCard({children,className=""}:{children:ReactNode;className?:string}){const[p,setP]=useState({x:0,y:0});function move(e:MouseEvent<HTMLElement>){const b=e.currentTarget.getBoundingClientRect();setP({x:e.clientX-b.left,y:e.clientY-b.top})}return <article className={"spotlight-card "+className} onMouseMove={move} style={{"--spot-x":p.x+"px","--spot-y":p.y+"px"} as React.CSSProperties}><div className="spotlight-inner">{children}</div></article>}
