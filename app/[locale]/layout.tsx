import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales, siteOrigin } from "@/i18n/routing";
import "../globals.css";
import "../editorial.css";

const name = "Antonio López Soult";
const brand = "antlopsou.dev";
const descriptions = {
  es: "Antonio López Soult, ingeniero de software en Sevilla. Aplicaciones web y móviles, automatización y arquitectura frontend. Proyectos: ConsultIA y Trento Desarrollo.",
  en: "Antonio López Soult, a software engineer in Seville. Web and mobile development, automation and frontend architecture. Projects: ConsultIA and Trento Desarrollo.",
};

type LocaleParams = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const role = locale === "es" ? "Ingeniero de software" : "Software engineer";
  const title = `${brand} · ${name}, ${role}`;
  const description = descriptions[locale];
  const images = [{
    url: `/art/portfolio-${locale}.jpg`,
    width: 1200,
    height: 630,
    alt: title,
  }];

  return {
    metadataBase: new URL(siteOrigin),
    title,
    description,
    authors: [{ name }],
    alternates: {
      canonical: `/${locale}`,
      languages: { es: "/es", en: "/en", "x-default": "/" },
    },
    openGraph: {
      type: "website",
      siteName: brand,
      title,
      description,
      url: `/${locale}`,
      locale: locale === "es" ? "es_ES" : "en_US",
      alternateLocale: locale === "es" ? "en_US" : "es_ES",
      images,
    },
    twitter: { card: "summary_large_image", title, description, images },
  };
}

const initializePage = `(() => {
  const root = document.documentElement;
  root.dataset.motion = "on";
  const navigationType = performance.getEntriesByType?.("navigation")[0]?.type
    ?? (["navigate", "reload", "back_forward"][performance.navigation?.type] || "navigate");
  const fromHistory = navigationType === "back_forward";
  const internalLink = navigationType === "navigate" && document.referrer.startsWith(location.origin + "/");

  // Pass a manual theme to the next page in this tab only when leaving the current one.
  const themeKey = "antlopsou-next-page-theme";
  function resumeVisit(internal) {
    try {
      const theme = sessionStorage.getItem(themeKey);
      sessionStorage.removeItem(themeKey);
      if (!internal || (theme !== "dark" && theme !== "light")) return false;
      root.dataset.theme = theme;
      return true;
    } catch { return internal; }
  }
  // Opening an internal link in a new tab also sends a referrer, but no theme was passed.
  const resumed = resumeVisit(fromHistory || internalLink);
  window.addEventListener("pagehide", () => {
    try { sessionStorage.setItem(themeKey, root.dataset.theme); } catch {}
    delete root.dataset.entrance;
    delete root.dataset.entrancePhoto;
  });
  window.addEventListener("pageshow", event => {
    if (event.persisted) resumeVisit(true);
  });
  if (!fromHistory && !resumed && !location.hash && ${JSON.stringify(locales.flatMap(locale => [`/${locale}`, `/${locale}/`]))}.includes(location.pathname)) {
    root.dataset.entrance = "standby";
    root.dataset.entrancePhoto = "pending";
    window.addEventListener("hashchange", () => { delete root.dataset.entrance; }, { once: true });
  }
})();`;

export default async function RootLayout({
  children,
  params,
}: Readonly<LocaleParams & { children: React.ReactNode }>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={locale} data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: initializePage }} />
      </head>
      <body>
        <picture className="site-backdrop">
          <source media="(max-width: 750px)" srcSet="/art/optical-ribbon-mobile.webp" />
          <img src="/art/optical-ribbon.webp" width={1672} height={941} alt="" fetchPriority="high" />
        </picture>
        {children}
      </body>
    </html>
  );
}
