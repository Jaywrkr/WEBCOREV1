import Link from "next/link";
import Image from "next/image";
import {site} from "@/content/site";
import {services} from "@/content/services";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link href="/" className="logo" aria-label="Coresolutions, inicio">
              <Image src="/brand/coresolutions-white.png" alt="" width={1276} height={138}/>
            </Link>
            <p className="mt-6 text-sm text-gray-300 max-w-xs">Infraestructura, nube, ciberseguridad y continuidad operativa para empresas en Ecuador.</p>
            <p className="mt-4 text-xs text-gray-300 mono">{site.sites.map(s => s.city).join(" · ")}</p>
          </div>
          <div>
            <h3 className="text-base">Servicios</h3>
            {services.map(s => <Link key={s.slug} href={"/servicios/" + s.slug}>{s.title}</Link>)}
          </div>
          <div>
            <h3 className="text-base">Empresa</h3>
            <Link href="/coreoncloud">CoreOnCloud</Link>
            <Link href="/nosotros">Nosotros</Link>
            <Link href="/contacto">Contacto</Link>
            <Link href="/privacidad">Privacidad</Link>
          </div>
          <div>
            <h3 className="text-base">Contacto</h3>
            <a href={"mailto:" + site.email}>{site.email}</a>
            <a href={"tel:" + site.phone.replace(/\s/g, "")}>{site.phone}</a>
            <p className="text-sm mt-3 text-gray-300">{site.street}, {site.address}</p>
            {site.linkedin && <a href={site.linkedin} rel="noopener">LinkedIn</a>}
          </div>
        </div>
        <div className="border-t border-white/20 mt-16 pt-6 flex flex-wrap justify-between gap-3 text-xs text-gray-300">
          <span>© {new Date().getFullYear()} Coresolutions</span>
          <span>Todos los derechos reservados</span>
        </div>
      </div>
    </footer>
  );
}
