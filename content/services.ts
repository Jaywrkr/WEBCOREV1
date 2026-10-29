/* Catálogo de servicios. El contenido ampliado (señales, alcance, método y
   preguntas) se adaptó del sitio original de Coresolutions, sin cifras, plazos
   ni garantías: lo que depende de cada cliente se define en la propuesta. */

export type GlyphId = "modernizar" | "consolidar" | "riesgos" | "interrupcion" | "operacion" | "ia";
type Pair = [string, string];

export type Service = {
  slug: string; title: string; eyebrow: string; glyph: GlyphId;
  summary: string; lede: string;
  problem: string; solution: string;
  deliverables: string[];
  signals: Pair[];
  includes: Pair[];
  steps: Pair[];
  faq: Pair[];
  technologies: string[];
  related: string[];
  coreoncloud?: string;
};

export const services: Service[] = [
  {
    slug: "infraestructura-centro-datos", title: "Infraestructura y centro de datos", eyebrow: "INFRAESTRUCTURA", glyph: "modernizar",
    summary: "Modernice plataformas críticas con arquitectura empresarial.",
    lede: "Servidores, almacenamiento, red y alta disponibilidad dimensionados para sus cargas críticas, con un plan claro de renovación.",
    problem: "Los entornos heterogéneos pueden dificultar el crecimiento, la disponibilidad y el soporte.",
    solution: "Evaluamos, diseñamos e implementamos cómputo, almacenamiento y arquitectura de alta disponibilidad.",
    deliverables: ["Evaluación de la infraestructura actual", "Diseño de arquitectura y dimensionamiento", "Implementación y validación técnica", "Documentación y transferencia de conocimiento"],
    signals: [
      ["Equipos al final de su vida útil", "Hardware sin soporte del fabricante y con un riesgo de falla que crece cada año."],
      ["Almacenamiento al límite", "Espacio y rendimiento insuficientes que frenan sistemas clave."],
      ["Un punto único de falla", "Un equipo o un enlace que, si se detiene, detiene a toda la organización."],
    ],
    includes: [
      ["Evaluación de la plataforma actual", "Inventario, uso real, riesgos y estado de soporte de cada componente."],
      ["Servidores y almacenamiento", "Plataformas dimensionadas para sus aplicaciones y el crecimiento esperado."],
      ["Red y conectividad", "Switching, segmentación, Wi-Fi empresarial y enlaces entre sedes."],
      ["Alta disponibilidad", "Redundancia en energía, red y cómputo donde la operación lo requiera."],
      ["Migración y documentación", "Traslado ordenado de cargas, diagramas actualizados y transferencia de conocimiento."],
    ],
    steps: [
      ["Evaluación", "Inventario, uso real y riesgos de su plataforma actual."],
      ["Dimensionamiento", "Capacidad, rendimiento y crecimiento proyectado."],
      ["Implementación", "Instalación, configuración y migración en ventanas acordadas."],
      ["Entrega y soporte", "Documentación, capacitación y el soporte que se acuerde."],
    ],
    faq: [
      ["¿Conviene renovar equipos o pasar a la nube?", "Depende de sus cargas, requisitos y presupuesto. Muchas organizaciones combinan ambas opciones; la evaluación compara los escenarios con su información."],
      ["¿Pueden trabajar sobre la infraestructura que ya tengo?", "Sí. Partimos de un levantamiento de su plataforma y reutilizamos lo que siga siendo adecuado."],
      ["¿Incluye la migración?", "Puede incluirla. Su alcance se define en la propuesta según el volumen de cargas y las ventanas disponibles."],
    ],
    technologies: ["IBM", "Lenovo", "HPE", "Aruba", "Synology"],
    related: ["nube-virtualizacion", "proteccion-datos"],
  },
  {
    slug: "nube-virtualizacion", title: "Nube y virtualización", eyebrow: "NUBE", glyph: "consolidar",
    summary: "Consolide recursos y habilite infraestructura flexible.",
    lede: "Consolidamos sus servidores en una plataforma virtual o hiperconvergente, en su sitio, en CoreOnCloud o en ambos.",
    problem: "La falta de elasticidad y estandarización puede afectar los costos y la agilidad.",
    solution: "Implementamos soluciones de virtualización y nube adaptadas a cada entorno.",
    deliverables: ["Assessment de cargas de trabajo", "Diseño de plataforma", "Migración e implementación", "Pruebas operativas y documentación"],
    signals: [
      ["Demasiados servidores físicos", "Equipos subutilizados que consumen energía, espacio y mantenimiento."],
      ["Gestión dispersa", "Varias consolas y procedimientos distintos para tareas que deberían ser simples."],
      ["Crecer es lento", "Cada sistema nuevo exige comprar e instalar hardware."],
    ],
    includes: [
      ["Assessment de cargas", "Inventario de servidores y consumo real para dimensionar la plataforma."],
      ["Virtualización de servidores", "Sus cargas en máquinas virtuales sobre una plataforma con alta disponibilidad."],
      ["Infraestructura hiperconvergente", "Cómputo, almacenamiento y red integrados en nodos que se gestionan como un solo sistema."],
      ["Capacidad en CoreOnCloud", "Recursos en nuestra nube propia, con centros de datos en Cuenca y Guayaquil."],
      ["Migración y pruebas", "Traslado planificado de cargas, con pruebas operativas y documentación."],
    ],
    steps: [
      ["Análisis", "Inventario de cargas y su consumo real."],
      ["Diseño", "Plataforma, capacidad y alta disponibilidad."],
      ["Migración", "Traslado ordenado de cargas, con pruebas."],
      ["Operación", "Capacitación y el soporte que se acuerde."],
    ],
    faq: [
      ["¿Qué es la hiperconvergencia?", "Es una plataforma en la que cómputo, almacenamiento y red se integran en nodos que se gestionan como un único sistema y crecen agregando nodos."],
      ["¿Mis aplicaciones son compatibles?", "La mayoría de aplicaciones empresariales funciona en un entorno virtual. Lo verificamos durante el análisis, aplicación por aplicación."],
      ["¿Puedo usar mi sitio y la nube a la vez?", "Sí. Un modelo híbrido es habitual: producción en su sitio y capacidad o contingencia en CoreOnCloud, o al revés."],
    ],
    technologies: ["VMware", "IBM", "Lenovo"],
    related: ["infraestructura-centro-datos", "proteccion-datos"],
    coreoncloud: "La plataforma puede vivir en su sitio, en CoreOnCloud o repartirse entre ambos.",
  },
  {
    slug: "ciberseguridad", title: "Ciberseguridad", eyebrow: "SEGURIDAD", glyph: "riesgos",
    summary: "Reduzca la superficie de exposición de su organización.",
    lede: "Reducimos la superficie de exposición de su organización y le damos visibilidad para actuar antes de que un incidente detenga la operación.",
    problem: "Las amenazas y la complejidad operacional exigen visibilidad y protección coordinada.",
    solution: "Integramos controles de red, endpoint y políticas de seguridad según el riesgo.",
    deliverables: ["Identificación de alcance y riesgos", "Diseño de controles", "Implementación y pruebas", "Entrega de procedimientos"],
    signals: [
      ["Accesos sin control", "Usuarios con más permisos de los que necesitan y contraseñas que se comparten."],
      ["Equipos expuestos", "Computadores y servidores sin protección actualizada, la puerta de entrada más común."],
      ["Sin visibilidad", "Si nadie revisa los eventos de seguridad, un ataque puede pasar inadvertido durante semanas."],
    ],
    includes: [
      ["Evaluación de seguridad", "Revisión de su configuración actual con recomendaciones priorizadas por riesgo."],
      ["Firewall de nueva generación", "Control de tráfico, segmentación y prevención de intrusiones en el perímetro y entre redes."],
      ["Protección de endpoints", "Seguridad para computadores y servidores, con gestión centralizada."],
      ["Acceso seguro", "VPN, autenticación multifactor y permisos por rol."],
      ["Políticas y procedimientos", "Reglas documentadas para que los controles se mantengan en el tiempo."],
    ],
    steps: [
      ["Evaluación", "Activos críticos, brechas y riesgos."],
      ["Diseño", "Controles y su prioridad según el impacto en su operación."],
      ["Implementación", "Despliegue por fases, en ventanas acordadas."],
      ["Revisión", "Ajuste de políticas y controles según el servicio acordado."],
    ],
    faq: [
      ["¿Por dónde conviene empezar?", "Por una evaluación. Permite priorizar lo que más reduce su riesgo con la inversión disponible, en lugar de comprar herramientas por separado."],
      ["¿La implementación afecta la operación?", "Se planifica por fases y en ventanas acordadas con su equipo, con un plan de vuelta atrás para cada cambio."],
      ["¿Consideran la Ley de Protección de Datos?", "Los controles pueden alinearse con la Ley Orgánica de Protección de Datos Personales del Ecuador y con los requisitos de su sector. El alcance se define en la evaluación."],
    ],
    technologies: ["Check Point", "HPE Aruba"],
    related: ["proteccion-datos", "servicios-gestionados"],
  },
  {
    slug: "proteccion-datos", title: "Protección de datos y recuperación", eyebrow: "CONTINUIDAD", glyph: "interrupcion",
    summary: "Prepare sus sistemas para incidentes y recuperaciones.",
    lede: "Sus datos respaldados y verificados, con una forma acordada y probada de recuperarlos si algo falla.",
    problem: "Sin estrategias verificadas de respaldo, las interrupciones pueden prolongarse.",
    solution: "Diseñamos esquemas de backup y DR con objetivos RPO/RTO definidos por proyecto.",
    deliverables: ["Análisis de criticidad", "Política de respaldo y retención", "Implementación y pruebas de recuperación", "Procedimiento de restauración"],
    signals: [
      ["Respaldos que nadie prueba", "Un respaldo que nunca se ha restaurado es una suposición, no una garantía."],
      ["Ransomware", "Si un atacante cifra también las copias de seguridad, no hay a dónde volver."],
      ["Recuperación sin plan", "Cuando ocurre el incidente, cada minuto se pierde decidiendo qué restaurar primero."],
    ],
    includes: [
      ["Análisis de criticidad", "Cuánto tiempo y cuántos datos puede perder cada sistema (RTO y RPO)."],
      ["Respaldo gestionado", "Copias automáticas de servidores y bases de datos, con la retención que se defina."],
      ["Copias fuera de su sitio", "Una copia en CoreOnCloud, en Ecuador, separada de su infraestructura."],
      ["Recuperación ante desastres", "Servidores críticos replicados y preparados para funcionar en un sitio alterno."],
      ["Pruebas de restauración", "Con la frecuencia acordada y documentadas, para saber que la copia sirve."],
    ],
    steps: [
      ["Diagnóstico", "Qué proteger y cuánto tiempo y datos puede perder."],
      ["Diseño", "Política de respaldo, retención y réplica para cada sistema."],
      ["Implementación", "Configuración, primera copia completa y réplica."],
      ["Operación y pruebas", "Monitoreo, pruebas de restauración y reportes."],
    ],
    faq: [
      ["¿Qué diferencia hay entre respaldo y recuperación ante desastres?", "El respaldo guarda copias de sus datos para recuperarlos cuando los necesite. La recuperación ante desastres mantiene servidores replicados y listos para funcionar en otro sitio, de modo que la operación se reanuda en menos tiempo."],
      ["¿Dónde se guardan mis copias?", "En su sitio, en CoreOnCloud o en ambos. CoreOnCloud opera en Ecuador, con centros de datos en Cuenca y Guayaquil."],
      ["¿Cada cuánto se prueban los respaldos?", "La frecuencia se define con usted según la criticidad de cada sistema, y el resultado de cada prueba se documenta."],
    ],
    technologies: ["Veeam", "IBM", "Synology"],
    related: ["nube-virtualizacion", "ciberseguridad"],
    coreoncloud: "Las copias y el sitio alterno pueden alojarse en CoreOnCloud, en Ecuador.",
  },
  {
    slug: "servicios-gestionados", title: "Servicios gestionados", eyebrow: "OPERACIÓN", glyph: "operacion",
    summary: "Obtenga visibilidad operativa y acompañamiento especializado.",
    lede: "Monitoreo, gestión de eventos y soporte para que su infraestructura se opere con procedimientos claros.",
    problem: "La falta de monitoreo y procedimientos puede aumentar el tiempo de respuesta.",
    solution: "Implementamos monitoreo, gestión de eventos y soporte conforme a un SLA acordado.",
    deliverables: ["Inventario y alcance de activos", "Configuración de monitoreo", "Procedimientos de escalamiento", "Reportes y revisión del servicio"],
    signals: [
      ["Se entera por los usuarios", "Las fallas se detectan cuando alguien reclama, no cuando empiezan."],
      ["Conocimiento en pocas personas", "La operación depende de quien conoce el sistema y no está documentada."],
      ["Sin información para decidir", "No hay reportes periódicos para planificar renovaciones o mejoras."],
    ],
    includes: [
      ["Inventario y alcance", "Activos cubiertos, horarios y canales de atención definidos por escrito."],
      ["Monitoreo y alertas", "Disponibilidad, capacidad y eventos de los componentes acordados."],
      ["Gestión de eventos", "Procedimientos de atención y escalamiento para cada tipo de alerta."],
      ["Mantenimiento preventivo", "Actualizaciones y revisiones planificadas."],
      ["Reportes y revisión", "Información periódica del servicio para decidir mejoras."],
    ],
    steps: [
      ["Inventario", "Activos, dependencias y alcance del servicio."],
      ["Configuración", "Monitoreo, alertas y procedimientos."],
      ["Operación", "Atención de eventos según lo acordado."],
      ["Revisión", "Reportes y ajustes periódicos del servicio."],
    ],
    faq: [
      ["¿Reemplazan a mi equipo de TI?", "No necesariamente. El servicio puede complementar a su equipo en las tareas y los horarios que se acuerden."],
      ["¿Qué cubre exactamente el servicio?", "Los activos, horarios, tiempos de atención y canales se definen en el acuerdo de servicio de cada cliente."],
    ],
    technologies: ["Prometheus", "Grafana", "Veeam"],
    related: ["infraestructura-centro-datos", "ciberseguridad"],
  },
  {
    slug: "inteligencia-artificial-on-premise", title: "Inteligencia artificial on-premise", eyebrow: "INTELIGENCIA ARTIFICIAL", glyph: "ia",
    summary: "Evalúe y despliegue casos de IA en infraestructura bajo su control.",
    lede: "Evaluamos y desplegamos casos de inteligencia artificial sobre infraestructura bajo su control, para que sus datos no salgan de su entorno.",
    problem: "Ciertas cargas de IA requieren privacidad, residencia de datos y control operacional.",
    solution: "Acompañamos el dimensionamiento y la integración de infraestructura para modelos empresariales de IA.",
    deliverables: ["Discovery de casos de uso", "Análisis de infraestructura y seguridad", "Diseño de piloto", "Pruebas y recomendaciones para producción"],
    signals: [
      ["Datos que no pueden salir", "Información sensible o regulada que no debe procesarse en servicios externos."],
      ["Pilotos que no escalan", "Pruebas que funcionan en una demostración pero nunca llegan a producción."],
      ["Infraestructura incierta", "No está claro qué cómputo y almacenamiento requiere un caso de uso."],
    ],
    includes: [
      ["Descubrimiento de casos de uso", "Talleres para priorizar dónde la IA aporta más con menos riesgo."],
      ["Dimensionamiento", "Cómputo, aceleración, almacenamiento y red para el caso elegido."],
      ["Seguridad y gobierno de datos", "Control de accesos y protección de la información en cada etapa."],
      ["Piloto acotado", "Una primera versión funcional sobre un caso concreto."],
      ["Recomendaciones para producción", "Qué se necesita para llevar el piloto a la operación diaria."],
    ],
    steps: [
      ["Descubrimiento", "Casos de uso priorizados con su equipo."],
      ["Dimensionamiento", "Infraestructura y seguridad necesarias."],
      ["Piloto", "Prueba funcional sobre un caso acotado."],
      ["Producción", "Plan para operar y escalar la solución."],
    ],
    faq: [
      ["¿Necesito tener mis datos ordenados para empezar?", "No necesariamente. Parte del trabajo inicial es identificar qué información existe y cómo aprovecharla."],
      ["¿Por qué on-premise y no en la nube pública?", "Cuando la privacidad, la residencia de los datos o el control operativo son prioritarios. En otros casos un modelo híbrido puede ser adecuado; lo evaluamos con usted."],
    ],
    technologies: ["Lenovo", "IBM", "VMware"],
    related: ["infraestructura-centro-datos", "ciberseguridad"],
  },
];

export function getService(slug: string) {
  return services.find(item => item.slug === slug);
}

/* Opciones de interés del formulario: los seis servicios y CoreOnCloud. */
export const interests: {slug: string; title: string}[] = [
  ...services.map(s => ({slug: s.slug, title: s.title})),
  {slug: "coreoncloud", title: "CoreOnCloud (nube en Ecuador)"},
];
