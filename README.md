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
