#!/usr/bin/env python3
"""Generador del sitio estático de Coresolutions.

Uso:  python3 tools/build.py
Escribe las páginas HTML, data.js, sitemap.xml y robots.txt en la raíz del repositorio.
El contenido vive en este archivo y en tools/partials/; los estilos en assets/css/site.css
y el comportamiento en assets/js/site.js.
"""
import html
import json
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PART = os.path.join(ROOT, 'tools', 'partials')
# Logotipo oficial (assets/brand): navy sobre fondos claros, blanco sobre oscuros.
LOGO = ('<img class="logo logo-navy" src="%(r)sassets/brand/coresolutions-navy.png" width="1276" height="138" alt="" decoding="async">'
        '<img class="logo logo-white" src="%(r)sassets/brand/coresolutions-white.png" width="1276" height="138" alt="" decoding="async">')
SITE = 'https://coresolutions.com.ec'
VERSION = '2026.11.0'

def part(name):
    with open(os.path.join(PART, name), encoding='utf-8') as f:
        return f.read()

ARROW = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>'
SEARCH = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="9" cy="9" r="6"/><path d="m14 14 4 4"/></svg>'
e = html.escape

# --------------------------------------------------------------------------- data
SOLS = [
    dict(slug='respaldo-y-continuidad', name='Respaldo y continuidad', interest='CoreOnCloud', layer='Datos',
         short='Respaldo gestionado, réplica y recuperación ante desastres.',
         icon='<path d="M7 18h10a4 4 0 0 0 .6-7.96A6 6 0 0 0 6.1 9.6 4.2 4.2 0 0 0 7 18Z"/>',
         lede='Sus datos respaldados, verificados y listos para recuperarse. Si algo falla, su operación vuelve a funcionar en el tiempo que usted definió.',
         pains=[('Respaldos que nadie prueba', 'Un respaldo que nunca se ha restaurado es una suposición, no una garantía.'),
                ('Ransomware', 'Si un atacante cifra también las copias de seguridad, no hay a dónde volver.'),
                ('Recuperación sin plan', 'Cuando ocurre el incidente, cada minuto se pierde decidiendo qué restaurar primero.')],
         incl=[('Respaldo gestionado', 'Copias automáticas de servidores, bases de datos y equipos, con la retención que usted defina.'),
               ('Copias inmutables', 'Copias que no pueden modificarse ni borrarse durante su periodo de retención.'),
               ('Réplica en CoreOnCloud', 'Una copia fuera de su sitio, en nuestra nube en Ecuador.'),
               ('Recuperación ante desastres (DRaaS)', 'Sus servidores críticos replicados y listos para funcionar en el sitio alterno.'),
               ('Pruebas de restauración', 'Verificamos periódicamente que cada respaldo se puede recuperar, y lo documentamos.')],
         steps=[('Diagnóstico', 'Definimos qué proteger y cuánto tiempo y datos puede perder (RTO y RPO).'),
                ('Diseño', 'Política de respaldo, retención y réplica a la medida de cada sistema.'),
                ('Implementación', 'Configuración, primera copia completa y réplica hacia CoreOnCloud.'),
                ('Operación', 'Monitoreo, pruebas de restauración y reportes periódicos.')],
         faq=[('¿Qué diferencia hay entre respaldo y DRaaS?', 'El respaldo guarda copias de sus datos para recuperarlos cuando los necesite. DRaaS mantiene sus servidores replicados y listos para encenderse en otro sitio, de modo que la operación se reanuda en mucho menos tiempo.'),
              ('¿Dónde se guardan mis copias?', 'En su sitio, en CoreOnCloud o en ambos. CoreOnCloud opera con recursos propios en Ecuador, en Cuenca y Guayaquil.'),
              ('¿Cada cuánto se prueban los respaldos?', 'Definimos la frecuencia con usted según la criticidad de cada sistema, y documentamos el resultado de cada prueba.')],
         tools=['respaldo', 'continuidad']),
    dict(slug='ciberseguridad', name='Ciberseguridad', interest='Ciberseguridad', layer='Seguridad',
         short='Protección de redes, endpoints, accesos y datos.',
         icon='<path d="M12 3 4.5 6v5.5c0 4.6 3.1 8 7.5 9.5 4.4-1.5 7.5-4.9 7.5-9.5V6L12 3Z"/><path d="m9 12 2 2 4-4"/>',
         lede='Reducimos la superficie de ataque de su organización y le damos visibilidad para actuar antes de que un incidente detenga su operación.',
         pains=[('Accesos sin control', 'Usuarios con más permisos de los que necesitan y contraseñas que se comparten.'),
                ('Equipos expuestos', 'Computadores y servidores sin protección actualizada son la puerta de entrada más común.'),
                ('Sin visibilidad', 'Si nadie revisa los eventos de seguridad, un ataque puede pasar inadvertido durante semanas.')],
         incl=[('Firewall de nueva generación', 'Control de tráfico, segmentación y prevención de intrusiones en el perímetro y entre redes.'),
               ('Protección de endpoints', 'Seguridad para computadores y servidores, con gestión centralizada.'),
               ('Acceso seguro', 'VPN, autenticación multifactor y permisos por rol.'),
               ('Protección de datos', 'Políticas y controles para evitar la fuga de información sensible.'),
               ('Evaluación de seguridad', 'Revisión de su configuración actual con recomendaciones priorizadas por riesgo.')],
         steps=[('Evaluación', 'Identificamos activos críticos, brechas y riesgos.'),
                ('Diseño', 'Definimos los controles y su prioridad según el impacto en su negocio.'),
                ('Implementación', 'Desplegamos por fases, en ventanas acordadas, sin detener la operación.'),
                ('Mejora continua', 'Revisamos eventos, actualizamos políticas y ajustamos controles.')],
         faq=[('¿Por dónde conviene empezar?', 'Por una evaluación. Nos permite priorizar lo que más reduce su riesgo con la inversión disponible, en lugar de comprar herramientas por separado.'),
              ('¿La implementación afecta la operación?', 'La planificamos por fases y en ventanas de trabajo acordadas con su equipo, con un plan de vuelta atrás para cada cambio.'),
              ('¿Me ayudan con requisitos normativos?', 'Alineamos los controles con los requisitos de su sector y con la Ley Orgánica de Protección de Datos Personales del Ecuador.')],
         tools=['inactividad']),
    dict(slug='redes-y-conectividad', name='Redes y conectividad', interest='Redes', layer='Conectividad',
         short='LAN, Wi-Fi, switching y segmentación empresarial.',
         icon='<rect x="10" y="3" width="4" height="4"/><rect x="3" y="17" width="4" height="4"/><rect x="17" y="17" width="4" height="4"/><path d="M12 7v5M12 12H5v5M12 12h7v5"/>',
         lede='Una red estable, segmentada y preparada para crecer, desde el switch de core hasta el Wi-Fi de cada sede.',
         pains=[('Caídas intermitentes', 'Fallas difíciles de diagnosticar que interrumpen el trabajo varias veces al mes.'),
                ('Red plana', 'Si todo está en la misma red, un incidente en un equipo puede alcanzar a todos los demás.'),
                ('Crecimiento sin diseño', 'Equipos añadidos sobre la marcha, sin documentación ni capacidad de reserva.')],
         incl=[('Switching de core y acceso', 'Equipos dimensionados para el tráfico actual y el crecimiento esperado.'),
               ('Wi-Fi empresarial', 'Cobertura planificada, roaming y redes separadas para invitados.'),
               ('Segmentación', 'Redes virtuales que separan áreas, servicios y niveles de riesgo.'),
               ('Conectividad entre sedes', 'Enlaces seguros entre oficinas, plantas y centros de datos.'),
               ('Documentación y monitoreo', 'Diagramas actualizados y alertas ante fallas.')],
         steps=[('Levantamiento', 'Inventario, tráfico real y puntos de falla de su red actual.'),
                ('Diseño', 'Arquitectura, segmentación y plan de migración.'),
                ('Instalación', 'Montaje, configuración y migración en ventanas acordadas.'),
                ('Entrega', 'Documentación, capacitación y soporte.')],
         faq=[('¿Pueden trabajar sobre la red que ya tengo?', 'Sí. Partimos de un levantamiento de su red actual y reutilizamos lo que siga siendo adecuado.'),
              ('¿Cuánto tiempo estará la red fuera de servicio?', 'Planificamos la migración por etapas y en horarios de baja actividad para que la interrupción sea mínima.'),
              ('¿Incluye el Wi-Fi?', 'Sí. Diseñamos la cobertura según los espacios y el número de usuarios de cada sede.')],
         tools=['migracion']),
    dict(slug='data-center', name='Data Center y sistemas', interest='Infraestructura', layer='Infraestructura',
         short='Servidores, almacenamiento y alta disponibilidad.',
         icon='<rect x="3" y="3" width="18" height="7"/><rect x="3" y="14" width="18" height="7"/><path d="M6.5 6.5h1M6.5 17.5h1M11 6.5h6M11 17.5h6"/>',
         lede='Servidores y almacenamiento dimensionados para sus cargas críticas, con alta disponibilidad y un plan de renovación claro.',
         pains=[('Equipos al final de su vida útil', 'Hardware sin soporte del fabricante y con riesgo creciente de falla.'),
                ('Almacenamiento al límite', 'Espacio y rendimiento insuficientes que frenan sistemas clave.'),
                ('Punto único de falla', 'Un solo equipo que, si se detiene, detiene a toda la organización.')],
         incl=[('Servidores empresariales', 'Plataformas dimensionadas para sus aplicaciones y su crecimiento.'),
               ('Almacenamiento', 'Soluciones all-flash e híbridas según rendimiento y capacidad requeridos.'),
               ('Alta disponibilidad', 'Redundancia en energía, red y cómputo para eliminar puntos únicos de falla.'),
               ('Modernización', 'Migración ordenada desde plataformas antiguas.'),
               ('Mantenimiento y soporte', 'Atención técnica y gestión de garantías durante toda la vida del equipo.')],
         steps=[('Evaluación', 'Inventario, uso real y riesgos de su plataforma actual.'),
                ('Dimensionamiento', 'Cálculo de capacidad, rendimiento y crecimiento.'),
                ('Implementación', 'Instalación, configuración y migración de cargas.'),
                ('Soporte', 'Mantenimiento preventivo y atención de incidentes.')],
         faq=[('¿Conviene renovar equipos o pasar a la nube?', 'Depende de sus cargas, su presupuesto y sus requisitos. Muchas organizaciones combinan ambas; le ayudamos a decidir con números.'),
              ('¿Cómo dimensionan los equipos?', 'Medimos el uso real de su plataforma actual y proyectamos el crecimiento antes de recomendar.'),
              ('¿Incluye la migración?', 'Sí. Planificamos y ejecutamos la migración de cargas con su equipo.')],
         tools=['sla', 'inactividad']),
    dict(slug='virtualizacion-hci', name='Virtualización y HCI', interest='Infraestructura', layer='Infraestructura',
         short='Consolidación de cargas y plataformas hiperconvergentes.',
         icon='<rect x="3" y="3" width="8" height="8"/><rect x="13" y="3" width="8" height="8"/><rect x="3" y="13" width="8" height="8"/><rect x="13" y="13" width="8" height="8"/>',
         lede='Menos equipos y más control: consolidamos sus servidores en una plataforma virtual o hiperconvergente fácil de operar y de escalar.',
         pains=[('Demasiados servidores físicos', 'Equipos subutilizados que consumen energía, espacio y mantenimiento.'),
                ('Gestión compleja', 'Varias consolas y procedimientos distintos para tareas simples.'),
                ('Crecer es lento', 'Cada nuevo sistema requiere comprar e instalar hardware.')],
         incl=[('Virtualización de servidores', 'Sus cargas en máquinas virtuales sobre una plataforma confiable.'),
               ('Infraestructura hiperconvergente', 'Cómputo, almacenamiento y red integrados y gestionados como uno solo.'),
               ('Migración de cargas', 'Paso planificado de servidores físicos o plataformas antiguas.'),
               ('Escritorios virtuales', 'Puestos de trabajo centralizados y seguros.'),
               ('Operación y soporte', 'Actualizaciones, monitoreo y atención técnica.')],
         steps=[('Análisis', 'Inventario de cargas y su consumo real.'),
                ('Diseño', 'Plataforma, capacidad y alta disponibilidad.'),
                ('Migración', 'Traslado ordenado de cargas con pruebas.'),
                ('Operación', 'Capacitación y soporte continuo.')],
         faq=[('¿Qué es la hiperconvergencia?', 'Es una plataforma en la que cómputo, almacenamiento y red se integran en nodos que se gestionan como un único sistema y crecen agregando nodos.'),
              ('¿Mis aplicaciones son compatibles?', 'La gran mayoría de aplicaciones empresariales funciona sin cambios en un entorno virtual. Lo verificamos en el análisis.'),
              ('¿Cuánto tarda una migración?', 'Depende del volumen y de las ventanas disponibles. Puede estimarlo con nuestra calculadora de tiempo de migración.')],
         tools=['migracion']),
    dict(slug='automatizacion-ia', name='Automatización e IA', interest='Automatización e IA', layer=None,
         short='Automatización de procesos e inteligencia artificial aplicada.',
         icon='<path d="M4 7h10M4 12h16M4 17h7"/><path d="m16 15 2 2 3-4"/>',
         lede='Identificamos tareas repetitivas y casos de uso donde la automatización y la inteligencia artificial generan valor medible, y los integramos con sus sistemas.',
         pains=[('Tareas manuales repetitivas', 'Horas del equipo dedicadas a copiar, revisar y mover información.'),
                ('Información dispersa', 'Datos en correos, hojas de cálculo y sistemas que no se comunican.'),
                ('Pilotos que no escalan', 'Pruebas de IA que nunca llegan a producción.')],
         incl=[('Descubrimiento de casos de uso', 'Identificamos dónde la automatización ahorra más tiempo o reduce más errores.'),
               ('Automatización de procesos', 'Flujos que eliminan tareas manuales entre sistemas.'),
               ('Integraciones', 'Conexión entre sus aplicaciones para que la información fluya.'),
               ('IA aplicada', 'Asistentes, clasificación de documentos y búsqueda sobre su información interna.'),
               ('Gobierno y seguridad', 'Control de accesos y protección de datos en cada solución.')],
         steps=[('Descubrimiento', 'Talleres con su equipo para priorizar casos de uso.'),
                ('Prototipo', 'Una primera versión funcional sobre un caso acotado.'),
                ('Integración', 'Conexión con sus sistemas y puesta en producción.'),
                ('Medición', 'Seguimiento del impacto y mejora continua.')],
         faq=[('¿Necesito tener mis datos ordenados para empezar?', 'No necesariamente. Parte del trabajo inicial es identificar qué información existe y cómo aprovecharla.'),
              ('¿Mis datos quedan expuestos al usar IA?', 'Diseñamos cada solución con control de accesos y protección de datos, y le explicamos dónde se procesa la información.'),
              ('¿Cuánto se tarda en ver resultados?', 'Trabajamos con un primer caso acotado para mostrar valor antes de escalar.')],
         tools=[]),
]
SOL_BY = {s['slug']: s for s in SOLS}

SECTORS = [
    dict(k='coop', n='Cooperativas y finanzas', m='Disponibilidad, respaldo y protección de datos para cumplir con la SEPS y atender a sus socios sin interrupciones.', p=['Continuidad del core financiero', 'Protección de datos de socios', 'Cumplimiento regulatorio'], s=['Respaldo y continuidad', 'Ciberseguridad', 'Data Center']),
    dict(k='salud', n='Salud', m='Sistemas clínicos siempre disponibles e información del paciente protegida.', p=['Historia clínica disponible', 'Red hospitalaria confiable', 'Datos de pacientes protegidos'], s=['Redes', 'Respaldo y continuidad', 'Ciberseguridad']),
    dict(k='industria', n='Industria', m='Planta conectada y datos de producción protegidos, para que la línea no se detenga.', p=['Conectividad de planta', 'Servidores de producción disponibles', 'Recuperación rápida ante fallas'], s=['Redes', 'Virtualización', 'Respaldo y continuidad']),
    dict(k='publico', n='Sector público', m='Plataformas confiables para servicios ciudadanos, con experiencia en contratación pública.', p=['Servicios ciudadanos sin interrupción', 'Procesos de contratación pública', 'Seguridad de la información'], s=['Data Center', 'Ciberseguridad', 'Redes']),
    dict(k='comercio', n='Comercio', m='Infraestructura que soporta picos de demanda y operación multisede.', p=['Operación multisede', 'Picos de demanda', 'Pagos y datos protegidos'], s=['Redes', 'Respaldo y continuidad', 'Ciberseguridad']),
    dict(k='educacion', n='Educación', m='Redes y plataformas para campus, aulas híbridas y gestión académica.', p=['Wi-Fi de campus', 'Aulas híbridas', 'Plataformas académicas disponibles'], s=['Redes', 'Virtualización', 'Respaldo y continuidad']),
]
TOOLS = [('inactividad', 'Costo de inactividad', 'Cuánto le cuesta una hora sin sistemas'),
         ('respaldo', 'Capacidad de respaldo', 'Almacenamiento y ventana de respaldo'),
         ('sla', 'Disponibilidad y SLA', 'Tiempo de inactividad permitido'),
         ('migracion', 'Tiempo de migración', 'Cuánto tarda mover sus datos'),
         ('continuidad', 'Nivel de continuidad', 'Qué protección necesita según RTO y RPO')]
TOOL_NAME = {t[0]: t[1] for t in TOOLS}

PAGES = [('index.html', 'Inicio', ''), ('soluciones.html', 'Soluciones', 'soluciones'), ('coreoncloud.html', 'CoreOnCloud', 'coreoncloud'),
         ('sectores.html', 'Sectores', 'sectores'), ('herramientas.html', 'Herramientas', 'herramientas'), ('nosotros.html', 'Nosotros', 'nosotros'),
         ('contacto.html', 'Contacto', 'contacto'), ('privacidad.html', 'Privacidad', 'privacidad')]

# --------------------------------------------------------------------------- shell
def lower_es(t):
    """Minúsculas que respetan siglas (IA, HCI, SLA, RTO, RPO, DRaaS, IaaS)."""
    keep = {'IA', 'HCI', 'SLA', 'RTO', 'RPO', 'DRaaS', 'IaaS', 'CoreOnCloud', 'Wi-Fi'}
    return ' '.join(w if w in keep else w.lower() for w in t.split(' '))

def icon(paths, cls=''):
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"%s>%s</svg>' % (' class="%s"' % cls if cls else '', paths)

def header(r, active):
    def a(href, label, key):
        cur = ' aria-current="page"' if key == active else ''
        return '<a href="%s%s"%s>%s</a>' % (r, href, cur, label)
    mega = ''.join('<a href="%ssoluciones/%s.html">%s<span>%s</span></a>' % (r, s['slug'], s['name'], s['short']) for s in SOLS)
    return '''  <header class="site">
    <nav class="nav wrap" aria-label="Navegación principal">
      <a class="wordmark" href="%(r)sindex.html" aria-label="Coresolutions, ir al inicio">%(logo)s</a>
      <div class="navlinks" id="navlinks">
        <div class="nav-item">%(sol)s<div class="mega">%(mega)s</div></div>
        %(coc)s
        %(sec)s
        %(her)s
        %(nos)s
      </div>
      <div class="nav-r">
        <button type="button" class="kbtn" data-cmdk aria-label="Buscar en el sitio (Ctrl K)">%(search)s<span>Buscar</span><kbd>⌘K</kbd></button>
        <a href="%(r)scontacto.html" class="btn">Hablar con un especialista %(arrow)s</a>
        <button class="menu-btn" id="menu" aria-controls="navlinks" aria-expanded="false" aria-label="Abrir menú"><span></span></button>
      </div>
    </nav>
    <div class="progress" id="progress" aria-hidden="true"></div>
  </header>
''' % dict(r=r, sol=a('soluciones.html', 'Soluciones', 'soluciones'), mega=mega, coc=a('coreoncloud.html', 'CoreOnCloud', 'coreoncloud'),
           sec=a('sectores.html', 'Sectores', 'sectores'), her=a('herramientas.html', 'Herramientas', 'herramientas'),
           nos=a('nosotros.html', 'Nosotros', 'nosotros'), search=SEARCH, arrow=ARROW, logo=LOGO % dict(r=r))

def footer(r):
    sols = ''.join('<a href="%ssoluciones/%s.html">%s</a>' % (r, s['slug'], s['name']) for s in SOLS)
    tools = ''.join('<a href="%sherramientas.html#%s">%s</a>' % (r, t[0], t[1]) for t in TOOLS)
    return '''  <footer>
    <div class="wrap">
      <div class="foot">
        <div>
          <a class="wordmark" href="%(r)sindex.html" aria-label="Coresolutions, ir al inicio">%(logo)s</a>
          <p>Respaldo, ciberseguridad e infraestructura para organizaciones en Ecuador.</p>
          <p class="made">Cuenca · Guayaquil</p>
        </div>
        <div><h3 class="fh">Soluciones</h3>%(sols)s</div>
        <div><h3 class="fh">Empresa</h3><a href="%(r)scoreoncloud.html">CoreOnCloud</a><a href="%(r)ssectores.html">Sectores</a><a href="%(r)snosotros.html">Nosotros</a><a href="%(r)scontacto.html">Contacto</a></div>
        <div><h3 class="fh">Calculadoras</h3>%(tools)s</div>
        <div><h3 class="fh">Contacto</h3><a href="mailto:info@coresolutions.com.ec">info@coresolutions.com.ec</a><a href="tel:+593994021631">+593 99 402 1631</a><p>Av. 3 de Noviembre 21-176 y Juan Pablo I, Cuenca</p></div>
      </div>
      <div class="bottom"><span>© <span id="year">2026</span> Coresolutions. Todos los derechos reservados.</span><span><a href="%(r)sprivacidad.html">Política de privacidad</a> · <button type="button" class="linklike" data-cmdk>Buscar en el sitio</button></span></div>
    </div>
  </footer>
''' % dict(r=r, sols=sols, tools=tools, logo=LOGO % dict(r=r))

CMDK = '''  <div class="cmdk" id="cmdk" hidden>
    <div class="cmdk-bg" data-cx></div>
    <div class="cmdk-panel" role="dialog" aria-modal="true" aria-label="Buscar en el sitio">
      <div class="cmdk-in">%s<input id="cmdk-q" type="text" placeholder="Busque una solución, sector o calculadora" autocomplete="off" role="combobox" aria-expanded="true" aria-controls="cmdk-list" aria-label="Buscar"><kbd>Esc</kbd></div>
      <ul id="cmdk-list" role="listbox" aria-label="Resultados"></ul>
      <div class="cmdk-f"><span><kbd>↑</kbd> <kbd>↓</kbd> navegar</span><span><kbd>↵</kbd> abrir</span><span><kbd>/</kbd> o <kbd>⌘K</kbd> buscar desde cualquier página</span></div>
    </div>
  </div>
''' % SEARCH

def mbar(r):
    return '''  <div class="mbar" id="mbar">
    <a href="%(r)sherramientas.html" class="btn btn-sec">Calculadoras</a>
    <a href="%(r)scontacto.html" class="btn">Hablar con un especialista</a>
  </div>
''' % dict(r=r)

def page(path, title, desc, body, active='', jsonld=None, drawer=False, canon=None):
    depth = path.count('/')
    r = '../' * depth
    canon = canon if canon is not None else '/' + path.replace('index.html', '').replace('.html', '')
    canon = canon.rstrip('/') if canon != '/' else '/'
    full_title = title if title.startswith('Coresolutions') else '%s · Coresolutions' % title
    ld = ''.join('\n  <script type="application/ld+json">%s</script>' % json.dumps(x, ensure_ascii=False) for x in (jsonld or []))
    out = '''<!doctype html>
<html lang="es-EC">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>%(t)s</title>
  <meta name="claude:viewport-fit-sides" content="cover">
  <meta name="description" content="%(d)s">
  <meta name="theme-color" content="#01095C">
  <link rel="canonical" href="%(site)s%(canon)s">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="es_EC">
  <meta property="og:site_name" content="Coresolutions">
  <meta property="og:title" content="%(t)s">
  <meta property="og:description" content="%(d)s">
  <meta property="og:url" content="%(site)s%(canon)s">
  <meta property="og:image" content="%(site)s/og.png">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="%(r)sfavicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="%(r)sicon-512.png">
  <link rel="manifest" href="%(r)ssite.webmanifest">
  <link rel="preload" href="%(r)sassets/fonts/ibmplexsans.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="%(r)sassets/fonts/ibmplexmono-500.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="%(r)sassets/css/fonts.css?v=%(v)s">
  <link rel="stylesheet" href="%(r)sassets/css/site.css?v=%(v)s">%(ld)s
</head>
<body data-root="%(r)s">
  <a class="skip" href="#main">Saltar al contenido</a>
%(header)s
  <main id="main">
%(body)s
  </main>
%(footer)s%(drawer)s%(cmdk)s%(mbar)s  <script src="%(r)sassets/js/data.js?v=%(v)s"></script>
  <script src="%(r)sassets/js/site.js?v=%(v)s"></script>
</body>
</html>
''' % dict(t=e(full_title), d=e(desc), site=SITE, canon=canon, r=r, v=VERSION, ld=ld, header=header(r, active), body=body.replace('{r}', r),
           footer=footer(r), drawer=part('drawer.html') if drawer else '', cmdk=CMDK, mbar=mbar(r))
    dest = os.path.join(ROOT, path)
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    with open(dest, 'w', encoding='utf-8') as f:
        f.write(out)
    return path

def crumbs(items):
    """items: list of (label, href or None). Returns HTML and BreadcrumbList JSON-LD."""
    parts, ld = [], []
    for i, (label, href) in enumerate(items):
        parts.append('<a href="%s">%s</a>' % (href, label) if href else '<span aria-current="page">%s</span>' % label)
        ld.append({'@type': 'ListItem', 'position': i + 1, 'name': label})
    htm = '<nav class="crumbs" aria-label="Ruta">' + ' <span aria-hidden="true">/</span> '.join(parts) + '</nav>'
    return htm, {'@context': 'https://schema.org', '@type': 'BreadcrumbList', 'itemListElement': ld}

def page_hero(crumb_html, h1, lede, cta='', vis=''):
    return '''    <section class="hero dark page-hero%(wv)s">
      <div class="mesh" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
      <div class="gridlines" aria-hidden="true"></div>
      <div class="wrap">
        %(c)s
        <h1>%(h)s</h1>
        <p class="lede">%(l)s</p>
        %(cta)s%(vis)s
      </div>
    </section>
''' % dict(wv=' with-vis' if vis else '', c=crumb_html, h=h1, l=lede, cta=cta, vis=vis)

def faq_html(faq, title='Preguntas frecuentes'):
    items = ''.join('<details><summary>%s</summary><div><p>%s</p></div></details>' % (q, a) for q, a in faq)
    ld = {'@context': 'https://schema.org', '@type': 'FAQPage', 'mainEntity': [
        {'@type': 'Question', 'name': q, 'acceptedAnswer': {'@type': 'Answer', 'text': a}} for q, a in faq]}
    return '''    <section class="band">
      <div class="wrap split">
        <div><span class="label">FAQ</span><h2 class="h2">%s</h2></div>
        <div class="faq">%s</div>
      </div>
    </section>
''' % (title, items), ld

def cta_band(h='Hablemos de su operación.', p='Una persona de nuestro equipo técnico revisará su caso y le escribirá.', msg=''):
    dm = ' data-msg="%s"' % e(msg) if msg else ''
    return '''    <section class="band dark cta-band dots">
      <div class="mesh" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
      <div class="wrap">
        <h2>%s</h2>
        <p>%s</p>
        <div class="cta"><a href="{r}contacto.html" class="btn wide magnet"%s>Hablar con un especialista</a><a href="{r}herramientas.html" class="btn btn-sec wide">Usar las calculadoras</a></div>
      </div>
    </section>
''' % (h, p, dm)

def sol_tiles(r, link_label='Ver solución'):
    pos = ['20% 25%', '75% 30%', '40% 75%', '80% 70%', '25% 60%', '60% 20%']
    out = []
    for i, s in enumerate(SOLS):
        gx, gy = pos[i].split()
        out.append('''          <article class="cell sol reveal">
            <div class="vis" style="--gx:%s;--gy:%s" aria-hidden="true">%s</div>
            <div class="body">
              <h3 style="view-transition-name:sol-%s">%s</h3>
              <p>%s</p>
              <a class="sol-link" href="%ssoluciones/%s.html">%s %s</a>
            </div>
          </article>''' % (gx, gy, icon(s['icon']), s['slug'], s['name'], s['lede'].split('. ')[0].rstrip('.') + '.', r, s['slug'], link_label, ARROW))
    return '        <div class="grid grid-3">\n' + '\n'.join(out) + '\n        </div>'

def sector_explorer(head=True):
    tabs = ''.join('<button type="button" class="sx-tab" role="tab" id="sx-%s" aria-controls="sx-panel" aria-selected="%s" tabindex="%s" data-k="%s"><span>%s</span>%s</button>' % (
        s['k'], 'true' if i == 0 else 'false', 0 if i == 0 else -1, s['k'], s['n'], ARROW) for i, s in enumerate(SECTORS))
    h = '''        <div class="head reveal">
          <div><span class="label">Sectores</span><h2 class="h2">¿Qué necesita su organización?</h2></div>
          <p>Cada sector tiene sus propias exigencias. Elija el suyo.</p>
        </div>
''' if head else ''
    return '''    <section class="band sectors" id="sectores">
      <div class="wrap">
%s        <div class="sx reveal">
          <div class="sx-list" role="tablist" aria-label="Sectores">%s</div>
          <div class="sx-panel dark" role="tabpanel" id="sx-panel" aria-labelledby="sx-coop">
            <div class="mesh" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
            <div class="sx-in" id="sx-in"><span class="label">%s</span><p class="sx-msg">%s</p></div>
          </div>
        </div>
      </div>
    </section>
''' % (h, tabs, SECTORS[0]['n'], SECTORS[0]['m'])

def cloud_geo():
    c = part('cloud.html')
    return re.search(r'        <div class="cloud-geo reveal">.*?\n        </div>\n', c, re.S).group(0)

def noc():
    c = part('cloud.html')
    return re.search(r'        <div class="noc reveal".*?\n        </div>\n(?=      </div>\n    </section>)', c, re.S).group(0)

def tools_grid():
    return '        <div class="tool-grid reveal" id="tool-grid"></div>\n'

ORG = {'@context': 'https://schema.org', '@type': 'Organization', 'name': 'Coresolutions', 'url': SITE, 'logo': SITE + '/icon-512.png',
       'email': 'info@coresolutions.com.ec', 'telephone': '+593994021631',
       'address': {'@type': 'PostalAddress', 'streetAddress': 'Av. 3 de Noviembre 21-176 y Juan Pablo I', 'addressLocality': 'Cuenca', 'addressCountry': 'EC'},
       'areaServed': 'EC'}

# --------------------------------------------------------------------------- pages
def build_home():
    """Home según el plan del equipo de referencia: austeridad, texto como imagen, la réplica como demostración."""
    r = ''
    SERV = [
        ('respaldo-y-continuidad', 'Respaldo y continuidad', 'Si pierde sus datos, los recupera. Y sabe de antemano en cuántas horas.', 'Backup gestionado, réplica entre sitios y recuperación ante desastres.'),
        ('ciberseguridad', 'Ciberseguridad', 'Que un ataque no detenga su operación ni exponga a sus clientes.', 'Firewall de nueva generación, protección de endpoints y acceso seguro.'),
        ('redes-y-conectividad', 'Redes y conectividad', 'Que todas sus sedes sigan conectadas, aunque un enlace falle.', 'LAN, Wi-Fi, switching, segmentación y enlaces redundantes.'),
        ('data-center', 'Data Center y sistemas', 'Servidores que no faltan cuando más carga hay.', 'Servidores, almacenamiento y alta disponibilidad.'),
        ('virtualizacion-hci', 'Virtualización y HCI', 'Menos equipos, menos fallas, menos factura.', 'Consolidación de cargas y plataformas hiperconvergentes.'),
        ('automatizacion-ia', 'Automatización e IA', 'Que las tareas repetitivas se hagan solas y sin errores.', 'Automatización de procesos e inteligencia artificial aplicada.'),
    ]
    SECT = [
        ('coop', 'Cooperativas', 'Que la SEPS pida evidencia de su plan de continuidad y tenga que improvisar.', 'La evidencia está lista antes de que la pidan.'),
        ('salud', 'Hospitales y clínicas', 'Que el sistema caiga con pacientes en urgencias y nadie vea una historia clínica.', 'Su información vuelve en minutos, no en días.'),
        ('industria', 'Industria', 'Que una línea se detenga por un ataque y cada hora cueste más que el contrato.', 'Sabe de antemano cuánto tarda en recuperar.'),
        ('publico', 'Sector público', 'Que un incidente termine en un informe de contraloría con su nombre.', 'Cada respaldo queda documentado y verificable.'),
        ('comercio', 'Comercio multisede', 'Que diez locales dejen de facturar a la vez un sábado.', 'Sus datos y su conectividad tienen respaldo en dos centros distintos.'),
        ('educacion', 'Universidades', 'Que en matrículas el sistema no responda y las quejas lleguen al rectorado.', 'La plataforma aguanta el pico y usted lo sabe desde antes.'),
    ]
    serv = ''.join('<li><a href="%ssoluciones/%s.html"><span class="mono r-n">%02d</span><span class="r-name">%s</span><span class="r-g">%s</span><span class="r-t">%s</span>%s</a></li>' % (r, sl, i + 1, n, g, t, ARROW) for i, (sl, n, g, t) in enumerate(SERV))
    sect = ''.join('<li><a href="%ssectores.html#%s"><span class="r-sname">%s</span><span class="r-fear">%s</span><span class="r-calm">%s</span></a></li>' % (r, k, n, f, c) for k, n, f, c in SECT)
    body = """    <!-- HERO -->
    <section class="dark r-hero" id="inicio">
      <div class="wrap r-hero-in">
        <p class="mono r-status" aria-live="off"><span>CUENCA</span> <span aria-hidden="true">&#8596;</span> <span>GUAYAQUIL</span> <span class="r-sep">&middot;</span> RÉPLICA ACTIVA <span class="r-sep">&middot;</span> <span id="r-clock">00:00:00</span></p>
        <h1 class="r-h1">Si mañana <span class="r-flash">se cae</span> su sistema, hoy ya sabe cuánto tarda en volver.</h1>
        <div class="r-hero-foot">
          <p class="r-lede">Respaldo, continuidad y ciberseguridad para empresas que no pueden parar. Desde Cuenca y Guayaquil, con sus datos en dos centros de datos en Ecuador, replicados entre sí.</p>
          <a href="%(r)scontacto.html" class="btn r-btn" id="hero-cta">Solicitar una evaluación de continuidad %(arrow)s</a>
        </div>
        <p class="mono r-proof">MÁS DE 20 AÑOS CON COOPERATIVAS REGULADAS POR LA SEPS, HOSPITALES, INDUSTRIAS Y ENTIDADES PÚBLICAS EN ECUADOR</p>
      </div>
      <div class="r-blackout" aria-hidden="true"></div>
    </section>
    <!-- LA RÉPLICA -->
    <section class="band r-rep" id="replica">
      <div class="wrap">
        <p class="mono r-tag">01 / DOS CIUDADES, UN SISTEMA</p>
        <div class="r-rep-grid">
          <div class="r-rep-copy">
            <h2 class="r-h2">Apáguelo. Sigue funcionando.</h2>
            <p class="r-p">Sus datos viven en dos lugares a la vez. Si el centro de datos de Cuenca deja de responder, el de Guayaquil ya tiene todo y sigue atendiendo a sus sucursales, su cajero o su quirófano.</p>
            <div class="r-rep-ctl">
              <button type="button" class="btn r-btn-navy" id="r-fail" aria-pressed="false">Simular falla en Cuenca</button>
              <button type="button" class="r-link" id="r-reset" hidden>Restablecer</button>
            </div>
            <p class="r-live" id="r-live" aria-live="polite">Los dos centros de datos operan. Cada copia viaja de Cuenca a Guayaquil.</p>
            <p class="mono r-count" aria-hidden="true"><span id="r-sec">0</span> s SIN INTERRUPCIÓN</p>
          </div>
          <div class="r-rep-vis" role="img" aria-label="Dos centros de datos, Cuenca y Guayaquil, unidos por un flujo de datos que alimenta una fila de sucursales. Si uno se apaga, el otro sigue alimentándolas."><canvas id="r-cv"></canvas><noscript><p class="r-p">Ilustración: dos centros de datos replicados; si uno falla, el otro sigue atendiendo.</p></noscript></div>
        </div>
      </div>
    </section>
    <!-- SERVICIOS -->
    <section class="band r-serv" id="servicios">
      <div class="wrap">
        <div class="r-head"><p class="mono r-tag">02 / LO QUE PROTEGEMOS</p><div class="r-toggle" role="group" aria-label="Lenguaje"><span class="mono">HABLAR COMO</span><button type="button" class="mono" data-lang="g" aria-pressed="true">GERENTE</button><button type="button" class="mono" data-lang="t" aria-pressed="false">TÉCNICO</button></div></div>
        <ul class="r-list" id="r-serv">%(serv)s</ul>
      </div>
    </section>
    <!-- CIFRAS -->
    <section class="band r-fig" id="cifras">
      <div class="wrap">
        <p class="mono r-tag">03 / EN NÚMEROS</p>
        <div class="r-figs">
          <div class="r-f"><b class="r-big" data-n="20">20</b><span class="mono">AÑOS<br>EN ECUADOR</span></div>
          <div class="r-f"><b class="r-big" data-n="2">2</b><span class="mono">CENTROS DE DATOS<br>REPLICADOS</span></div>
          <div class="r-f"><b class="r-big" data-n="6">6</b><span class="mono">SECTORES<br>REGULADOS Y CRÍTICOS</span></div>
        </div>
      </div>
    </section>
    <!-- SECTORES -->
    <section class="band r-sect" id="sectores">
      <div class="wrap">
        <p class="mono r-tag">04 / QUIÉN CONFÍA</p>
        <h2 class="r-h2">Lo que no puede permitirse que falle, según su sector.</h2>
        <ul class="r-slist">%(sect)s</ul>
      </div>
    </section>
    <!-- DIAGNÓSTICO -->
    <section class="dark r-diag" id="diagnostico">
      <div class="wrap r-diag-grid">
        <div>
          <p class="mono r-tag">05 / DIAGNÓSTICO SIN COMPROMISO</p>
          <h2 class="r-h2">Le decimos qué pasaría si mañana falla.</h2>
          <p class="r-p">Cuarenta y cinco minutos con un especialista y un informe por escrito de sus brechas de respaldo y recuperación. No necesita saber qué tecnología necesita; necesita contarnos qué no puede permitirse que falle.</p>
          <p class="mono r-proof">RESPUESTA EN 24 HORAS HÁBILES · UN RESPONSABLE, NO UN FORMULARIO AUTOMÁTICO</p>
        </div>
        <form class="r-form" id="form" novalidate>
          <div class="field"><label for="f-name">Nombre y apellido</label><input id="f-name" name="nombre" autocomplete="name" required></div>
          <div class="field"><label for="f-company">Empresa</label><input id="f-company" name="empresa" autocomplete="organization"></div>
          <div class="field"><label for="f-email">Correo corporativo</label><input id="f-email" name="correo" type="email" autocomplete="email" required></div>
          <div class="field"><label for="f-cargo">Cargo</label><select id="f-cargo" name="cargo"><option value="">Elija una opción</option><option>Gerencia general</option><option>Gerencia de TI</option><option>Gerencia financiera</option><option>Otro</option></select></div>
          <div class="hp" aria-hidden="true"><label for="f-web">Sitio web</label><input id="f-web" name="web" tabindex="-1" autocomplete="off"></div>
          <p class="err" id="err" hidden>Ingrese su nombre y un correo válido para continuar.</p>
          <button class="btn r-btn" type="submit" id="f-send">Quiero que me contacten %(arrow)s</button>
          <div class="notice" id="done" hidden role="status">Recibimos su solicitud. Le escribiremos a su correo en horario laboral.</div>
        </form>
      </div>
    </section>
""" % dict(r=r, arrow=ARROW, serv=serv, sect=sect)
    return page('index.html', 'Coresolutions · Si mañana se cae su sistema, hoy ya sabe cuánto tarda en volver.',
                'Respaldo, continuidad y ciberseguridad para empresas que no pueden parar. Dos centros de datos en Ecuador, replicados entre sí.',
                body, active='', jsonld=[ORG, {'@context': 'https://schema.org', '@type': 'WebSite', 'name': 'Coresolutions', 'url': SITE, 'inLanguage': 'es-EC'}])

def build_solutions_index():
    c, ld = crumbs([('Inicio', '{r}index.html'), ('Soluciones', None)])
    body = page_hero(c, 'Soluciones que protegen su operación.', 'Empezamos por lo más crítico, sus datos y su continuidad, y seguimos con la red y la infraestructura que los sostienen.',
                     '<div class="cta"><a href="{r}contacto.html" class="btn">Hablar con un especialista</a><a href="{r}herramientas.html#continuidad" class="btn btn-sec">¿Qué nivel de protección necesito?</a></div>')
    body += '''    <section class="band" id="soluciones">
      <div class="wrap">
%s
      </div>
    </section>
''' % sol_tiles('{r}')
    steps = [('Asesoría y diseño', 'Entendemos su operación y diseñamos la arquitectura adecuada.'), ('Implementación', 'Instalamos y migramos con un plan claro y ventanas acordadas.'),
             ('Capacitación', 'Su equipo aprende a operar la plataforma con autonomía.'), ('Soporte', 'Acompañamiento técnico y mejora continua.')]
    body += '''    <section class="band band-gray">
      <div class="wrap">
        <div class="head reveal"><div><span class="label">Cómo trabajamos</span><h2 class="h2">El mismo equipo, de principio a fin.</h2></div><p>Cada solución sigue el mismo camino, con entregables claros en cada etapa.</p></div>
        <ol class="steps-h reveal">%s</ol>
      </div>
    </section>
''' % ''.join('<li><span class="mono">ETAPA 0%d</span><b>%s</b><span>%s</span></li>' % (i + 1, a, b) for i, (a, b) in enumerate(steps))
    body += cta_band()
    ld_list = {'@context': 'https://schema.org', '@type': 'ItemList', 'itemListElement': [
        {'@type': 'ListItem', 'position': i + 1, 'url': '%s/soluciones/%s' % (SITE, s['slug']), 'name': s['name']} for i, s in enumerate(SOLS)]}
    return page('soluciones.html', 'Soluciones', 'Respaldo y continuidad, ciberseguridad, redes, data center, virtualización y automatización para organizaciones en Ecuador.',
                body, active='soluciones', jsonld=[ld, ld_list])

def build_solution(s):
    c, ld = crumbs([('Inicio', '{r}index.html'), ('Soluciones', '{r}soluciones.html'), (s['name'], None)])
    vis = '<div class="hero-vis scene" data-scene="%s" aria-hidden="true"><canvas></canvas></div>' % {'respaldo-y-continuidad': 'backup', 'ciberseguridad': 'security', 'redes-y-conectividad': 'network', 'data-center': 'datacenter', 'virtualizacion-hci': 'virt', 'automatizacion-ia': 'automation'}[s['slug']]
    cta = '<div class="cta"><a href="{r}contacto.html" class="btn" data-msg="Me interesa: %s." data-interest="%s">Hablar con un especialista</a>%s</div>' % (
        e(s['name']), e(s['interest']),
        ('<a href="{r}herramientas.html#%s" class="btn btn-sec">%s</a>' % (s['tools'][0], 'Calcular: ' + lower_es(TOOL_NAME[s['tools'][0]]))) if s['tools'] else '')
    body = page_hero(c, '<span style="view-transition-name:sol-%s">%s</span>' % (s['slug'], s['name']), s['lede'], cta, vis)
    body += '''    <section class="band">
      <div class="wrap">
        <div class="head reveal"><div><span class="label">El problema</span><h2 class="h2">Lo que suele frenar a las organizaciones.</h2></div></div>
        <div class="pains">%s</div>
      </div>
    </section>
''' % ''.join('<div class="pain reveal"><span class="mono">0%d</span><h3>%s</h3><p>%s</p></div>' % (i + 1, a, b) for i, (a, b) in enumerate(s['pains']))
    body += '''    <section class="band band-gray">
      <div class="wrap split">
        <div class="reveal"><span class="label">Qué incluye</span><h2 class="h2">Una solución completa, no piezas sueltas.</h2><p class="lede" style="margin-top:var(--s5)">Lo adaptamos a su operación: puede empezar por una parte y crecer.</p></div>
        <ul class="checks-l reveal">%s</ul>
      </div>
    </section>
''' % ''.join('<li><div><b>%s</b><span>%s</span></div></li>' % (a, b) for a, b in s['incl'])
    body += '''    <section class="band">
      <div class="wrap">
        <div class="head reveal"><div><span class="label">Cómo lo hacemos</span><h2 class="h2">Cuatro etapas, un mismo equipo.</h2></div></div>
        <ol class="steps-h reveal">%s</ol>
      </div>
    </section>
''' % ''.join('<li><span class="mono">ETAPA 0%d</span><b>%s</b><span>%s</span></li>' % (i + 1, a, b) for i, (a, b) in enumerate(s['steps']))
    fh, fld = faq_html(s['faq'])
    body += fh
    rel = [x for x in SOLS if x['slug'] != s['slug']][:3]
    cards = ''.join('<a class="rcard" href="{r}soluciones/%s.html"><span class="mono">Solución</span><b>%s</b><span>%s</span></a>' % (x['slug'], x['name'], x['short']) for x in rel)
    cards = ''.join('<a class="rcard" href="{r}herramientas.html#%s"><span class="mono">Calculadora</span><b>%s</b><span>Abrir la calculadora</span></a>' % (t, TOOL_NAME[t]) for t in s['tools'][:1]) + cards
    body += '''    <section class="band band-gray">
      <div class="wrap">
        <div class="head reveal"><div><span class="label">Siga explorando</span><h2 class="h2">Relacionado</h2></div></div>
        <div class="related reveal">%s</div>
      </div>
    </section>
''' % cards
    body += cta_band('¿Hablamos de %s?' % lower_es(s['name']) if s['slug'] != 'data-center' else '¿Hablamos de su data center?',
                     'Cuéntenos su situación actual. Le proponemos un camino concreto, con alcance y plazos claros.', 'Me interesa: %s.' % s['name'])
    service = {'@context': 'https://schema.org', '@type': 'Service', 'name': s['name'], 'description': s['lede'], 'provider': {'@type': 'Organization', 'name': 'Coresolutions', 'url': SITE}, 'areaServed': 'EC'}
    return page('soluciones/%s.html' % s['slug'], s['name'], s['lede'], body, active='soluciones', jsonld=[ld, service, fld])

def build_coreoncloud():
    c, ld = crumbs([('Inicio', '{r}index.html'), ('CoreOnCloud', None)])
    vis = '<div class="hero-vis scene" data-scene="cloud" aria-hidden="true"><canvas></canvas></div>'
    body = page_hero(c, 'Su infraestructura. Nuestra responsabilidad.', 'CoreOnCloud es nuestra nube en Ecuador: infraestructura como servicio, respaldo y recuperación ante desastres, operada por el mismo equipo que conoce su operación.',
                     '<div class="cta"><a href="{r}contacto.html" class="btn" data-msg="Me interesa CoreOnCloud." data-interest="CoreOnCloud">Solicitar información</a><a href="{r}herramientas.html#continuidad" class="btn btn-sec">¿Qué nivel de continuidad necesito?</a></div>', vis)
    body += '''    <section class="band dark" id="cloud">
      <div class="mesh" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
      <div class="wrap">
        <div class="head reveal"><div><span class="label">Dos sitios</span><h2 class="h2">Cuenca y Guayaquil, replicados.</h2></div><p>Dos centros de datos en Ecuador conectados entre sí, para que una falla en un sitio no detenga su operación.</p></div>
%s      </div>
    </section>
''' % cloud_geo()
    services = [('Infraestructura como servicio (IaaS)', 'Servidores virtuales, almacenamiento y red listos para usar, con capacidad que crece con su demanda y pago por uso.'),
                ('Recuperación ante desastres (DRaaS)', 'Sus servidores críticos replicados en CoreOnCloud y listos para funcionar si su sitio principal falla.'),
                ('Respaldo gestionado', 'Copias automáticas fuera de su sitio, con retención definida y pruebas de restauración.'),
                ('Operación cercana', 'Un equipo técnico en Cuenca y Guayaquil que conoce su infraestructura y atiende en su idioma y su horario.')]
    body += '''    <section class="band">
      <div class="wrap split">
        <div class="reveal"><span class="label">Servicios</span><h2 class="h2">Lo que puede llevar a CoreOnCloud.</h2><p class="lede" style="margin-top:var(--s5)">Empiece por un servicio y sume los demás cuando lo necesite.</p></div>
        <ul class="checks-l reveal">%s</ul>
      </div>
    </section>
''' % ''.join('<li><div><b>%s</b><span>%s</span></div></li>' % (a, b) for a, b in services)
    body += '''    <section class="band dark">
      <div class="mesh" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
      <div class="wrap">
        <div class="head reveal"><div><span class="label">Operación</span><h2 class="h2">Así se ve la plataforma desde nuestra consola.</h2></div><p>Una vista de demostración de lo que monitoreamos a diario: disponibilidad, latencia entre sitios, réplica y respaldos.</p></div>
%s      </div>
    </section>
''' % noc()
    faq = [('¿En qué se diferencia CoreOnCloud de una nube pública internacional?', 'CoreOnCloud opera con recursos propios en Ecuador y con un equipo técnico local que conoce su operación. Muchas organizaciones lo combinan con otros servicios en la nube.'),
           ('¿Puedo llevar solo mis respaldos?', 'Sí. Puede empezar con respaldo gestionado o DRaaS y mantener su producción en su propio sitio.'),
           ('¿Cómo se cobra?', 'Con un modelo de consumo predecible, según los recursos que utilice. Le preparamos una propuesta con base en su escenario.')]
    fh, fld = faq_html(faq)
    body += fh + cta_band('Lleve su operación a CoreOnCloud.', 'Le ayudamos a definir qué migrar primero y cómo hacerlo sin interrupciones.', 'Me interesa CoreOnCloud.')
    return page('coreoncloud.html', 'CoreOnCloud', 'Nube propia en Ecuador: infraestructura como servicio, respaldo y recuperación ante desastres, con centros de datos en Cuenca y Guayaquil.',
                body, active='coreoncloud', jsonld=[ld, fld])

def build_sectores():
    c, ld = crumbs([('Inicio', '{r}index.html'), ('Sectores', None)])
    body = page_hero(c, 'Cada sector tiene sus propias exigencias.', 'Conocemos las prioridades operativas y regulatorias de las organizaciones a las que acompañamos. Elija su sector y vea por dónde empezar.')
    body += sector_explorer(head=False)
    body += '''    <section class="band band-gray">
      <div class="wrap split">
        <div class="reveal"><span class="label">¿No ve su sector?</span><h2 class="h2">Las necesidades de fondo son las mismas.</h2></div>
        <div class="prose reveal"><p>Toda organización necesita que su información esté protegida y que sus sistemas estén disponibles cuando sus personas los necesitan. Cuéntenos cómo opera y le proponemos un camino a la medida.</p><p><a href="{r}contacto.html" data-msg="Mi sector es: ">Escríbanos sobre su sector →</a></p></div>
      </div>
    </section>
'''
    body += cta_band()
    return page('sectores.html', 'Sectores', 'Soluciones de respaldo, ciberseguridad e infraestructura para cooperativas, salud, industria, sector público, comercio y educación en Ecuador.',
                body, active='sectores', jsonld=[ld])

def build_herramientas():
    c, ld = crumbs([('Inicio', '{r}index.html'), ('Herramientas', None)])
    body = page_hero(c, 'Dimensione su escenario.', 'Cinco calculadoras de referencia para estimar costos de inactividad, capacidad de respaldo, niveles de servicio y tiempos de migración. Elija una y ajuste sus datos.')
    body += '''    <section class="band tools band-gray" id="herramientas">
      <div class="wrap">
%s      </div>
    </section>
''' % tools_grid()
    faq = [('¿Qué tan exactos son los resultados?', 'Son estimaciones orientativas, útiles para dimensionar y comparar escenarios. Para una propuesta formal medimos su entorno real.'),
           ('¿Qué supuestos utilizan?', 'Por ejemplo, el tiempo de transferencia considera la eficiencia real del enlace (70% por defecto en respaldo, ajustable en migración) y el costo anual de inactividad considera solo las interrupciones dentro de su horario de operación.'),
           ('¿Guardan los datos que ingreso?', 'No. Los cálculos se hacen en su navegador y no se envían a ningún servidor. Solo si usted decide escribirnos, el resultado se incluye en su mensaje.')]
    fh, fld = faq_html(faq)
    body += fh + cta_band('¿Necesita un cálculo a medida?', 'Un especialista puede dimensionar su caso con datos reales de su operación.', 'Me interesa un cálculo a medida.')
    return page('herramientas.html', 'Herramientas', 'Calculadoras gratuitas: costo de inactividad, capacidad de respaldo, disponibilidad y SLA, tiempo de migración y nivel de continuidad.',
                body, active='herramientas', jsonld=[ld, fld], drawer=True)

def build_nosotros():
    c, ld = crumbs([('Inicio', '{r}index.html'), ('Nosotros', None)])
    body = page_hero(c, 'Un socio técnico, no un proveedor más.', 'Desde Cuenca acompañamos a organizaciones ecuatorianas en el diseño, la implementación y el soporte de su infraestructura tecnológica, hace más de 20 años.')
    body += part('personas.html')
    body += part('proceso.html')
    body += '''    <section class="band band-gray">
      <div class="wrap">
        <div class="head reveal"><div><span class="label">Dónde estamos</span><h2 class="h2">Cerca de su operación.</h2></div></div>
        <div class="related reveal" style="grid-template-columns:repeat(2,minmax(0,1fr))">
          <div class="rcard"><span class="mono">CUE</span><b>Cuenca</b><span>Av. 3 de Noviembre 21-176 y Juan Pablo I. Oficina principal y centro de datos CoreOnCloud.</span></div>
          <div class="rcard"><span class="mono">GYE</span><b>Guayaquil</b><span>Centro de datos CoreOnCloud y atención a la región Costa.</span></div>
        </div>
      </div>
    </section>
'''
    body += cta_band('Conversemos.', 'Le contamos cómo trabajamos y cómo podemos acompañar a su organización.')
    return page('nosotros.html', 'Nosotros', 'Coresolutions acompaña a organizaciones ecuatorianas en el diseño, implementación y soporte de su infraestructura desde hace más de 20 años.',
                body, active='nosotros', jsonld=[ld, ORG])

def build_contacto():
    c, ld = crumbs([('Inicio', '{r}index.html'), ('Contacto', None)])
    con = part('contacto.html').replace('<section class="band contact dark" id="contacto">', '<section class="band contact dark first-pad" id="contacto">')
    con = con.replace('<div class="wrap contact-grid">\n        <div class="reveal">', '<div class="wrap contact-grid">\n        <div>\n          %s' % c)
    con = con.replace('<h2 class="h2">Hablemos de su operación.</h2>', '<h1 class="h2 contact-h1">Hablemos de su operación.</h1>')
    con = con.replace('<span class="label">Contacto</span>\n', '', 1)
    faq = [('¿Cuánto cuesta una evaluación?', 'La primera conversación no tiene costo. En ella entendemos su situación y le proponemos los siguientes pasos.'),
           ('¿Atienden fuera de Cuenca y Guayaquil?', 'Sí. Acompañamos a organizaciones en todo el país, de forma presencial o remota según el proyecto.'),
           ('¿Qué información conviene tener a mano?', 'Una idea general de su infraestructura actual, qué le preocupa y en qué plazo le gustaría resolverlo. No necesita tenerlo todo documentado.')]
    fh, fld = faq_html(faq)
    body = con + fh
    return page('contacto.html', 'Contacto', 'Hable con un especialista de Coresolutions. Escríbanos a info@coresolutions.com.ec o llame al +593 99 402 1631.',
                body, active='contacto', jsonld=[ld, fld])

def build_privacidad():
    c, ld = crumbs([('Inicio', '{r}index.html'), ('Política de privacidad', None)])
    body = page_hero(c, 'Política de privacidad', 'Cómo tratamos la información que usted comparte con nosotros a través de este sitio.')
    body += '''    <section class="band">
      <div class="wrap">
        <div class="prose">
          <p class="note">Documento en revisión legal. Última actualización: octubre de 2026.</p>
          <h2>Responsable del tratamiento</h2>
          <p>Coresolutions, con domicilio en Av. 3 de Noviembre 21-176 y Juan Pablo I, Cuenca, Ecuador. Contacto: <a href="mailto:info@coresolutions.com.ec">info@coresolutions.com.ec</a>.</p>
          <h2>Qué datos tratamos</h2>
          <p>Este sitio no utiliza cookies de seguimiento ni herramientas de analítica. El formulario de contacto envía los datos que usted escribe (nombre, empresa, correo, áreas de interés y descripción) a nuestro correo info@coresolutions.com.ec a través de un servicio de envío de correo; no se almacenan en ninguna base de datos del sitio. Si el envío no está disponible, el formulario prepara el mensaje en su aplicación de correo, que usted decide enviar. Usamos esos datos únicamente para responder a su solicitud.</p>
          <p>Las calculadoras funcionan en su navegador; los valores que ingresa no se almacenan ni se envían, salvo que usted los incluya en un mensaje.</p>
          <h2>Para qué los usamos</h2>
          <ul><li>Responder a su consulta y preparar una propuesta.</li><li>Dar seguimiento a la relación comercial que usted solicite.</li></ul>
          <h2>Base legal</h2>
          <p>Tratamos sus datos con base en su consentimiento al escribirnos y, cuando corresponda, en la ejecución de medidas precontractuales o contractuales, conforme a la Ley Orgánica de Protección de Datos Personales del Ecuador.</p>
          <h2>Conservación</h2>
          <p>Conservamos sus datos mientras sean necesarios para atender su solicitud y cumplir obligaciones legales.</p>
          <h2>Sus derechos</h2>
          <p>Puede ejercer sus derechos de acceso, rectificación y actualización, eliminación, oposición, portabilidad y suspensión del tratamiento escribiendo a <a href="mailto:info@coresolutions.com.ec">info@coresolutions.com.ec</a>. Responderemos dentro de los plazos que establece la ley.</p>
          <h2>Cambios</h2>
          <p>Publicaremos en esta página cualquier cambio a esta política.</p>
        </div>
      </div>
    </section>
'''
    return page('privacidad.html', 'Política de privacidad', 'Política de privacidad de Coresolutions conforme a la Ley Orgánica de Protección de Datos Personales del Ecuador.',
                body, active='', jsonld=[ld])

def build_404():
    body = '''    <section class="hero dark nf">
      <div class="mesh" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
      <div class="gridlines" aria-hidden="true"></div>
      <div class="wrap" style="display:grid;gap:var(--s6);justify-items:start">
        <span class="label">Error 404</span>
        <p class="code">4<em>0</em>4</p>
        <h1 class="h2">Esta página no existe. Su operación, sí.</h1>
        <p class="lede">Puede que el enlace haya cambiado. Busque lo que necesita o vuelva al inicio.</p>
        <div class="cta"><a href="/index.html" class="btn">Volver al inicio</a><button type="button" class="btn btn-sec" data-cmdk>Buscar en el sitio</button></div>
      </div>
    </section>
'''
    return page('404.html', 'Página no encontrada', 'La página que busca no existe.', body.replace('/index.html', '{r}index.html'), canon='/404')

def build_data():
    idx = []
    for path, name, key in PAGES:
        idx.append({'g': 'Páginas', 't': name, 'u': path, 'k': key})
    for s in SOLS:
        idx.append({'g': 'Soluciones', 't': s['name'], 'd': s['short'], 'u': 'soluciones/%s.html' % s['slug'],
                    'k': ' '.join(a for a, b in s['incl'])})
    for t in TOOLS:
        idx.append({'g': 'Calculadoras', 't': t[1], 'd': t[2], 'u': 'herramientas.html#' + t[0]})
    for s in SECTORS:
        idx.append({'g': 'Sectores', 't': s['n'], 'd': s['m'], 'u': 'sectores.html#' + s['k'], 'k': ' '.join(s['p'])})
    idx.append({'g': 'Acciones', 't': 'Hablar con un especialista', 'd': 'Escríbanos su caso', 'u': 'contacto.html', 'k': 'contacto cotizar evaluación'})
    sim = {'general': ['SU ORGANIZACIÓN', 'Operaciones por minuto', 'Usuarios conectados', 1248, 312], 'coop': ['SU COOPERATIVA', 'Transacciones de socios por minuto', 'Socios atendidos ahora', 1248, 312], 'salud': ['SU HOSPITAL', 'Historias clínicas consultadas por minuto', 'Pacientes en atención', 420, 186], 'industria': ['SU PLANTA', 'Órdenes de producción por hora', 'Equipos de planta conectados', 96, 240], 'publico': ['SU INSTITUCIÓN', 'Trámites ciudadanos por minuto', 'Ciudadanos atendidos ahora', 530, 410], 'comercio': ['SU EMPRESA', 'Ventas por minuto', 'Puntos de venta activos', 860, 64], 'educacion': ['SU CAMPUS', 'Sesiones de aula por minuto', 'Estudiantes conectados', 1120, 2300]}
    js = '/* Generado por tools/build.py. No editar a mano. */\nwindow.__SECTORS=%s;\nwindow.__SIM=%s;\nwindow.__INDEX=%s;\n' % (
        json.dumps(SECTORS, ensure_ascii=False), json.dumps(sim, ensure_ascii=False), json.dumps(idx, ensure_ascii=False))
    with open(os.path.join(ROOT, 'assets', 'js', 'data.js'), 'w', encoding='utf-8') as f:
        f.write(js)

def build_seo(paths):
    urls = []
    for p in paths:
        if p == '404.html':
            continue
        loc = '/' + p.replace('index.html', '').replace('.html', '')
        urls.append('  <url><loc>%s%s</loc><lastmod>2026-10-20</lastmod></url>' % (SITE, loc.rstrip('/') if loc != '/' else '/'))
    with open(os.path.join(ROOT, 'sitemap.xml'), 'w', encoding='utf-8') as f:
        f.write('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n%s\n</urlset>\n' % '\n'.join(urls))
    with open(os.path.join(ROOT, 'robots.txt'), 'w', encoding='utf-8') as f:
        f.write('User-agent: *\nAllow: /\nDisallow: /v1/\n\nSitemap: %s/sitemap.xml\n' % SITE)

if __name__ == '__main__':
    out = [build_home(), build_solutions_index()] + [build_solution(s) for s in SOLS] + [
        build_coreoncloud(), build_sectores(), build_herramientas(), build_nosotros(), build_contacto(), build_privacidad(), build_404()]
    build_data()
    build_seo(out)
    print('\n'.join(out))
