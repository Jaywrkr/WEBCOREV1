import type {CSSProperties} from "react";

/* Ilustraciones abstractas de la cuadrícula editorial de la portada, en la
   línea del blog de IBM Research: una pieza gráfica por tema, generada con
   SVG (sin imágenes externas). Son decorativas: el titular de cada tarjeta
   lleva el significado. Formato 16:9. */

const v = (vars: Record<string, string | number>) => vars as CSSProperties;

/* Pseudoaleatorio determinista: el mismo dibujo en servidor y cliente. */
function rand(seed: number) {
  let s = seed;
  return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
}

/* Infraestructura: un cilindro cromado, la pieza física que sostiene todo. */
export function ArtInfra() {
  return (
    <svg viewBox="0 0 320 180" className="art art-infra" aria-hidden="true">
      <defs>
        <linearGradient id="ai-metal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1e1e1e"/><stop offset=".08" stopColor="#6e6e6e"/>
          <stop offset=".18" stopColor="#f7f7f7"/><stop offset=".27" stopColor="#5a5a5a"/>
          <stop offset=".42" stopColor="#c8c8c8"/><stop offset=".5" stopColor="#ffffff"/>
          <stop offset=".6" stopColor="#6b6b6b"/><stop offset=".76" stopColor="#e2e2e2"/>
          <stop offset=".9" stopColor="#4a4a4a"/><stop offset="1" stopColor="#141414"/>
        </linearGradient>
        <linearGradient id="ai-cap" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c9d0ff"/><stop offset=".45" stopColor="#6f80ff"/>
          <stop offset=".8" stopColor="#ff7a45"/><stop offset="1" stopColor="#e5262f"/>
        </linearGradient>
        <linearGradient id="ai-fade" x1="0" x2="1">
          <stop offset="0" stopColor="#000" stopOpacity=".55"/><stop offset=".25" stopColor="#000" stopOpacity="0"/>
        </linearGradient>
      </defs>
      <rect width="320" height="180" fill="#000"/>
      <g className="art-move">
        <path d="M40 38H254V142H40A17 52 0 0 1 40 38Z" fill="url(#ai-metal)"/>
        {Array.from({length: 13}, (_, k) => <path key={k} d={`M28 ${46 + k * 7.5}H254`} stroke="#000" strokeOpacity=".07"/>)}
        <path d="M40 38H254V142H40A17 52 0 0 1 40 38Z" fill="url(#ai-fade)"/>
        <ellipse cx="254" cy="90" rx="18" ry="52" fill="#101010"/>
        <ellipse cx="257" cy="90" rx="14" ry="47" fill="url(#ai-cap)" className="art-glow"/>
        <ellipse cx="252" cy="70" rx="3" ry="16" fill="#fff" fillOpacity=".35"/>
      </g>
    </svg>
  );
}

/* Nube y virtualización: muchas piezas físicas que pasan a un circuito virtual. */
export function ArtCloud() {
  const r = rand(7);
  const circles = [];
  for (let c = 0; c < 4; c++) for (let k = 0; k < 6; k++) {
    circles.push({x: 26 + c * 34, y: 18 + k * 30, rr: 9 + r() * 9, o: .25 + r() * .75});
  }
  const rows = [26, 58, 90, 122, 154];
  return (
    <svg viewBox="0 0 320 180" className="art art-cloud" aria-hidden="true">
      <defs>
        <linearGradient id="ac-bg" x1="0" x2="1">
          <stop offset="0" stopColor="#2d43e7"/><stop offset="1" stopColor="#596bd6"/>
        </linearGradient>
      </defs>
      <rect width="320" height="180" fill="url(#ac-bg)"/>
      {circles.map((c, k) => <circle key={k} className="art-bob" cx={c.x} cy={c.y} r={c.rr} fill="#fff" fillOpacity={c.o} style={v({"--k": k % 6})}/>)}
      <g stroke="#fff" strokeOpacity=".55" fill="none">
        {rows.map(y => <path key={y} d={`M168 ${y}H306`}/>)}
        {[190, 228, 266].map((x, k) => <path key={x} d={`M${x} ${rows[k]}V${rows[k + 2]}`}/>)}
      </g>
      {rows.flatMap((y, i) => [180, 214, 248, 282].filter((_, j) => (i + j) % 2 === 0).map(x => (
        <rect key={x + "-" + y} x={x - 6} y={y - 6} width="12" height="12" fill="#2d43e7" stroke="#fff"/>
      )))}
      {[190, 228, 266].map((x, k) => <circle key={x} cx={x} cy={rows[k]} r="3.5" fill="#fff"/>)}
    </svg>
  );
}

/* Ciberseguridad: perímetros anidados y amenazas que quedan afuera. */
export function ArtSecurity() {
  const hex = (r: number, rot: number) => Array.from({length: 6}, (_, k) => {
    const a = (Math.PI / 3) * k + rot;
    return `${(160 + r * Math.cos(a)).toFixed(1)},${(90 + r * Math.sin(a)).toFixed(1)}`;
  }).join(" ");
  return (
    <svg viewBox="0 0 320 180" className="art art-sec" aria-hidden="true">
      <rect width="320" height="180" fill="#e5e7eb"/>
      <g className="art-spin" fill="none" stroke="#121720" strokeWidth=".8">
        {Array.from({length: 9}, (_, k) => <polygon key={k} points={hex(22 + k * 7.5, k * 0.06)} strokeOpacity={.35 + k * .07}/>)}
      </g>
      {[[44, 30], [286, 46], [262, 160], [52, 150], [160, 8], [310, 110]].map(([x, y], k) => (
        <circle key={k} cx={x} cy={y} r="3.2" fill="#e5262f" className="art-blink" style={v({"--k": k})}/>
      ))}
    </svg>
  );
}

/* Protección de datos: copias sucesivas de un mismo círculo. */
export function ArtBackup() {
  return (
    <svg viewBox="0 0 320 180" className="art art-backup" aria-hidden="true">
      <rect width="320" height="180" fill="#dde1e6"/>
      <g className="art-spin-slow" fill="none" stroke="#fa4d56" strokeWidth=".7">
        {Array.from({length: 34}, (_, k) => {
          const a = (k / 34) * Math.PI * 1.15 - 0.4;
          return <circle key={k} cx={150 + 46 * Math.cos(a)} cy={98 + 34 * Math.sin(a)} r={44 + (k % 5) * 3} strokeOpacity={.35 + (k % 4) * .15}/>;
        })}
      </g>
      <circle cx="150" cy="98" r="44" fill="none" stroke="#da1e28" strokeWidth="2"/>
    </svg>
  );
}

/* Servicios gestionados: puntos de estado que revelan una degradación. */
export function ArtOps() {
  const states = ["#42be65", "#42be65", "#42be65", "#a7d14b", "#f1c21b", "#ff832b", "#fa4d56", "#da1e28"];
  return (
    <svg viewBox="0 0 320 180" className="art art-ops" aria-hidden="true">
      <rect width="320" height="180" fill="#f4f4f4"/>
      <g fill="#8d8d8d">
        {[46, 98, 150].flatMap(y => Array.from({length: 46}, (_, k) => <circle key={y + "-" + k} cx={12 + k * 6.6} cy={y} r=".8"/>))}
      </g>
      {states.map((c, k) => (
        <circle key={k} cx={28 + k * 37} cy={22 + k * 19} r="5.5" fill={c} className="art-pop" style={v({"--k": k})}/>
      ))}
    </svg>
  );
}

/* IA on-premise: fuentes de datos que alimentan un modelo dentro de su perímetro. */
export function ArtAI() {
  const ys = [34, 90, 146];
  return (
    <svg viewBox="0 0 320 180" className="art art-ai" aria-hidden="true">
      <rect width="320" height="180" fill="#000"/>
      <rect x="12" y="10" width="296" height="160" fill="none" stroke="#525252" strokeDasharray="3 5"/>
      <g fill="none" stroke="#fff" strokeWidth="1">
        {ys.map(y => <path key={y} d={`M76 ${y}H120M134 ${y}H196`}/>)}
        <path d="M196 34C214 34 222 70 226 90M196 146C214 146 222 110 226 90M196 90H226" className="art-flow"/>
        <path d="M196 26C252 26 286 70 286 90C286 110 252 154 196 154C214 128 214 52 196 26Z"/>
        <path d="M286 90H306"/>
      </g>
      {ys.map(y => <rect key={y} x="34" y={y - 18} width="36" height="36" fill="#fff"/>)}
      {ys.map(y => (
        <g key={"g" + y}>
          <rect x="120" y={y - 7} width="14" height="14" fill="#000" stroke="#fff"/>
          <path d={`M123 ${y + 3}L127 ${y - 2}L131 ${y + 3}`} fill="none" stroke="#fff"/>
        </g>
      ))}
      <path d="M52 56V68M52 112V124" stroke="#fff" strokeDasharray="1 3"/>
    </svg>
  );
}

/* CoreOnCloud: dos sitios, con datos que se replican de uno a otro. */
export function ArtTwin() {
  const r = rand(19);
  const dots = (cx: number) => Array.from({length: 7}, () => ({x: cx - 22 + r() * 44, y: 72 + r() * 40}));
  const a = dots(100), b = dots(220);
  return (
    <svg viewBox="0 0 320 180" className="art art-twin" aria-hidden="true">
      <rect width="320" height="180" fill="#01095c"/>
      <circle cx="100" cy="92" r="60" fill="none" stroke="#fff" strokeOpacity=".35"/>
      <circle cx="220" cy="92" r="60" fill="none" stroke="#fff" strokeOpacity=".35"/>
      {[...a, ...b].map((d, k) => <circle key={k} cx={d.x} cy={d.y} r="5" fill="#fff" fillOpacity={k % 3 ? 1 : .7}/>)}
      <circle className="art-travel" cx="128" cy="92" r="5" fill="#8b97ff"/>
      <text x="100" y="172" textAnchor="middle" className="art-lbl">CUE</text>
      <text x="220" y="172" textAnchor="middle" className="art-lbl">GYE</text>
    </svg>
  );
}

/* Demostración: un nodo cae y la ruta se desvía por el sitio alterno. */
export function ArtFailover() {
  const n: Record<string, [number, number]> = {u: [34, 90], r: [104, 90], a: [184, 46], b: [264, 46], c: [184, 134], d: [264, 134]};
  const line = (p: string, q: string) => `M${n[p][0]} ${n[p][1]}L${n[q][0]} ${n[q][1]}`;
  return (
    <svg viewBox="0 0 320 180" className="art art-fail" aria-hidden="true">
      <rect width="320" height="180" fill="#fff"/>
      <g stroke="#c6c6c6" fill="none">
        {[["u", "r"], ["r", "a"], ["a", "b"], ["r", "c"], ["c", "d"], ["a", "c"], ["b", "d"]].map(([p, q]) => <path key={p + q} d={line(p, q)}/>)}
      </g>
      <path d={`${line("u", "r")}L${n.c[0]} ${n.c[1]}L${n.d[0]} ${n.d[1]}`} fill="none" stroke="#2d43e7" strokeWidth="3" className="art-route" pathLength={1}/>
      {Object.entries(n).map(([k, [x, y]]) => (
        <circle key={k} cx={x} cy={y} r={k === "u" ? 10 : 8} fill={k === "a" ? "#da1e28" : k === "c" || k === "d" ? "#2d43e7" : "#121720"}/>
      ))}
      <path d="M178 40l12 12M190 40l-12 12" stroke="#fff" strokeWidth="2"/>
    </svg>
  );
}
