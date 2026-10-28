"use client";
import {useEffect, useRef, type CSSProperties, type ReactNode} from "react";

/* Disparador de animaciones por visibilidad. Marca el elemento con data-in
   la primera vez que entra en pantalla; las animaciones viven en CSS
   (styles/motion.css) y solo existen con prefers-reduced-motion: no-preference.
   No usa estado de React: no provoca renders ni diferencias de hidratación. */
export function InView({className, children, threshold = 0.3, style}: {className?: string; children: ReactNode; threshold?: number; style?: CSSProperties}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) { el.dataset.in = "true"; return; }
    const io = new IntersectionObserver(entries => {
      for (const e of entries) if (e.isIntersecting) { el.dataset.in = "true"; io.disconnect(); }
    }, {threshold});
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return <div ref={ref} data-io="" className={className} style={style}>{children}</div>;
}

/* Brillo que sigue al puntero dentro de su contenedor. Solo con puntero fino y
   sin preferencia de movimiento reducido; responde al usuario, no se mueve solo. */
export function PointerGlow({className = "glow"}: {className?: string}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current, host = el?.parentElement;
    if (!el || !host) return;
    if (!window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    let frame = 0, x = 0, y = 0;
    const paint = () => { frame = 0; el.style.setProperty("--mx", x + "px"); el.style.setProperty("--my", y + "px"); };
    const move = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      x = e.clientX - r.left; y = e.clientY - r.top;
      el.dataset.active = "true";
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const leave = () => { delete el.dataset.active; };
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);
    return () => { host.removeEventListener("pointermove", move); host.removeEventListener("pointerleave", leave); cancelAnimationFrame(frame); };
  }, []);
  return <div ref={ref} className={className} aria-hidden="true"/>;
}
