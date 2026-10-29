"use client";
import {useEffect, useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {Menu, X} from "lucide-react";

const links = [
  ["Soluciones", "/#soluciones"],
  ["CoreOnCloud", "/coreoncloud"],
  ["Cómo trabajamos", "/#metodologia"],
  ["Nosotros", "/nosotros"],
  ["Contacto", "/contacto"],
];

/* Logo oficial: versión blanca sobre fondo oscuro y azul al desplazarse. */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, {passive: true});
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={["header", scrolled ? "scrolled" : "at-top"].join(" ")}>
      <div className="container header-inner">
        <Link className="logo" href="/" aria-label="Coresolutions, inicio">
          <Image className="logo-white" src="/brand/coresolutions-white.png" alt="" width={1276} height={138} priority/>
          <Image className="logo-navy" src="/brand/coresolutions-navy.png" alt="" width={1276} height={138} priority/>
        </Link>
        <nav id="mobile-nav" aria-label="Navegación principal" className={["header-nav", open ? "mobile-open" : ""].join(" ")}>
          {links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}
        </nav>
        <div className="header-action">
          <Link className={scrolled ? "btn" : "btn btn-inverse"} href="/contacto">Solicitar evaluación</Link>
        </div>
        <button aria-label={open ? "Cerrar menú" : "Abrir menú"} aria-controls="mobile-nav" aria-expanded={open} className="menu-btn" onClick={() => setOpen(!open)}>
          {open ? <X size={22} strokeWidth={1.75}/> : <Menu size={22} strokeWidth={1.75}/>}
        </button>
      </div>
    </header>
  );
}
