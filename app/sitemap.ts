import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { locales, siteOrigin } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", ...projects.map(({ slug }) => `/work/${slug}`)];
  return paths.flatMap((path) => {
    const languages = Object.fromEntries(locales.map((locale) => [
      locale, `${siteOrigin}/${locale}${path}`,
    ]));
    return locales.map((locale) => ({
      url: `${siteOrigin}/${locale}${path}`,
      alternates: { languages },
    }));
  });
}
