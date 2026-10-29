import type {CSSProperties} from "react";

/* Diagramas de las capas de la portada. Mismo lenguaje que el modelo del hero:
   líneas blancas sobre negro, acentos azules, etiquetas monoespaciadas y un
   solo rojo para la falla. Cada uno retoma una idea ya presentada:
   capas que sostienen la operación, consolidación, original y copia,
   perímetro, modelo bajo control, señal estable y ruta alterna.
   Decorativos: el titular de cada tarjeta lleva el significado. */

const v = (vars: Record<string, string | number>) => vars as CSSProperties;

/* Infraestructura: el iceberg en miniatura, la operación sobre sus capas. */
export function ArtLayers() {
  const w = [110, 160, 210];
  return (
    <svg viewBox="0 0 320 180" className="art" aria-hidden="true">
      <rect x="146" y="14" width="28" height="28" fill="#fff"/>
      <path className="art-line" pathLength={1} d="M30 56H290"/>
      <path className="art-line art-faint" pathLength={1} d="M160 42V160"/>
      {w.map((x, k) => (
        <g key={x}>
          <rect className="art-box" x={160 - x / 2} y={70 + k * 32} width={x} height="20" style={v({"--k": k})}/>
          <circle className="art-packet" cx={160 - x / 2 + 8} cy={84 + k * 32} r="2" style={v({"--len": x - 16 + "px", "--k": k})}/>
        </g>
      ))}
      <text x="30" y="50" className="art-lbl">LO QUE SE VE</text>
      <text x="290" y="172" textAnchor="end" className="art-lbl">LO QUE LO SOSTIENE</text>
    </svg>
  );
}

/* Nube y virtualización: piezas dispersas que pasan a una sola plataforma. */
export function ArtConsolidate() {
  const loose = [[34, 40], [70, 28], [52, 78], [92, 66], [30, 116], [76, 120], [104, 104], [48, 150], [96, 146]];
  return (
    <svg viewBox="0 0 320 180" className="art" aria-hidden="true">
      {loose.map(([x, y], k) => <rect key={k} className="art-loose" x={x} y={y} width="16" height="16" style={v({"--k": k})}/>)}
      <path className="art-line art-accent" pathLength={1} d="M134 90H176"/>
      <path className="art-accent-fill" d="M170 84L178 90L170 96Z"/>
      <rect className="art-box" x="194" y="34" width="104" height="112"/>
      {loose.map((_, k) => <rect key={k} className="art-cell" x={206 + (k % 3) * 30} y={46 + Math.floor(k / 3) * 32} width="20" height="24" style={v({"--k": k})}/>)}
      <text x="34" y="172" className="art-lbl">DISPERSO</text>
      <text x="298" y="172" textAnchor="end" className="art-lbl">UNA PLATAFORMA</text>
    </svg>
  );
}

/* Protección de datos: el original y su copia verificada. */
export function ArtCopy() {
  return (
    <svg viewBox="0 0 320 180" className="art" aria-hidden="true">
      <rect className="art-orig" x="56" y="50" width="72" height="72"/>
      <rect className="art-copy" x="192" y="50" width="72" height="72"/>
      <path className="art-line art-dash" d="M128 86H192"/>
      <circle className="art-sync" cx="128" cy="86" r="3.5"/>
      <g className="art-check">
        <circle cx="264" cy="50" r="10"/>
        <path d="M259 50l3.5 3.5L269 46"/>
      </g>
      <text x="92" y="146" textAnchor="middle" className="art-lbl">ORIGINAL</text>
      <text x="228" y="146" textAnchor="middle" className="art-lbl">COPIA VERIFICADA</text>
    </svg>
  );
}

/* Ciberseguridad: el núcleo, su perímetro y lo que queda afuera. */
export function ArtPerimeter() {
  const threats = [[40, 34, 98, 52], [286, 40, 222, 58], [44, 150, 98, 128], [282, 146, 222, 124], [160, 8, 160, 30]];
  return (
    <svg viewBox="0 0 320 180" className="art" aria-hidden="true">
      <rect x="140" y="70" width="40" height="40" fill="#fff"/>
      <rect className="art-scan" x="100" y="32" width="120" height="116"/>
      {threats.map(([x, y, tx, ty], k) => (
        <g key={k}>
          <path className="art-trail" d={`M${x} ${y}L${tx} ${ty}`}/>
          <circle className="art-threat" cx={tx} cy={ty} r="3.5" style={v({"--k": k})}/>
        </g>
      ))}
      <text x="220" y="164" textAnchor="end" className="art-lbl">PERÍMETRO</text>
    </svg>
  );
}

/* IA on-premise: los datos alimentan el modelo sin salir del perímetro. */
export function ArtModel() {
  const pts = [[96, 44], [160, 30], [224, 44], [236, 112], [160, 140], [84, 112]];
  return (
    <svg viewBox="0 0 320 180" className="art" aria-hidden="true">
      <rect className="art-line art-dash" x="44" y="14" width="232" height="146" fill="none"/>
      {pts.map(([x, y], k) => <path key={"l" + k} className="art-link" d={`M${x} ${y}L160 86`} style={v({"--k": k})}/>)}
      {pts.map(([x, y], k) => <circle key={k} className="art-datum" cx={x} cy={y} r="5" style={v({"--k": k})}/>)}
      <rect x="146" y="72" width="28" height="28" fill="#fff"/>
      <text x="270" y="152" textAnchor="end" className="art-lbl">SU ENTORNO</text>
    </svg>
  );
}

/* Servicios gestionados: de una señal irregular a una operación estable. */
export function ArtSignal() {
  return (
    <svg viewBox="0 0 320 180" className="art" aria-hidden="true">
      <path className="art-noise" d="M24 92L44 50L60 132L78 60L94 120L110 72L126 108L140 82L154 98L168 86L182 94L196 90L296 90"/>
      <path className="art-line" pathLength={1} d="M24 90H296"/>
      <circle className="art-beat" cx="24" cy="90" r="4.5" style={v({"--len": "272px"})}/>
      {[64, 128, 192, 256].map(x => <path key={x} className="art-tick" d={`M${x} 104V112`}/>)}
      <text x="24" y="160" className="art-lbl">REACTIVO</text>
      <text x="296" y="160" textAnchor="end" className="art-lbl">MONITOREADO</text>
    </svg>
  );
}

/* Demostración: cae un componente y la operación sigue por la ruta alterna. */
export function ArtFailover() {
  return (
    <svg viewBox="0 0 640 180" className="art" aria-hidden="true">
      <g className="art-lines">
        <path d="M110 90H200L268 44H420"/>
        <path className="art-alt" pathLength={1} d="M200 90L268 136H420"/>
      </g>
      {[["USUARIOS", 30, 72, 80], ["RED", 200, 72, 68]].map(([l, x, y, w]) => (
        <g key={l as string}><rect className="art-box" x={x as number} y={y as number} width={w as number} height="36"/><text x={(x as number) + 12} y={(y as number) + 23} className="art-lbl art-lbl-in">{l}</text></g>
      ))}
      <g className="art-fail">
        <rect x="268" y="26" width="104" height="36"/>
        <text x="280" y="49" className="art-lbl">CÓMPUTO</text>
        <path d="M352 36l10 10M362 36l-10 10"/>
      </g>
      <rect className="art-box" x="420" y="26" width="92" height="36"/><text x="432" y="49" className="art-lbl art-lbl-in">DATOS</text>
      <rect className="art-ok" x="268" y="118" width="128" height="36"/><text x="280" y="141" className="art-lbl art-lbl-in">CONTINGENCIA</text>
      <rect className="art-ok" x="420" y="118" width="104" height="36"/><text x="432" y="141" className="art-lbl art-lbl-in">RESPALDO</text>
      <circle className="art-route" cx="0" cy="0" r="5"/>
    </svg>
  );
}
