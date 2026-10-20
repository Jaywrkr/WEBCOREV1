"""Genera el logotipo oficial (wordmark CORESOLUTIONS, IBM Plex Sans Condensed Bold)
como SVG con contornos, para que no dependa de la carga de fuentes.

Salida: assets/brand/coresolutions-{navy,white,black}.svg y el fragmento
inline que usa tools/build.py (assets/brand/wordmark.svgfrag)."""
import os
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONT = os.path.join(ROOT, 'assets', 'fonts', 'ibmplexsanscondensed-700.woff2')
OUT = os.path.join(ROOT, 'assets', 'brand')
TEXT = 'CORESOLUTIONS'
TRACK = 0.0  # tracking adicional en em (el logotipo oficial usa el espaciado natural)

f = TTFont(FONT)
upm = f['head'].unitsPerEm
cmap = f.getBestCmap()
gs = f.getGlyphSet()
hmtx = f['hmtx']
cap = f['OS/2'].sCapHeight if hasattr(f['OS/2'], 'sCapHeight') and f['OS/2'].sCapHeight else 698

x = 0
paths = []
for ch in TEXT:
    g = cmap[ord(ch)]
    pen = SVGPathPen(gs)
    # Fuente: y hacia arriba. SVG: y hacia abajo. Volteamos y bajamos a la línea base = cap.
    tpen = TransformPen(pen, (1, 0, 0, -1, x, cap))
    gs[g].draw(tpen)
    d = pen.getCommands()
    if d:
        paths.append(d)
    x += hmtx[g][0] + TRACK * upm

PAD = 14  # margen para el sobrepaso óptico de O y S
W, H = int(round(x)) + 2 * PAD, int(cap) + 2 * PAD
vb = '%d %d %d %d' % (-PAD, -PAD, W, H)
d_all = ' '.join(paths)
os.makedirs(OUT, exist_ok=True)
frag = '<svg class="logo" viewBox="%s" aria-hidden="true" focusable="false"><path d="%s"/></svg>' % (vb, d_all)
with open(os.path.join(OUT, 'wordmark.svgfrag'), 'w') as fh:
    fh.write(frag)
for name, color in (('navy', '#01095C'), ('white', '#FFFFFF'), ('black', '#000000')):
    svg = ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="%s" width="%d" height="%d" role="img" aria-label="Coresolutions">'
           '<title>Coresolutions</title><path fill="%s" d="%s"/></svg>') % (vb, W, H, color, d_all)
    with open(os.path.join(OUT, 'coresolutions-%s.svg' % name), 'w') as fh:
        fh.write(svg)
print('logo', W, 'x', H, 'em', upm, 'cap', cap)
