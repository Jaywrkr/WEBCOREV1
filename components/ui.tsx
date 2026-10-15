import Link from "next/link";import type{ReactNode}from "react";
export function Button({href,children,secondary=false,inverse=false}:{href:string;children:ReactNode;secondary?:boolean;inverse?:boolean}){return <Link className={["btn",secondary?"btn-secondary":"",inverse?"btn-inverse":""].join(" ")} href={href}>{children}</Link>}
export function Eyebrow({children}:{children:ReactNode}){return <p className="eyebrow mb-5">{children}</p>}
export function Tag({children}:{children:ReactNode}){return <span className="tag">{children}</span>}
