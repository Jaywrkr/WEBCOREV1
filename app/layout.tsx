import type {Metadata} from "next";
import {IBM_Plex_Sans, IBM_Plex_Mono, Geist} from "next/font/google";
import {Header} from "@/components/header";
import {Footer} from "@/components/footer";
import {site} from "@/content/site";
import "./globals.css";

/* IBM Plex para texto y datos; Geist para titulares: minimalista, técnica y
   precisa, en peso medio. Sin fuente de acento: el acento es un tono. */
const sans = IBM_Plex_Sans({subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-plex-sans", display: "swap"});
const mono = IBM_Plex_Mono({subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-plex-mono", display: "swap"});
const display = Geist({subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-geist", display: "swap"});

const description = "Infraestructura, nube, protección de datos y ciberseguridad para empresas en Ecuador. Nube propia CoreOnCloud con centros de datos en Cuenca y Guayaquil.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {default: "Coresolutions | Infraestructura, nube y ciberseguridad en Ecuador", template: "%s | Coresolutions"},
  description,
  openGraph: {type: "website", locale: "es_EC", siteName: "Coresolutions", title: "Coresolutions | Infraestructura preparada para lo que viene", description},
  twitter: {card: "summary_large_image", title: "Coresolutions | Infraestructura preparada para lo que viene", description},
  robots: {index: true, follow: true},
};

/* Datos estructurados de la organización: solo datos publicados en el sitio. */
const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  logo: site.url + "/brand/coresolutions-navy.png",
  email: site.email,
  telephone: site.phone.replace(/\s/g, ""),
  address: {"@type": "PostalAddress", streetAddress: site.street, addressLocality: "Cuenca", addressCountry: "EC"},
  areaServed: "EC",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="es" className={[sans.variable, mono.variable, display.variable].join(" ")}>
      <body>
        <a className="skip" href="#contenido">Saltar al contenido</a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(organization)}}/>
        <Header/>
        <main id="contenido">{children}</main>
        <Footer/>
      </body>
    </html>
  );
}
