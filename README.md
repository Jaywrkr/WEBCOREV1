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

## Despliegue

Vercel con framework **Other**, sin comando de build y con el directorio raíz como salida. `vercel.json` activa URLs limpias y cabeceras de seguridad.

## Pendientes antes de publicar en producción

- Validar las cifras (20+ años, 350+ implementaciones, 1,700+ casos, 11,000+ horas) contra el sistema interno.
- Revisar con el equipo los textos de soluciones, sectores y FAQ.
- Revisión legal de `/privacidad` (marcada como “en revisión”).
- Reemplazar los datos de demostración de la consola CoreOnCloud por métricas reales o mantener la etiqueta.
- Confirmar logotipo final, dominio y, si se desea, analítica (requiere actualizar la política de privacidad).
