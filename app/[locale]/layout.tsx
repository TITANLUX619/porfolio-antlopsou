import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales, siteOrigin } from "@/i18n/routing";
import "../globals.css";

const name = "Antonio López Soult";
const brand = "antlopsou.dev";
const descriptions = {
  es: "Portfolio de Antonio López Soult, ingeniero de software en Sevilla. Explora sus proyectos de desarrollo web y aplicaciones y contacta para hablar del tuyo.",
  en: "Portfolio of Antonio López Soult, a software engineer in Seville, Spain. Explore his web and application projects and get in touch to discuss your own.",
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

const restoreTheme = `try {
  if (localStorage.getItem("theme") === "light") document.documentElement.dataset.theme = "light";
} catch {}`;

export default async function RootLayout({
  children,
  params,
}: Readonly<LocaleParams & { children: React.ReactNode }>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={locale} data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: restoreTheme }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
