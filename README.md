# Coresolutions — Web corporativa 2026
Next.js App Router · TypeScript · Tailwind v4 · Framer Motion · Lucide · IBM Plex

## Desarrollo local
```bash
npm install
cp .env.example .env.local
npm run dev
```
Abrir http://localhost:3000. Para verificar: `npm run typecheck`, `npm run build`.

## Contenido editable
- `content/site.ts`: portada, indicadores, sectores, partners, proceso y caso de éxito.
- `content/services.ts`: las seis fichas de servicio y URLs.
- `styles/tokens.css`: tokens CSS globales; `app/globals.css`: reglas de UI.
- `app/design-system/page.tsx`: catálogo visual.

## Estructura
`app/`: rutas de Home, Nosotros, Contacto, Servicios dinámicos y Design System; `components/`: Header, Footer, Mesh, formulario y piezas UI; `app/api/contact/`: proxy server-side a endpoint configurable.

## Formulario
Defina `CONTACT_ENDPOINT` en Vercel para apuntar a un receptor HTTPS de formularios. Sin esa variable, la API responde 503 y NO simula envíos. Agregue medidas de spam, limitación de tasa y consentimiento de datos antes de publicar.

## Marca
El placeholder tipográfico CORESOLUTIONS se utiliza hasta recibir los archivos oficiales `public/logo-navy.svg` y `public/logo-white.svg`. No se han generado logos no autorizados.
La disponibilidad 99.97% aparece **solo** como indicador ilustrativo en el panel de monitoreo; cualquier afirmación contractual debe validarse antes de producción.
No se han inventado cifras corporativas ni casos de éxito. Los datos pendientes aparecen como `{{PLACEHOLDER}}`.
Los nombres de partners se presentan como texto, no como logotipos de marca.

## Publicación en Vercel
Importe el repositorio, seleccione Next.js, configure `NEXT_PUBLIC_SITE_URL` y `CONTACT_ENDPOINT`, despliegue primero a Preview y verifique el entorno. No conecte el dominio principal hasta aprobar contenidos, datos y documentos de privacidad.

## Pendientes de QA
- Confirmar métricas oficiales, domicilio principal (Quito o Cuenca), contactos, socios y certificaciones.
- Validar contraste AA con auditoría automatizada, Lighthouse >=90, mobile 375px sin desbordamientos.
- Verificar previews en navegador, navegación por teclado y responsive.
- Implementar rate limiting y protección anti-spam del formulario.
- Añadir logos oficiales y Open Graph visual autorizado.


## Edición 03: Immersive systems (rama de trabajo)
- `app/page.tsx`: portada editorial con narrativa de infraestructura y jerarquía comercial.
- `components/network-map.tsx`: diagrama SVG interactivo ligero, animado con Motion/GSAP, accesible y con alternativa sin movimiento.
- `components/section-indicator.tsx`: marcador de secciones con IntersectionObserver.
- `components/number-plate.tsx`: cifras con placeholders, sin métricas ficticias.
- `styles/immersive-v3.css`: layout, responsive, panel y capítulos del Home.
- El scroll nativo se mantiene; no se añade Lenis ni Three.js para evitar complejidad y peso sin retorno claro.
- Revisión manual de reglas: esquinas rectas, componentes con fondo plano, azul saturado reservado a enlaces/foco, interacciones sin rebotes. El fondo hero y CTA conserva el mesh permitido.

**Verificaciones aún necesarias antes de merge:** ejecutar `npm install && npm run build && npm run typecheck`; Lighthouse móvil >= 90, contraste AA y comprobación de desbordamiento a 375px. Desde el entorno de edición de GitHub no se ejecutaron estas pruebas. El mapa representa una topología conceptual, no monitoreo en tiempo real.

## Kinetic V4
La portada integra Three.js/React Three Fiber (escena 3D conceptual), GSAP ScrollTrigger (metodología y entrada editorial) y Motion (transiciones del selector de capacidades). Se carga el WebGL mediante importación dinámica; el Canvas limita DPR a 1.5 y usa antialias desactivado. Se respeta reduced-motion. La escena no muestra métricas reales.

Validaciones obligatorias antes de merge: `npm install`, `npm run build`, `npm run typecheck`, Lighthouse móvil >=90, navegación teclado, contraste AA y scroll horizontal a 375px. No se ejecutaron pruebas locales de compilación por indisponibilidad de conexión a GitHub desde el entorno de verificación.
