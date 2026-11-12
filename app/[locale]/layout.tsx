import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales, siteOrigin } from "@/i18n/routing";
import { motionStorageKey, reducedMotionQuery } from "@/lib/motion";
import "../globals.css";
import "../editorial.css";

const name = "Antonio López Soult";
const brand = "antlopsou.dev";
const descriptions = {
  es: "Antonio López Soult, ingeniero de software en Sevilla. Aplicaciones web y móviles, automatización y arquitectura frontend. Proyectos: ConsultIA y Trento Consulting.",
  en: "Antonio López Soult, a software engineer in Seville. Web and mobile development, automation and frontend architecture. Projects: ConsultIA and Trento Consulting.",
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

const restorePreferences = `(() => {
  const root = document.documentElement;
  const systemMotion = matchMedia("${reducedMotionQuery}");
  function updateMotion() {
    let choice;
    try { choice = localStorage.getItem("${motionStorageKey}"); } catch {}
    root.dataset.motion = choice === "on" || choice === "off" ? choice : systemMotion.matches ? "off" : "on";
  }
  try { if (localStorage.getItem("theme") === "light") root.dataset.theme = "light"; } catch {}
  updateMotion();
  if (!location.hash && ${JSON.stringify(locales.flatMap(locale => [`/${locale}`, `/${locale}/`]))}.includes(location.pathname)) {
    try {
      const navigationType = performance.getEntriesByType?.("navigation")[0]?.type
        ?? (["navigate", "reload", "back_forward"][performance.navigation?.type] || "navigate");
      const internal = document.referrer && new URL(document.referrer).origin === location.origin;
      if (navigationType === "reload" || (navigationType === "navigate" && !internal)) {
        root.dataset.entrance = "standby";
        const clearEntrance = () => { delete root.dataset.entrance; };
        window.addEventListener("hashchange", clearEntrance, { once: true });
        window.addEventListener("pagehide", clearEntrance, { once: true });
      }
    } catch {}
  }
  systemMotion.addEventListener("change", updateMotion);
  window.addEventListener("pageshow", updateMotion);
  window.addEventListener("storage", event => {
    if (event.key === "${motionStorageKey}" || event.key === null) updateMotion();
  });
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
        <script dangerouslySetInnerHTML={{ __html: restorePreferences }} />
      </head>
      <body>
        <div className="site-backdrop" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
