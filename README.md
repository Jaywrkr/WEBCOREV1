# Coresolutions — Web corporativa V1

Nueva web institucional de Coresolutions, desarrollada como landing estática, responsive y sin dependencias de compilación.

## Vista previa local

Abrir `index.html` en el navegador o ejecutar `python -m http.server 8000` desde la raíz del repositorio y visitar `http://localhost:8000`.

## Despliegue

En Vercel, importar el repositorio `Jaywrkr/WEBCOREV1`, seleccionar **Other** como framework y dejar el directorio de salida vacío. El proyecto sirve `index.html` desde la raíz.

## Identidad visual

Aplica la Guía de marca Coresolutions 2026 v1.0: navy `#01095C`, grises fríos, IBM Plex Sans/Mono, sistema de 8px, contenedor de 1280px, esquinas rectas, divisores de 1px, voz formal (usted). Excepción aprobada: gradientes mesh en bandas navy y en Herramientas.

## Secciones

Inicio (mapa de Ecuador animado con los centros de datos CUE y GYE), Soluciones, CoreOnCloud (consola de operaciones con datos de demostración), Cifras, Industrias, Cómo trabajamos (proceso guiado por scroll con entregables), Herramientas (cuadrícula de calculadoras que se abren en un panel lateral, o en una hoja inferior en móvil: costo de inactividad, capacidad de respaldo, disponibilidad y SLA, tiempo de migración, nivel de continuidad) y Contacto (formulario que prepara un correo a info@coresolutions.com.ec).

Todo vive en `index.html`: sin dependencias ni compilación, respeta `prefers-reduced-motion` y es responsive hasta 360px.

## Pendientes antes de publicar en producción

- Confirmar el logotipo final (hoy es el wordmark CORESOLUTIONS en IBM Plex Sans Condensed, según la guía de marca 2026).
- Reemplazar los datos de demostración de la consola CoreOnCloud por métricas reales (o mantener la etiqueta "Datos de demostración").
- Revisar textos, cifras, nombres comerciales y socios tecnológicos.
- Agregar política de privacidad, formularios y analítica únicamente con las integraciones aprobadas.
- Añadir páginas detalladas por solución, SEO enriquecido y casos de éxito autorizados.
- Validar responsive, accesibilidad, metadatos, rendimiento y configuración de dominio.

La web existente en `coresolutions.com.ec` no fue modificada.
