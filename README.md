# Coresolutions — Web corporativa V1

Nueva web institucional de Coresolutions, desarrollada como landing estática, responsive y sin dependencias de compilación.

## Vista previa local

Abrir `index.html` en el navegador o ejecutar `python -m http.server 8000` desde la raíz del repositorio y visitar `http://localhost:8000`.

## Despliegue

En Vercel, importar el repositorio `Jaywrkr/WEBCOREV1`, seleccionar **Other** como framework y dejar el directorio de salida vacío. El proyecto sirve `index.html` desde la raíz.

## Identidad visual

Aplica la Guía de marca Coresolutions 2026 v1.0: navy `#01095C`, grises fríos, IBM Plex Sans/Mono, sistema de 8px, contenedor de 1280px, esquinas rectas, divisores de 1px, voz formal (usted). Excepción aprobada: gradientes mesh en bandas navy y en Herramientas.

## Secciones

Inicio mínimo ("Su operación no se detiene" y un solo botón), Personas (compromisos y cifras en lenguaje humano), Su sector (selector con mensaje por sector), Soluciones (ordenadas por prioridad comercial), CoreOnCloud (mapa de Ecuador con CUE y GYE y consola con datos de demostración), Industrias, Cómo trabajamos, Herramientas (calculadoras en cuadrícula con panel lateral) y Contacto.

Todo vive en `index.html`: sin dependencias ni compilación, respeta `prefers-reduced-motion` y es responsive hasta 360px.

## Pendientes antes de publicar en producción

- Confirmar el logotipo final (hoy es el wordmark CORESOLUTIONS en IBM Plex Sans Condensed, según la guía de marca 2026).
- Reemplazar los datos de demostración de la consola CoreOnCloud por métricas reales (o mantener la etiqueta "Datos de demostración").
- Validar las cifras de la portada (350+ implementaciones, 1,700+ casos de soporte, 11,000+ horas) contra el sistema interno.
- Revisar textos, cifras, nombres comerciales y socios tecnológicos.
- Agregar política de privacidad, formularios y analítica únicamente con las integraciones aprobadas.
- Añadir páginas detalladas por solución, SEO enriquecido y casos de éxito autorizados.
- Validar responsive, accesibilidad, metadatos, rendimiento y configuración de dominio.

La web existente en `coresolutions.com.ec` no fue modificada.
