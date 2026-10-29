import type {Metadata} from "next";
import {site} from "@/content/site";
import {Eyebrow} from "@/components/ui";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Cómo trata Coresolutions la información que usted comparte a través de este sitio, conforme a la Ley Orgánica de Protección de Datos Personales del Ecuador.",
};

/* Texto tomado del sitio anterior y ajustado al formulario actual.
   Debe revisarlo el asesor legal de la empresa antes de darlo por final. */
export default function Privacy() {
  const mail = <a className="text-link" href={"mailto:" + site.email}>{site.email}</a>;
  return (
    <>
      <section className="section section-dark">
        <div className="container">
          <Eyebrow>PRIVACIDAD</Eyebrow>
          <h1 className="display max-w-4xl">Política de privacidad</h1>
          <p className="max-w-2xl mt-7 text-gray-200">Cómo tratamos la información que usted comparte con nosotros a través de este sitio.</p>
        </div>
      </section>
      <section className="section">
        <div className="container prose-cs">
          <p className="muted text-sm">Documento en revisión legal. Última actualización: octubre de 2026.</p>
          <h2>Responsable del tratamiento</h2>
          <p>Coresolutions, con domicilio en {site.street}, {site.address}. Contacto: {mail}.</p>
          <h2>Qué datos tratamos</h2>
          <p>Este sitio no utiliza cookies de seguimiento ni herramientas de analítica. El formulario de contacto envía los datos que usted escribe (nombre, correo, empresa, servicio de interés, descripción de la necesidad y, si los indica, cargo y teléfono) a nuestro correo mediante un servicio de envío de correo. No se almacenan en una base de datos del sitio. Si el envío automático no está disponible, el formulario le ofrece preparar el mensaje en su aplicación de correo, que usted decide enviar.</p>
          <h2>Para qué los usamos</h2>
          <ul>
            <li>Responder a su solicitud y conversar sobre el alcance de una evaluación.</li>
            <li>Dar seguimiento a la relación comercial que usted solicite.</li>
          </ul>
          <h2>Base legal</h2>
          <p>Tratamos sus datos con base en su consentimiento al escribirnos y, cuando corresponda, en la ejecución de medidas precontractuales o contractuales, conforme a la Ley Orgánica de Protección de Datos Personales del Ecuador.</p>
          <h2>Conservación</h2>
          <p>Conservamos sus datos mientras sean necesarios para atender su solicitud y cumplir obligaciones legales.</p>
          <h2>Sus derechos</h2>
          <p>Puede ejercer sus derechos de acceso, rectificación y actualización, eliminación, oposición, portabilidad y suspensión del tratamiento escribiendo a {mail}. Responderemos dentro de los plazos que establece la ley.</p>
          <h2>Cambios</h2>
          <p>Publicaremos en esta página cualquier cambio a esta política.</p>
        </div>
      </section>
    </>
  );
}
