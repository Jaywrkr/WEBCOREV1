# Coresolutions — sitio web

Sitio estático, sin dependencias de ejecución, listo para Vercel.

## Estructura

| Ruta | Contenido |
| --- | --- |
| `/` | Inicio: titular a gran escala y simulador de conmutación por sector (el interruptor), niveles de continuidad, cinco capas (reaccionan al interruptor), sectores, personas |
| `/soluciones` y `/soluciones/<slug>` | Índice y seis páginas de solución, cada una con una escena animada propia en el hero (problema, qué incluye, etapas, FAQ, relacionados) |
| `/coreoncloud` | Nube propia: mapa CUE/GYE, servicios, consola de demostración, FAQ |
| `/sectores` | Explorador por sector (enlazable: `/sectores#salud`) |
| `/herramientas` | Cinco calculadoras (enlazables: `/herramientas#inactividad`) |
| `/nosotros`, `/contacto`, `/privacidad`, `404` | Empresa, formulario, política de privacidad, error |

Extras en todas las páginas: búsqueda rápida (`⌘K`, `Ctrl K` o `/`), menú de soluciones, barra de acciones en móvil, transiciones entre páginas, datos estructurados (Organization, Service, FAQPage, BreadcrumbList), `sitemap.xml`, `robots.txt`, manifest, imagen para redes (`og.png`).

`v1/` conserva la versión anterior de una sola página (excluida de buscadores).

## Cómo editar

- **Contenido y páginas:** `tools/build.py` (soluciones, sectores, FAQ, textos) y `tools/partials/` (secciones reutilizadas).
- **Fuentes:** autoalojadas en `assets/fonts/` (IBM Plex, latín) con `assets/css/fonts.css`.
- **Estilos:** `assets/css/site.css` (guía de marca 2026: navy `#01095C`, IBM Plex, 8px, esquinas rectas).
- **Comportamiento:** `assets/js/site.js` (cada módulo se activa solo si su sección existe).

Después de editar, regenere las páginas:

```
python3 tools/build.py
```

Vista previa local: `python3 -m http.server 8000` y abrir `http://localhost:8000`.

## Despliegue en Vercel

1. En Vercel, **Add New → Project**, importar `Jaywrkr/WEBCOREV1` desde GitHub.
2. Framework **Other**, sin comando de build, directorio de salida vacío (raíz). `.vercelignore` excluye `v1/`, `tools/` y el README del despliegue.
3. `vercel.json` ya configura: URLs limpias (`/soluciones/ciberseguridad` sin `.html`), redirección de `www` al dominio principal, caché de un año para fuentes, y cabeceras de seguridad (HSTS, CSP, nosniff, referrer, permisos). La página `404.html` se sirve sola para rutas inexistentes.
4. **Dominio:** en el proyecto, **Settings → Domains**, añadir `coresolutions.com.ec` y `www.coresolutions.com.ec`. En el DNS del dominio:
   - `coresolutions.com.ec` → registro **A** a `76.76.21.21`
   - `www` → registro **CNAME** a `cname.vercel-dns.com`

   Vercel emite el certificado TLS automáticamente. Si el dominio hoy apunta a la web anterior, cambiar el DNS solo cuando se decida publicar; hasta entonces se puede revisar en la URL `*.vercel.app` del proyecto.
5. Antes de cambiar el DNS: confirmar que `https://coresolutions.com.ec/sitemap.xml` y `/robots.txt` responden, y enviar el sitemap en Google Search Console.

## Pendientes antes de publicar en producción

- Validar las cifras (20+ años, 350+ implementaciones, 1,700+ casos, 11,000+ horas) contra el sistema interno.
- Revisar con el equipo los textos de soluciones, sectores y FAQ.
- Revisión legal de `/privacidad` (marcada como “en revisión”).
- Reemplazar los datos de demostración de la consola CoreOnCloud por métricas reales o mantener la etiqueta.
- Confirmar logotipo final y, si se desea analítica, elegir una herramienta y actualizar la política de privacidad y la CSP de `vercel.json`.
- Probar en Safari real (macOS/iOS): las pruebas automáticas se hicieron en Chromium; las transiciones entre páginas y `100svh` tienen respaldo para navegadores sin soporte.
