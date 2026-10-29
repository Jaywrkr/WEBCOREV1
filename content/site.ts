/* Datos de la empresa. Correo, teléfono y direcciones provienen del sitio
   original de Coresolutions que estaba en el repositorio. No se publican cifras,
   certificaciones, clientes ni casos sin evidencia autorizada. */
export const site = {
 name:"Coresolutions", url:process.env.NEXT_PUBLIC_SITE_URL || "https://www.coresolutions.com.ec",
 email:"info@coresolutions.com.ec" as string,
 phone:"+593 99 402 1631" as string,
 linkedin:"" as string,
 address:"Cuenca, Ecuador",
 street:"Av. 3 de Noviembre 21-176 y Juan Pablo I",
 sites:[
  {code:"CUE",city:"Cuenca",detail:"Av. 3 de Noviembre 21-176 y Juan Pablo I. Oficina principal y centro de datos CoreOnCloud."},
  {code:"GYE",city:"Guayaquil",detail:"Centro de datos CoreOnCloud."},
 ],
 hero:{eyebrow:"INFRAESTRUCTURA · NUBE · CIBERSEGURIDAD",title:"Infraestructura preparada",titleAccent:"para lo que viene.",description:"Diseñamos, implementamos y acompañamos infraestructura empresarial: cómputo, nube, protección de datos y ciberseguridad, según las necesidades de su organización.",cta:"Solicitar evaluación"},
 partners:["IBM","Lenovo","VMware","Veeam","Check Point","HPE","Aruba","Synology"],
} as const;
