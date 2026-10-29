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

/* Momento en que el pulso, que baja por la columna en un ciclo de 3,6 s,
   alcanza cada capa: así cada capa se ilumina justo cuando el pulso pasa. */
const pulseAt = [0.332, 0.515, 0.698, 0.882];
/* Duraciones distintas para que los paquetes no se muevan al unísono. */
const packetSpeed = [[4.2, 5.6], [5.1, 3.9], [3.6, 6.2], [6.8, 4.6]];

export function HeroIceberg() {
  return (
    <svg viewBox="0 0 560 440" className="mt-ice" role="img" aria-labelledby="ice-t ice-d">
      <title id="ice-t">Lo que se ve y lo que lo sostiene</title>
      <desc id="ice-d">Sobre una línea, una sola pieza: su operación. Debajo, capas de red, cómputo, datos y respaldo por las que circula información, rodeadas por un perímetro de seguridad. Modelo conceptual.</desc>
      <defs>
        <linearGradient id="ice-water" x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0"/>
          <stop offset=".5" stopColor="#fff" stopOpacity=".9"/>
          <stop offset="1" stopColor="#fff" stopOpacity="0"/>
        </linearGradient>
      </defs>
      <g className="mt-ice-top">
        <rect className="mt-ice-ping" x="248" y="58" width="64" height="64"/>
        <rect x="248" y="58" width="64" height="64" fill="#fff"/>
        <text x="330" y="96" className="mt-lbl">SU OPERACIÓN</text>
      </g>
      <path className="mt-draw mt-ice-water" pathLength={1} d="M0 150H560"/>
      <rect className="mt-ice-shine" x="-120" y="149" width="120" height="2" fill="url(#ice-water)"/>
      <text x="0" y="140" className="mt-lbl mt-ice-cap">LO QUE SE VE</text>
      <text x="0" y="170" className="mt-lbl mt-ice-cap">LO QUE LO SOSTIENE</text>
      <path className="mt-draw mt-ice-spine" pathLength={1} d="M280 122V392"/>
      {layers.map((l, i) => {
        const y = 196 + i * 48, x = 280 - l.w / 2;
        return (
          <g key={l.label} className="mt-ice-layer" style={v({"--i": i})}>
            <rect className="mt-ice-box" x={x} y={y} width={l.w} height={34} style={v({"--hit": pulseAt[i] * 3.6 + "s"})}/>
            <text x={280} y={y + 21.5} textAnchor="middle" className="mt-lbl mt-lbl-in">{l.label}</text>
            {packetSpeed[i].map((s, k) => (
              <circle key={k} className="mt-ice-packet" cx={x + 12} cy={y + 28} r="1.8"
                style={v({"--len": l.w - 24 + "px", "--t": s + "s", "--o": (k * 1.3 + i * .7).toFixed(1) + "s", "--dir": k ? "reverse" : "normal"})}/>
            ))}
          </g>
        );
      })}
      <path className="mt-draw mt-ice-guard" pathLength={1} d="M20 180H540V410H20Z"/>
      <path className="mt-ice-scan" d="M20 180H540V410H20Z"/>
      <circle className="mt-ice-pulse" cx="280" cy="126" r="4"/>
      <text x="532" y="400" textAnchor="end" className="mt-lbl mt-ice-guard-l">SEGURIDAD</text>
    </svg>
  );
}

/* Sección "Cómo entregamos": el mismo sistema en tres momentos.
   plan: se dibuja como plano; build: se construye y se prueba;
   doc: queda dentro de un documento para operarlo. */
const sdNodes = [[110, 14], [36, 72], [184, 72], [110, 130]];
const sdEdges = ["M140 40L66 72", "M140 40L214 72", "M66 98L140 130", "M214 98L140 130"];

function SdDiagram({solid}: {solid: boolean}) {
  return (
    <>
      {sdEdges.map((d, k) => <path key={d} className={solid ? "mt-draw sd-edge" : "sd-edge-plan"} pathLength={solid ? 1 : undefined} d={d} style={v({"--k": k})}/>)}
      {sdNodes.map(([x, y], k) => <rect key={k} className={solid ? "sd-node" : "sd-node-plan"} x={x} y={y} width="60" height="26" style={v({"--k": k})}/>)}
    </>
  );
}

export function StageDiagram({stage}: {stage: "plan" | "build" | "doc"}) {
  return (
    <svg viewBox="0 0 280 190" className={"sd sd-" + stage} aria-hidden="true">
      {stage === "plan" && <>
        <defs>
          <pattern id="sd-grid" width="14" height="14" patternUnits="userSpaceOnUse">
            <path d="M14 0H0V14" fill="none" stroke="#d3d9ff" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect className="sd-bg" width="280" height="190" fill="url(#sd-grid)"/>
        <SdDiagram solid={false}/>
        <g className="sd-dim">
          <path d="M110 6H170M110 2V10M170 2V10"/>
          <path d="M28 72V98M24 72H32M24 98H32"/>
        </g>
        <text x="8" y="182" className="sd-lbl sd-lbl-plan">PLANO</text>
      </>}
      {stage === "build" && <>
        <SdDiagram solid/>
        {sdNodes.map(([x, y], k) => (
          <g key={k} className="sd-check" style={v({"--k": k})}>
            <circle cx={x + 60} cy={y} r="7"/>
            <path d={`M${x + 56.5} ${y}l2.5 2.5l4.5-5`}/>
          </g>
        ))}
        <text x="36" y="168" className="sd-lbl">PRUEBAS</text>
        <rect x="36" y="174" width="208" height="4" className="sd-track"/>
        <rect x="36" y="174" width="208" height="4" className="sd-bar"/>
        <text x="244" y="168" textAnchor="end" className="sd-lbl sd-ok">APROBADAS</text>
      </>}
      {stage === "doc" && <>
        <g className="sd-page">
          <path className="sd-sheet" d="M58 6H198L222 30V186H58Z"/>
          <path className="sd-fold" d="M198 6V30H222"/>
          <g transform="translate(76 18) scale(.43)" className="sd-mini"><SdDiagram solid/></g>
          {["M76 112H204", "M76 124H192", "M76 136H204", "M76 148H156", "M76 160H184", "M76 172H140"].map((d, k) => (
            <path key={d} className="mt-draw sd-line" pathLength={1} d={d} style={v({"--k": k})}/>
          ))}
        </g>
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
  if (id === "consolidar") {
    return (
      <figure className="mt-need" aria-hidden="true">
        <svg viewBox="0 0 240 132">
          <path className="mt-draw mt-perim" pathLength={1} d="M66 14H174V118H66Z"/>
          {scatter.slice(0, 6).map(([dx, dy, r], i) => (
            <rect key={i} className="mt-sq" x={78 + (i % 3) * 30} y={30 + Math.floor(i / 3) * 40} width={24} height={30}
              style={v({"--dx": dx * 1.6 + "px", "--dy": dy + "px", "--r": r + "deg", "--i": i})}/>
          ))}
        </svg>
        <figcaption>DISPERSO → CONSOLIDADO</figcaption>
      </figure>
    );
  }
  if (id === "ia") {
    const pts = [[90, 34], [150, 30], [176, 66], [148, 102], [92, 100], [66, 66]];
    return (
      <figure className="mt-need" aria-hidden="true">
        <svg viewBox="0 0 240 132">
          <path className="mt-draw mt-perim" pathLength={1} d="M46 12H194V120H46Z"/>
          {pts.map(([x, y], i) => (
            <path key={"l" + i} className="mt-draw mt-link" pathLength={1} d={`M${x} ${y}L120 66`} style={v({"--i": i})}/>
          ))}
          {pts.map(([x, y], i) => <circle key={i} className="mt-datum" cx={x} cy={y} r="5" style={v({"--i": i})}/>)}
          <rect className="mt-core mt-node" x="108" y="54" width="24" height="24"/>
        </svg>
        <figcaption>SUS DATOS, BAJO SU CONTROL</figcaption>
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

/* CoreOnCloud: dos centros de datos en Ecuador, replicados entre sí. Sobre
   fondo oscuro. Un pulso recorre la réplica en ambos sentidos, una vez. */
export function TwoSites() {
  return (
    <svg viewBox="0 0 560 300" className="mt-sites" role="img" aria-labelledby="sites-t">
      <title id="sites-t">Dos centros de datos en Ecuador, Cuenca y Guayaquil, replicados entre sí.</title>
      <g className="mt-site" style={v({"--i": 0})}>
        <rect x="40" y="80" width="150" height="150"/>
        <text x="115" y="150" textAnchor="middle" className="mt-site-code">CUE</text>
        <text x="115" y="176" textAnchor="middle" className="mt-lbl">CUENCA</text>
      </g>
      <g className="mt-site" style={v({"--i": 1})}>
        <rect x="370" y="80" width="150" height="150"/>
        <text x="445" y="150" textAnchor="middle" className="mt-site-code">GYE</text>
        <text x="445" y="176" textAnchor="middle" className="mt-lbl">GUAYAQUIL</text>
      </g>
      <path className="mt-draw mt-sync" pathLength={1} d="M190 136H370"/>
      <path className="mt-draw mt-sync mt-sync-b" pathLength={1} d="M370 174H190"/>
      <path className="mt-sync-head" d="M360 130L370 136L360 142M200 168L190 174L200 180"/>
      <circle className="mt-sync-dot" cx="190" cy="136" r="4"/>
      <circle className="mt-sync-dot mt-sync-dot-b" cx="370" cy="174" r="4"/>
      <text x="280" y="120" textAnchor="middle" className="mt-lbl mt-sync-l">RÉPLICA</text>
      <text x="280" y="272" textAnchor="middle" className="mt-lbl">COREONCLOUD · ECUADOR</text>
    </svg>
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
