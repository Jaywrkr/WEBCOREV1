import type {MetadataRoute} from "next";
import {site} from "@/content/site";
import {services} from "@/content/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/coreoncloud", "/nosotros", "/contacto", "/privacidad", ...services.map(s => "/servicios/" + s.slug)];
  return paths.map(path => ({url: site.url + path, changeFrequency: "monthly", priority: path === "" ? 1 : path === "/privacidad" ? .3 : .7}));
}
