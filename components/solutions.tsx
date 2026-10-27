"use client";
import {useId, useState} from "react";
import Link from "next/link";
import {ArrowRight, ArrowUpRight} from "lucide-react";
import {services, getService} from "@/content/services";

/* Un solo selector por necesidad. La respuesta describe el alcance de un servicio
   y enlaza a su ficha; no es un diagnóstico ni una recomendación personalizada.
   Escritorio: lista con la respuesta contigua. Móvil: acordeón, la respuesta
   justo debajo de su control. Mismo patrón semántico en ambos (botón con
   aria-expanded y panel con aria-labelledby). */
const needs = [
  {id: "modernizar", problem: "Modernizar mi infraestructura", focus: "Modernización", slug: "infraestructura-centro-datos",
   answer: "Evaluación y diseño de cómputo, almacenamiento y virtualización según sus cargas."},
  {id: "interrupcion", problem: "Prepararme para una interrupción", focus: "Continuidad", slug: "proteccion-datos",
   answer: "Respaldo y recuperación con objetivos y pruebas definidos por proyecto."},
  {id: "riesgos", problem: "Reducir riesgos de seguridad", focus: "Ciberseguridad", slug: "ciberseguridad",
   answer: "Controles de red y endpoint alineados con el alcance y los riesgos del entorno."},
  {id: "operacion", problem: "Mejorar la operación de TI", focus: "Operación", slug: "servicios-gestionados",
   answer: "Monitoreo, gestión de eventos y soporte conforme al servicio acordado."},
];

export function Solutions() {
  const [active, setActive] = useState(0);
  const uid = useId();
  return (
    <section className="sol" id="soluciones" aria-labelledby={uid + "-h"}>
      <div className="container">
        <div className="sol-head">
          <h2 id={uid + "-h"}>¿Qué necesita resolver?</h2>
          <p>Empiece por su prioridad. Explore el alcance de una solución y conversemos sobre su entorno.</p>
        </div>
        <ul className="sol-list">
          {needs.map((n, i) => {
            const service = getService(n.slug);
            const open = active === i;
            const panelId = uid + "-p-" + n.id, btnId = uid + "-b-" + n.id;
            return (
              <li key={n.id} className="sol-item">
                <button type="button" className="sol-q" id={btnId} aria-expanded={open} aria-controls={panelId} onClick={() => setActive(i)}>
                  <span className="n">0{i + 1}</span>
                  <span>{n.problem}</span>
                  <ArrowRight size={20} strokeWidth={1.75} aria-hidden="true"/>
                </button>
                <div className="sol-a" id={panelId} role="region" aria-labelledby={btnId} hidden={!open}>
                  <p className="focus">{n.focus.toUpperCase()}</p>
                  <h3>{service?.title}</h3>
                  <p>{n.answer}</p>
                  {service && (
                    <ul aria-label="Entregables habituales">
                      {service.deliverables.slice(0, 3).map(d => <li key={d}>{d}</li>)}
                    </ul>
                  )}
                  <Link className="go" href={"/servicios/" + n.slug}>Ver alcance del servicio <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden="true"/></Link>
                </div>
              </li>
            );
          })}
        </ul>
        <nav className="sol-cat" aria-label="Todos los servicios">
          <p>¿BUSCA UN SERVICIO ESPECÍFICO?</p>
          <ul>
            {services.map(s => <li key={s.slug}><Link href={"/servicios/" + s.slug}>{s.title}</Link></li>)}
          </ul>
        </nav>
      </div>
    </section>
  );
}
