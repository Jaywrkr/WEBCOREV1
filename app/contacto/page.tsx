import type {Metadata} from "next";
import Link from "next/link";
import {Mail, Phone, MapPin} from "lucide-react";
import {ContactForm} from "@/components/contact-form";
import {Eyebrow} from "@/components/ui";
import {interests} from "@/content/services";
import {site} from "@/content/site";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Solicite una evaluación a Coresolutions o escríbanos directamente. Oficina principal en Cuenca y centros de datos en Cuenca y Guayaquil.",
};

/* El servicio puede llegar preseleccionado desde una ficha (?servicio=slug)
   y permanece editable en el formulario. */
export default async function Contact({searchParams}: {searchParams: Promise<{servicio?: string}>}) {
  const {servicio = ""} = await searchParams;
  const preselected = interests.find(x => x.slug === servicio);
  return (
    <>
      <section className="section section-dark">
        <div className="container">
          <Eyebrow>CONTACTO</Eyebrow>
          <h1 className="display max-w-3xl">Conversemos sobre <em>su infraestructura.</em></h1>
          <p className="max-w-2xl mt-7 text-gray-200">Cuéntenos qué necesita modernizar, proteger o recuperar. Revisaremos su solicitud y le responderemos para definir el alcance de una evaluación.</p>
        </div>
      </section>
      <section className="section">
        <div className="container grid lg:grid-cols-[1fr_2fr] gap-16">
          <div>
            <h2>Solicitar evaluación</h2>
            <p className="muted mt-6">Con cuatro datos basta para empezar. Si llega desde una ficha de servicio, ese servicio aparece seleccionado y puede cambiarlo.</p>
            {preselected && <p className="muted mt-4 text-sm">Servicio preseleccionado: {preselected.title}.</p>}
            <ul className="ct-direct" aria-label="Contacto directo">
              <li><Mail size={18} strokeWidth={1.75} aria-hidden="true"/><a href={"mailto:" + site.email}>{site.email}</a></li>
              <li><Phone size={18} strokeWidth={1.75} aria-hidden="true"/><a href={"tel:" + site.phone.replace(/\s/g, "")}>{site.phone}</a></li>
              <li><MapPin size={18} strokeWidth={1.75} aria-hidden="true"/><span>{site.street}, {site.address}</span></li>
            </ul>
            <p className="text-sm muted mt-6">Lea cómo tratamos sus datos en la <Link className="text-link" href="/privacidad">política de privacidad</Link>.</p>
          </div>
          <ContactForm defaultService={preselected?.slug ?? ""}/>
        </div>
      </section>
    </>
  );
}
