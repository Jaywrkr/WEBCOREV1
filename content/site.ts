export const site = {
 name:"Coresolutions", url:process.env.NEXT_PUBLIC_SITE_URL || "https://www.coresolutions.com.ec",
 email:"{{PLACEHOLDER_EMAIL}}", phone:"{{PLACEHOLDER_TELÉFONO}}",
 address:"Quito, Ecuador", socials:[{label:"LinkedIn",href:"{{PLACEHOLDER_LINKEDIN}}"}],
 hero:{eyebrow:"INFRAESTRUCTURA · NUBE · CIBERSEGURIDAD",title:"Infraestructura que no se detiene.",description:"Diseñamos, implementamos y damos soporte a su infraestructura. Nuestro objetivo es fortalecer la continuidad operativa de su organización.",cta:"Agendar evaluación"},
 stats:[{label:"Años en el mercado",value:"{{PLACEHOLDER}}"}, {label:"Proyectos ejecutados",value:"{{PLACEHOLDER}}"}, {label:"Clientes",value:"{{PLACEHOLDER}}"}, {label:"SLA contractual",value:"{{PLACEHOLDER}}"}],
 monitoring:[{label:"Disponibilidad referencial",value:"99.97%"},{label:"Incidentes resueltos",value:"{{PLACEHOLDER}}"},{label:"SLA aplicable",value:"{{PLACEHOLDER}}"}],
 partners:["IBM","Lenovo","VMware","Veeam","Check Point","HPE","Aruba","Synology"],
 sectors:[{title:"Sector financiero",desc:"Continuidad, protección de datos y operación de infraestructura."},{title:"Energía",desc:"Resiliencia y disponibilidad para operaciones críticas."},{title:"Educación",desc:"Plataformas escalables y conectividad segura."},{title:"Corporativo",desc:"Modernización, rendimiento y seguridad empresarial."}],
 steps:[{title:"Evaluación",desc:"Identificamos necesidades, riesgos y objetivos."},{title:"Diseño",desc:"Definimos arquitectura, alcance y criterios de aceptación."},{title:"Implementación",desc:"Desplegamos, validamos y documentamos la solución."},{title:"Soporte gestionado",desc:"Acompañamos la operación y la mejora continua."}],
 caseStudy:{sector:"{{PLACEHOLDER_SECTOR}}",challenge:"{{PLACEHOLDER_RETO}}",solution:"{{PLACEHOLDER_SOLUCIÓN}}",result:"{{PLACEHOLDER_RESULTADO}}",metric:"{{PLACEHOLDER}}"}
} as const;
