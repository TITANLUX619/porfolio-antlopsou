import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Header, Footer } from "@/components/SiteChrome";
import { projects } from "@/data/projects";
import { defaultLocale, isLocale, siteOrigin } from "@/i18n/routing";
import "@/app/work.css";

type PageProps = { params: Promise<{ locale: string; slug: string }> };

const labels = {
  es: {
    back: "Volver a los proyectos",
    context: "Contexto",
    implementation: "Mi aportación",
    result: "Resultado",
    technology: "Tecnologías",
    next: "Siguiente caso",
  },
  en: {
    back: "Back to projects",
    context: "Context",
    implementation: "My contribution",
    result: "Outcome",
    technology: "Technologies",
    next: "Next case study",
  },
};

function getCase(locale: string, slug: string) {
  const project = projects.find((item) => item.slug === slug);
  if (!project || !isLocale(locale)) notFound();
  return { locale, project, copy: project[locale] };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const { project, copy } = getCase(locale, slug);
  const path = (language: string) => `/${language}/work/${project.slug}`;
  const title = `${project.name} · Antonio López Soult · antlopsou.dev`;
  const images = [{
    url: `/work/${project.slug}.webp`,
    width: project.width,
    height: project.height,
    alt: copy.alt,
  }];

  return {
    metadataBase: new URL(siteOrigin),
    title,
    description: copy.summary,
    alternates: {
      canonical: path(locale),
      languages: { es: path("es"), en: path("en"), "x-default": path(defaultLocale) },
    },
    openGraph: {
      type: "article",
      siteName: "antlopsou.dev",
      title,
      description: copy.summary,
      url: path(locale),
      locale: locale === "es" ? "es_ES" : "en_US",
      alternateLocale: locale === "es" ? "en_US" : "es_ES",
      images,
    },
    twitter: { card: "summary_large_image", title, description: copy.summary, images },
  };
}

export default async function CasePage({ params }: PageProps) {
  const route = await params;
  const { locale, project, copy } = getCase(route.locale, route.slug);
  const t = labels[locale];
  const next = projects.length > 1 ? projects[(projects.indexOf(project) + 1) % projects.length] : null;

  return (
    <>
      <Header locale={locale} slug={project.slug} />
      <main className="case-main shell" id="main" tabIndex={-1}>
        <a className="case-back" href={`/${locale}#projects`}>
          <span aria-hidden="true">←</span> {t.back}
        </a>
        <article>
          <header className="case-heading">
            <p className="eyebrow">{copy.category}</p>
            <h1>{project.name}<span aria-hidden="true">.</span></h1>
            <p className="case-summary">{copy.summary}</p>
          </header>

          <figure className="case-figure">
            <div className="case-screen">
              <Image
                src={`/work/${project.slug}.webp`}
                alt={copy.alt}
                width={project.width}
                height={project.height}
                style={{ viewTransitionName: `case-image-${project.slug}` }}
                unoptimized
                preload
              />
            </div>
            <figcaption>{copy.caption}</figcaption>
          </figure>

          <div className="case-body">
            <aside className="case-stack" aria-label={t.technology}>
              <h2 className="eyebrow">{t.technology}</h2>
              <ul>
                {project.stack.map((tech) => <li key={tech}>{tech}</li>)}
              </ul>
            </aside>
            <div className="case-story">
              <section>
                <h2>{t.context}</h2>
                <p>{copy.context}</p>
              </section>
              <section>
                <h2>{t.implementation}</h2>
                <p>{copy.implementation}</p>
              </section>
              <section>
                <h2>{t.result}</h2>
                <p>{copy.result}</p>
                {project.external && (
                  <a className="button button-primary case-demo" href={project.external.url}>
                    {project.external.label[locale]} <span aria-hidden="true">↗</span>
                  </a>
                )}
              </section>
            </div>
          </div>
        </article>
        {next && <a className="case-next" href={`/${locale}/work/${next.slug}`}>
          <span>
            <span className="eyebrow">{t.next}</span>
            <strong>{next.name}</strong>
          </span>
          <span className="case-next-arrow" aria-hidden="true">→</span>
        </a>}
      </main>
      <Footer locale={locale} slug={project.slug} />
    </>
  );
}
