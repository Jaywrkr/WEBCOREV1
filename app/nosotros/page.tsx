import type {Metadata} from "next";
import Link from "next/link";
import {ArrowUpRight} from "lucide-react";
import {site} from "@/content/site";
import {services} from "@/content/services";
import {Eyebrow, Tag} from "@/components/ui";

export const metadata: Metadata = {
  title: "Nosotros",
  description: "Coresolutions diseña, implementa y acompaña infraestructura empresarial en Ecuador: cómputo, nube, protección de datos y ciberseguridad.",
};

/* Página Nosotros sin datos provisionales (dirección, sección 9): solo lo que
   la empresa puede sostener hoy. Año de fundación, equipo, certificaciones y
   casos se incorporan cuando existan datos y autorizaciones. */

const how = [
  {title: "Entender el entorno", body: "Revisamos necesidades, dependencias y objetivos de la organización antes de proponer una solución."},
  {title: "Diseñar e implementar", body: "Definimos la arquitectura, acordamos alcance y pruebas, y validamos la solución con criterios de entrega explícitos."},
  {title: "Documentar y acompañar", body: "Entregamos documentación útil para operar y acordamos el acompañamiento que requiere cada entorno."},
];

export default function About() {
  return (
    <>
      <section className="section section-dark">
        <div className="container">
          <Eyebrow>NOSOTROS</Eyebrow>
          <h1 className="display max-w-4xl">Ingeniería y acompañamiento para infraestructura crítica.</h1>
          <p className="max-w-2xl mt-7 text-gray-200">Somos una empresa ecuatoriana que integra soluciones de infraestructura, nube, protección de datos y ciberseguridad para organizaciones que dependen de su operación tecnológica.</p>
        </div>
      </section>

      <section className="section">
        <div className="container grid md:grid-cols-2 gap-16">
          <div>
            <Eyebrow>QUÉ HACEMOS</Eyebrow>
            <h2 className="section-title">Tecnología orientada a continuidad operativa.</h2>
            <p className="muted mt-6">Trabajamos con fabricantes especializados para diseñar e implementar plataformas de cómputo, almacenamiento, virtualización, respaldo y seguridad. El punto de partida es siempre el entorno de cada cliente: sus cargas, sus dependencias y sus objetivos.</p>
            <ul className="mt-8 grid gap-2" aria-label="Servicios">
              {services.map(s => (
                <li key={s.slug}><Link className="text-link" href={"/servicios/" + s.slug}>{s.title}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Misión</h3>
            <p className="muted mt-3 mb-8">Diseñar, implementar y acompañar soluciones tecnológicas que aporten seguridad, disponibilidad y evolución a las organizaciones.</p>
            <h3>Visión</h3>
            <p className="muted mt-3 mb-8">Ser un aliado técnico confiable para organizaciones que requieren infraestructura moderna y resiliente.</p>
            <h3>Valores</h3>
            <p className="muted mt-3">Rigor técnico, responsabilidad, claridad y orientación al cliente.</p>
          </div>
        </div>
      </section>

      <section className="section section-muted" aria-labelledby="como-h">
        <div className="container">
          <Eyebrow>CÓMO TRABAJAMOS</Eyebrow>
          <h2 id="como-h" className="section-title mb-10">Del diagnóstico a la operación.</h2>
          <ol className="grid md:grid-cols-3 gap-4" style={{listStyle: "none", padding: 0, margin: 0}}>
            {how.map((h, i) => (
              <li className="flat-card" key={h.title}>
                <span className="mono text-xs muted">0{i + 1} / 03</span>
                <h3 className="mt-4">{h.title}</h3>
                <p className="muted mt-3">{h.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Eyebrow>TECNOLOGÍAS</Eyebrow>
          <h2 className="section-title mb-4">Tecnologías que integramos.</h2>
          <p className="muted mb-8 max-w-2xl">Integrar una tecnología no implica una relación de partner certificado. Las certificaciones del equipo y de la empresa se publicarán cuando estén validadas documentalmente.</p>
          <div className="flex flex-wrap gap-3">{site.partners.map(p => <Tag key={p}>{p}</Tag>)}</div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container flex justify-between gap-8 items-center flex-wrap">
          <div>
            <Eyebrow>DÓNDE ESTAMOS</Eyebrow>
            <h2 className="section-title">{site.address}.</h2>
            <p className="muted mt-4">Dirección, teléfono y correo públicos pendientes de confirmación por la empresa.</p>
          </div>
          <Link className="btn" href="/contacto">Solicitar evaluación <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden="true"/></Link>
        </div>
      </section>
    </>
  );
}
