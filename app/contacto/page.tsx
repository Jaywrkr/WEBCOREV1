import type {Metadata} from "next";
import {ContactForm} from "@/components/contact-form";
import {Eyebrow} from "@/components/ui";
import {getService} from "@/content/services";

export const metadata: Metadata = {title: "Contacto"};

/* El servicio puede llegar preseleccionado desde una ficha (?servicio=slug)
   y permanece editable en el formulario. */
export default async function Contact({searchParams}: {searchParams: Promise<{servicio?: string}>}) {
  const {servicio = ""} = await searchParams;
  const preselected = getService(servicio);
  return (
    <>
      <section className="section section-dark">
        <div className="container">
          <Eyebrow>CONTACTO</Eyebrow>
          <h1 className="display max-w-3xl">Conversemos sobre su infraestructura.</h1>
          <p className="max-w-2xl mt-7 text-gray-200">Cuéntenos qué necesita modernizar, proteger o recuperar. Revisaremos su solicitud y le responderemos para definir el alcance de una evaluación.</p>
        </div>
      </section>
      <section className="section">
        <div className="container grid lg:grid-cols-[1fr_2fr] gap-16">
          <div>
            <h2>Solicitar evaluación</h2>
            <p className="muted mt-6">Con cuatro datos basta para empezar. Si llega desde una ficha de servicio, ese servicio aparece seleccionado y puede cambiarlo.</p>
            {preselected && <p className="muted mt-4 text-sm">Servicio preseleccionado: {preselected.title}.</p>}
            <p className="text-sm muted mt-6">Ubicación: Quito, Ecuador. Dirección, teléfono y correo de contacto pendientes de confirmación por la empresa.</p>
          </div>
          <ContactForm defaultService={preselected?.slug ?? ""}/>
        </div>
      </section>
    </>
  );
}
