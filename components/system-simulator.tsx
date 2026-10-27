"use client";
import {useState} from "react";
import {motion, useReducedMotion} from "motion/react";
import Link from "next/link";
import {RotateCcw, ArrowRight, ArrowDown} from "lucide-react";

/* Demostración conceptual con tres estados comparables. Los controles describen
   estados; no ejecutan operaciones. Escritorio: topología SVG. Móvil: las mismas
   seis piezas como tarjetas conectadas verticalmente, con el estado de cada una
   en texto, para no reducir el SVG hasta que el texto sea ilegible.
   Modelo conceptual: no representa infraestructura de un cliente. */

type Mode = "normal" | "incident" | "recovery";

const modes: {id: Mode; label: string; detail: string; caption: string}[] = [
  {id: "normal", label: "Operación habitual", caption: "OPERACIÓN HABITUAL",
   detail: "Los usuarios acceden a los servicios y sus datos a través de la infraestructura principal."},
  {id: "incident", label: "Interrupción", caption: "INTERRUPCIÓN",
   detail: "La indisponibilidad de un componente puede afectar servicios dependientes. Identificar esas dependencias permite preparar la respuesta."},
  {id: "recovery", label: "Recuperación", caption: "RECUPERACIÓN",
   detail: "Los recursos y procedimientos de contingencia permiten plantear una recuperación. Los tiempos y la pérdida de datos admisible deben definirse y probarse."},
];

/* Estado de cada pieza por modo. "principal" y "alterna" son las dos rutas del
   diagrama; en las tarjetas se muestran como dos grupos conectados. */
type NodeState = "activo" | "afectado" | "en-espera" | "en-uso";
const stateLabel: Record<NodeState, string> = {activo: "Activo", afectado: "No disponible", "en-espera": "En espera", "en-uso": "En uso"};

const nodes: {id: string; label: string; role: string; group: "principal" | "alterna"; state: Record<Mode, NodeState>}[] = [
  {id: "usuarios", label: "USUARIOS", role: "Personas y aplicaciones que consumen los servicios.", group: "principal",
   state: {normal: "activo", incident: "afectado", recovery: "activo"}},
  {id: "red", label: "RED", role: "Conecta a los usuarios con el cómputo y los datos.", group: "principal",
   state: {normal: "activo", incident: "activo", recovery: "activo"}},
  {id: "computo", label: "CÓMPUTO", role: "Servidores y virtualización donde se ejecutan los servicios.", group: "principal",
   state: {normal: "activo", incident: "afectado", recovery: "afectado"}},
  {id: "datos", label: "DATOS", role: "Almacenamiento principal de la información.", group: "principal",
   state: {normal: "activo", incident: "afectado", recovery: "afectado"}},
  {id: "contingencia", label: "CONTINGENCIA", role: "Recursos alternos preparados para asumir los servicios.", group: "alterna",
   state: {normal: "en-espera", incident: "en-espera", recovery: "en-uso"}},
  {id: "respaldo", label: "RESPALDO", role: "Copias de los datos desde las que se restaura.", group: "alterna",
   state: {normal: "en-espera", incident: "en-espera", recovery: "en-uso"}},
];

/* Qué cambia en la ruta, en una frase, para las tarjetas. */
const routeNote: Record<Mode, string> = {
  normal: "La ruta principal atiende a los usuarios. Contingencia y respaldo permanecen preparados.",
  incident: "La ruta principal no está disponible y los usuarios pierden acceso. Lo que ocurra después depende de las dependencias identificadas y de la preparación previa.",
  recovery: "Los usuarios acceden por la ruta alterna. Cuánto tarda y cuántos datos se pierden depende de los objetivos definidos y probados para el entorno.",
};

export function SystemSimulator() {
  const [mode, setMode] = useState<Mode>("normal");
  const reduced = useReducedMotion();
  const current = modes.find(m => m.id === mode) ?? modes[0];

  return (
    <section id="demostracion" className="sys-section">
      <div className="container">
        <div className="sys-overline"><span>DEMOSTRACIÓN</span><span>MODELO CONCEPTUAL</span></div>
        <div className="sys-heading">
          <div>
            <span className="sys-kicker">UNA DECISIÓN TÉCNICA, EXPLICADA</span>
            <h2>¿Qué sucede cuando un sistema <em>deja de estar disponible?</em></h2>
          </div>
          <p>Explore un ejemplo simplificado de operación, interrupción y recuperación. La respuesta real depende del diseño y de las pruebas de cada entorno.</p>
        </div>

        <div className="sys-layout">
          <div className="sys-diagram">
            <div className="sys-diagram-top"><span>TOPOLOGÍA SIMPLIFICADA</span><span>{current.caption}</span></div>

            {/* Escritorio: topología */}
            <svg viewBox="0 0 800 470" preserveAspectRatio="xMidYMid meet" role="img" className="sys-svg"
                 aria-label={"Topología simplificada: usuarios, red, cómputo, datos, contingencia y respaldo. Estado: " + current.label}>
              <defs>
                <pattern id="sysgrid" width="34" height="34" patternUnits="userSpaceOnUse">
                  <path d="M34 0H0V34" fill="none" stroke="#dde3ef" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="800" height="470" fill="url(#sysgrid)"/>
              <g fill="none" strokeWidth="2">
                <path d="M119 216H274L413 123H590" stroke={mode === "incident" ? "#9ba4b6" : "#01095c"}/>
                <path d="M274 216L413 350H590" stroke={mode === "recovery" ? "#2d43e7" : "#bfc6d5"} strokeDasharray={mode === "recovery" ? "none" : "6 9"}/>
              </g>
              <g fontFamily="monospace" fontSize="12">
                <rect x="45" y="186" width="130" height="60" fill="#fff" stroke="#929cae"/><text x="62" y="222" fill="#01095c">USUARIOS</text>
                <rect x="238" y="186" width="130" height="60" fill="#fff" stroke="#929cae"/><text x="255" y="222" fill="#01095c">RED</text>
                <rect x="380" y="93" width="130" height="60" fill={mode === "incident" ? "#f8e7e8" : "#01095c"} stroke={mode === "incident" ? "#da1e28" : "#01095c"}/>
                <text x="397" y="129" fill={mode === "incident" ? "#a01822" : "white"}>CÓMPUTO</text>
                <rect x="578" y="93" width="155" height="60" fill={mode === "incident" ? "#f8e7e8" : "#01095c"} stroke={mode === "incident" ? "#da1e28" : "#01095c"}/>
                <text x="595" y="129" fill={mode === "incident" ? "#a01822" : "white"}>DATOS</text>
                <rect x="380" y="320" width="155" height="60" fill={mode === "recovery" ? "#01095c" : "white"} stroke="#01095c"/>
                <text x="397" y="356" fill={mode === "recovery" ? "white" : "#01095c"}>CONTINGENCIA</text>
                <rect x="578" y="320" width="155" height="60" fill={mode === "recovery" ? "#01095c" : "white"} stroke="#01095c"/>
                <text x="595" y="356" fill={mode === "recovery" ? "white" : "#01095c"}>RESPALDO</text>
              </g>
              {!reduced && mode !== "incident" && (
                <motion.circle r="5" fill="#2d43e7" initial={{offsetDistance: "0%"}} animate={{offsetDistance: "100%"}}
                  transition={{duration: 3, repeat: Infinity, ease: "linear"}}
                  style={{offsetPath: mode === "recovery" ? 'path("M 120 216 L 274 216 L 413 350 L 590 350")' : 'path("M 120 216 L 274 216 L 413 123 L 590 123")'}}/>
              )}
            </svg>

            {/* Móvil: las mismas piezas como tarjetas conectadas */}
            <div className="sys-cards" data-mode={mode}>
              <p className="sys-cards-note">{routeNote[mode]}</p>
              {(["principal", "alterna"] as const).map(group => (
                <ol key={group} className={"sys-chain sys-chain-" + group} aria-label={group === "principal" ? "Ruta principal" : "Ruta alterna"}>
                  <li className="sys-chain-title">{group === "principal" ? "RUTA PRINCIPAL" : "RUTA ALTERNA"}</li>
                  {nodes.filter(n => n.group === group).map((n, i, arr) => {
                    const st = n.state[mode];
                    return (
                      <li key={n.id} className="sys-card" data-state={st}>
                        <div className="sys-card-head">
                          <span className="sys-card-label">{n.label}</span>
                          <span className="sys-card-state">{stateLabel[st]}</span>
                        </div>
                        <p>{n.role}</p>
                        {i < arr.length - 1 && <span className="sys-card-link" aria-hidden="true"><ArrowDown size={14} strokeWidth={1.75}/></span>}
                      </li>
                    );
                  })}
                </ol>
              ))}
            </div>

            <div className="sys-diagram-foot"><span>Modelo conceptual. No representa infraestructura de un cliente ni mide disponibilidad real.</span></div>
          </div>

          <div className="sys-control">
            <span className="sys-kicker">ELIJA UN ESTADO</span>
            <h3>Operación, interrupción y recuperación.</h3>
            <p className="sys-control-desc" role="status" aria-live="polite">{current.detail}</p>
            <div className="sys-options">
              {modes.map((m, i) => (
                <button key={m.id} type="button" className={mode === m.id ? "selected" : ""} aria-pressed={mode === m.id} onClick={() => setMode(m.id)}>
                  <span className="mono">0{i + 1}</span><span>{m.label}</span><ArrowRight size={17} strokeWidth={1.75} aria-hidden="true"/>
                </button>
              ))}
            </div>
            <p className="sys-note">Respaldo, alta disponibilidad y recuperación ante desastres no son equivalentes; el modelo debe revisarse con el responsable técnico antes de ampliarlo. <Link className="text-link" href="/servicios/proteccion-datos">Conocer protección de datos y recuperación</Link></p>
            <button type="button" className="sys-reset" onClick={() => setMode("normal")}><RotateCcw size={16} strokeWidth={1.75} aria-hidden="true"/> Restablecer escenario</button>
          </div>
        </div>
      </div>
    </section>
  );
}
