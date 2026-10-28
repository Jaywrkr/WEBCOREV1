/* Datos de la empresa. Los campos vacíos están pendientes de confirmación por
   Coresolutions y no se muestran hasta que tengan valor. No se publican cifras,
   certificaciones, clientes ni casos sin evidencia autorizada. */
export const site = {
 name:"Coresolutions", url:process.env.NEXT_PUBLIC_SITE_URL || "https://www.coresolutions.com.ec",
 email:"" as string, phone:"" as string, linkedin:"" as string,
 address:"Quito, Ecuador",
 hero:{eyebrow:"INFRAESTRUCTURA · NUBE · CIBERSEGURIDAD",title:"Infraestructura preparada",titleAccent:"para lo que viene.",description:"Diseñamos, implementamos y acompañamos infraestructura empresarial: cómputo, nube, protección de datos y ciberseguridad, según las necesidades de su organización.",cta:"Solicitar evaluación"},
 partners:["IBM","Lenovo","VMware","Veeam","Check Point","HPE","Aruba","Synology"],
 sectors:[{title:"Sector financiero",desc:"Continuidad, protección de datos y operación de infraestructura."},{title:"Energía",desc:"Resiliencia y disponibilidad para operaciones críticas."},{title:"Educación",desc:"Plataformas escalables y conectividad segura."},{title:"Corporativo",desc:"Modernización, rendimiento y seguridad empresarial."}],
 steps:[{title:"Evaluación",desc:"Identificamos necesidades, riesgos y objetivos."},{title:"Diseño",desc:"Definimos arquitectura, alcance y criterios de aceptación."},{title:"Implementación",desc:"Desplegamos, validamos y documentamos la solución."},{title:"Soporte gestionado",desc:"Acompañamos la operación y la mejora continua."}],
} as const;
