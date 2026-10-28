import type {CSSProperties} from "react";

/* Metáforas visuales de la portada, al estilo de Visualize Value: una forma
   geométrica simple por idea. Son SVG puros y sin JavaScript; el movimiento
   vive en styles/motion.css, se ejecuta una vez y con movimiento reducido se
   muestra directamente el estado final, que comunica lo mismo.
   Son modelos conceptuales: no describen infraestructura ni datos reales. */

const v = (vars: Record<string, string | number>) => vars as CSSProperties;

/* Hero: lo que el usuario ve es una pieza; lo que la sostiene son capas. */
const layers = [
  {label: "RED", w: 180},
  {label: "CÓMPUTO", w: 260},
  {label: "DATOS", w: 340},
  {label: "RESPALDO", w: 420},
];

export function HeroIceberg() {
  return (
    <svg viewBox="0 0 560 440" className="mt-ice" role="img" aria-labelledby="ice-t ice-d">
      <title id="ice-t">Lo que se ve y lo que lo sostiene</title>
      <desc id="ice-d">Sobre una línea, una sola pieza: su operación. Debajo, capas de red, cómputo, datos y respaldo, rodeadas por un perímetro de seguridad. Modelo conceptual.</desc>
      <g className="mt-ice-top">
        <rect x="248" y="58" width="64" height="64" fill="#fff"/>
        <text x="330" y="96" className="mt-lbl">SU OPERACIÓN</text>
      </g>
      <path className="mt-draw mt-ice-water" pathLength={1} d="M0 150H560"/>
      <text x="0" y="140" className="mt-lbl mt-ice-cap">LO QUE SE VE</text>
      <text x="0" y="170" className="mt-lbl mt-ice-cap">LO QUE LO SOSTIENE</text>
      <path className="mt-draw mt-ice-spine" pathLength={1} d="M280 122V392"/>
      {layers.map((l, i) => {
        const y = 196 + i * 48, x = 280 - l.w / 2;
        return (
          <g key={l.label} className="mt-ice-layer" style={v({"--i": i})}>
            <rect x={x} y={y} width={l.w} height={34} fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.75)"/>
            <text x={280} y={y + 21.5} textAnchor="middle" className="mt-lbl mt-lbl-in">{l.label}</text>
          </g>
        );
      })}
      <path className="mt-draw mt-ice-guard" pathLength={1} d="M20 180H540V410H20Z"/>
      <circle className="mt-ice-pulse" cx="280" cy="126" r="4"/>
      <text x="532" y="400" textAnchor="end" className="mt-lbl mt-ice-guard-l">SEGURIDAD</text>
    </svg>
  );
}

/* Señales de rigor: encajar, verificar, documentar. */
export function RigorGlyph({kind}: {kind: "fit" | "check" | "docs"}) {
  return (
    <svg viewBox="0 0 48 48" className="mt-rig" aria-hidden="true">
      {kind === "fit" && <>
        <path className="mt-draw mt-faint" pathLength={1} d="M5 15L20 5L43 10L44 35L27 44L7 38Z"/>
        <path className="mt-draw mt-d2" pathLength={1} d="M15 15H33V33H15Z"/>
      </>}
      {kind === "check" && <>
        <path className="mt-draw" pathLength={1} d="M7 7H41V41H7Z"/>
        <path className="mt-draw mt-d2 mt-strong" pathLength={1} d="M15 25L22 32L34 17"/>
      </>}
      {kind === "docs" && <>
        <path className="mt-draw" pathLength={1} d="M9 11H39"/>
        <path className="mt-draw mt-d1" pathLength={1} d="M9 20H39"/>
        <path className="mt-draw mt-d2" pathLength={1} d="M9 29H31"/>
        <path className="mt-draw mt-d3" pathLength={1} d="M9 38H21"/>
      </>}
    </svg>
  );
}

/* Selector de soluciones: una metáfora por necesidad. Se anima cada vez que
   el panel se abre (la animación CSS arranca al pasar de oculto a visible). */
const scatter = [
  [-38, -20, -24], [12, -34, 18], [44, -12, 32], [-46, 8, 14], [0, 0, -40],
  [36, 20, -16], [-24, 34, 28], [18, 40, -30], [50, 30, 22],
];

export function NeedGlyph({id}: {id: string}) {
  if (id === "modernizar") {
    return (
      <figure className="mt-need" aria-hidden="true">
        <svg viewBox="0 0 240 132">
          {scatter.map(([dx, dy, r], i) => (
            <rect key={i} className="mt-sq" x={74 + (i % 3) * 34} y={14 + Math.floor(i / 3) * 34} width={24} height={24}
              style={v({"--dx": dx + "px", "--dy": dy + "px", "--r": r + "deg", "--i": i})}/>
          ))}
        </svg>
        <figcaption>HETEROGÉNEO → ESTANDARIZADO</figcaption>
      </figure>
    );
  }
  if (id === "interrupcion") {
    return (
      <figure className="mt-need" aria-hidden="true">
        <svg viewBox="0 0 240 132">
          <rect className="mt-orig" x="58" y="30" width="64" height="64"/>
          <rect className="mt-copy" x="126" y="38" width="64" height="64"/>
          <path className="mt-draw mt-arrow" pathLength={1} d="M92 116H160M152 110L160 116L152 122"/>
        </svg>
        <figcaption>ORIGINAL · COPIA · RECUPERACIÓN</figcaption>
      </figure>
    );
  }
  if (id === "riesgos") {
    return (
      <figure className="mt-need" aria-hidden="true">
        <svg viewBox="0 0 240 132">
          <rect x="100" y="46" width="40" height="40" className="mt-core"/>
          <path className="mt-draw mt-perim" pathLength={1} d="M76 22H164V110H76Z"/>
          {[[24, 30, 70, 40], [214, 40, 170, 52], [30, 112, 72, 96], [216, 104, 170, 92]].map(([x, y, tx, ty], i) => (
            <circle key={i} className="mt-threat" cx={tx} cy={ty} r="4" style={v({"--fx": x - tx + "px", "--fy": y - ty + "px", "--i": i})}/>
          ))}
        </svg>
        <figcaption>EXPOSICIÓN → PERÍMETRO DEFINIDO</figcaption>
      </figure>
    );
  }
  return (
    <figure className="mt-need" aria-hidden="true">
      <svg viewBox="0 0 240 132">
        <path className="mt-noise" d="M12 66L30 30L44 98L60 40L74 90L88 50L104 82L118 58L132 74L146 62L160 70L174 64L228 66"/>
        <path className="mt-draw mt-steady" pathLength={1} d="M12 66H228"/>
        <circle className="mt-dot" cx="228" cy="66" r="5"/>
      </svg>
      <figcaption>REACTIVO → MONITOREADO</figcaption>
    </figure>
  );
}

/* Método: de lo enredado a lo operable. Tres marcas para los tres pasos. */
export function MethodLine() {
  return (
    <svg viewBox="0 0 1200 120" className="mt-method" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      <path className="mt-draw mt-tangle" pathLength={1}
        d="M8 64C58 14 108 14 118 54C128 94 68 104 68 64C68 24 158 14 188 54C213 89 158 109 158 74C158 34 258 24 278 59C293 86 248 94 253 69C260 39 330 46 380 62L1192 62"/>
      {[380, 780, 1180].map((x, i) => (
        <g key={x} className="mt-mark" style={v({"--i": i})}>
          <circle cx={x} cy={62} r="9"/>
          <text x={x} y="98" textAnchor="middle" className="mt-lbl mt-lbl-dark">0{i + 1}</text>
        </g>
      ))}
      <text x="8" y="118" className="mt-lbl mt-lbl-dark">COMPLEJO</text>
      <text x="1192" y="34" textAnchor="end" className="mt-lbl mt-lbl-dark mt-mark-end">OPERABLE</text>
    </svg>
  );
}

/* Cierre: su entorno y nuestra ingeniería se encuentran en el alcance. */
export function ScopeVenn() {
  return (
    <svg viewBox="0 0 520 300" className="mt-venn" role="img" aria-labelledby="venn-t">
      <title id="venn-t">Su entorno y nuestra ingeniería se encuentran en el alcance de la evaluación.</title>
      <defs>
        <clipPath id="venn-a"><circle cx="205" cy="150" r="112"/></clipPath>
        <radialGradient id="venn-g" cx="50%" cy="50%" r="60%">
          <stop offset="0" stopColor="#596BD6"/>
          <stop offset="1" stopColor="#2D43E7"/>
        </radialGradient>
      </defs>
      <g className="mt-venn-a"><circle cx="205" cy="150" r="112"/></g>
      <g className="mt-venn-b"><circle cx="315" cy="150" r="112"/></g>
      <g className="mt-venn-x" clipPath="url(#venn-a)"><circle cx="315" cy="150" r="112" fill="url(#venn-g)"/></g>
      <text x="140" y="155" textAnchor="middle" className="mt-lbl mt-venn-l">SU ENTORNO</text>
      <text x="372" y="146" textAnchor="middle" className="mt-lbl mt-venn-l"><tspan x="372">NUESTRA</tspan><tspan x="372" dy="16">INGENIERÍA</tspan></text>
      <text x="260" y="155" textAnchor="middle" className="mt-lbl mt-venn-k">ALCANCE</text>
    </svg>
  );
}
