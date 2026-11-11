import Image from "next/image";
import { notFound } from "next/navigation";
import { Header, Footer } from "@/components/SiteChrome";
import { Glyph, type GlyphName } from "@/components/Glyph";
import { StackStrip } from "@/components/StackStrip";
import { CrtArtwork } from "@/components/CrtArtwork";
import { StudioTerminal } from "@/components/StudioTerminal";
import { projects } from "@/data/projects";
import { isLocale } from "@/i18n/routing";

const content = {
  es: {
    role: "Ingeniero de software", city: "Sevilla, España", title: "Código con", accent: "carácter.",
    intro: "Soy Antonio López Soult, desarrollador sénior de React y Next.js. Construyo aplicaciones web y móviles que hacen más sencillo el trabajo de las personas.",
    workCta: "Ver proyectos", contactCta: "Hablemos", art: "Terminal de sobremesa retro con una montaña trazada en verde fósforo sobre la pantalla.",
    artLabel: "Estudio digital", workLabel: "Portfolio", work: "Trabajo seleccionado", caseLink: "Ver caso",
    servicesLabel: "Servicios", services: "Cómo puedo ayudarte",
    offers: [
      ["code", "Web y automatizaciones", "Desarrollo portales y paneles con React y Next.js. Conecto tus herramientas para automatizar tareas repetitivas, como pasar datos de un sistema a otro o enviar avisos."],
      ["mobile", "Producto móvil", "Llevo las tareas clave de tu producto al móvil con React Native, desde el primer flujo hasta una versión que puedas probar."],
      ["layers", "Evolución de frontend", "Modernizo interfaces existentes, separo funcionalidades y añado pruebas para que tu equipo pueda seguir desarrollando."],
    ],
    aboutLabel: "Sobre mí", about: "Antonio López Soult", bio: "Soy ingeniero de software en Sevilla. He trabajado tanto en las herramientas internas que sostienen una línea de producción como en las aplicaciones que alguien lleva en el bolsillo.",
    cv: "Descargar CV", experience: "Experiencia", jobs: [
      ["Capgemini", "Ingeniería de software", "Desarrollo y mantenimiento de una herramienta de gestión de incidencias en cadenas de producción internacionales."],
      ["Babel", "Desarrollo de producto", "Portales de banca online y gestión de préstamos para Santander Alemania. Migración de aplicaciones internas para AESA."],
      ["Proyectos propios y freelance", "Web y móvil", "Aplicaciones para las rutas gastronómicas del Atún y del Retinto en Zahara de los Atunes."],
    ],
  },
  en: {
    role: "Software engineer", city: "Seville, Spain", title: "Code with", accent: "character.",
    intro: "I’m Antonio López Soult, a senior React and Next.js developer. I build web and mobile apps that make people’s day-to-day work easier.",
    workCta: "Explore my work", contactCta: "Let’s talk", art: "Vintage desktop terminal with a green phosphor wireframe mountain on its screen.",
    artLabel: "Digital studio", workLabel: "Portfolio", work: "Selected work", caseLink: "View case study",
    servicesLabel: "Services", services: "How I can help",
    offers: [
      ["code", "Web apps and automation", "I build portals and dashboards with React and Next.js. I connect the tools you use to automate repetitive work, such as moving data between systems or sending notifications."],
      ["mobile", "Mobile products", "I bring the essential parts of your product to mobile with React Native, from the first user flow to a build you can try."],
      ["layers", "Frontend modernisation", "I modernise existing interfaces, untangle features and add tests so your team can keep shipping."],
    ],
    aboutLabel: "About me", about: "Antonio López Soult", bio: "I’m a software engineer based in Seville. My work ranges from the internal tools that keep a production line running to the apps people carry in their pockets.",
    cv: "Download CV", experience: "Experience", jobs: [
      ["Capgemini", "Software engineering", "Developed and maintained an incident management tool for international production lines."],
      ["Babel", "Product development", "Online banking portals and loan management for Santander Germany. Migration of internal applications for Spain’s aviation safety agency, AESA."],
      ["Independent and freelance work", "Web and mobile", "Apps for the Atún and Retinto food festivals in Zahara de los Atunes, Spain."],
    ],
  },
} as const;

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = content[locale];

  return <>
    <Header locale={locale} />
    <main id="main" tabIndex={-1}>
      <section className="hero" aria-labelledby="hero-title">
        <div className="shell hero-inner">
          <div className="hero-text">
            <p className="eyebrow hero-kicker"><i />{t.role}</p>
            <h1 id="hero-title"><span>{t.title}</span><br /><em>{t.accent}</em></h1>
            <p className="hero-intro">{t.intro}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">{t.workCta}<Glyph name="down" size={18}/></a>
              <a className="text-link" href="#contact">{t.contactCta}<Glyph name="upRight" size={16} /></a>
            </div>
            <p className="hero-location"><Glyph name="pin" size={14} />{t.city}</p>
          </div>
          <figure className="hero-figure">
            <div className="figure-surface">
              <div className="art-dots" aria-hidden="true" />
              <span className="cross cross-tl" aria-hidden="true"/><span className="cross cross-tr" aria-hidden="true"/>
              <CrtArtwork alt={t.art} />
              <span className="cross cross-bl" aria-hidden="true"/><span className="cross cross-br" aria-hidden="true"/>
            </div>
            <figcaption><span className="art-caption"><b aria-hidden="true"/> {t.artLabel}</span><StudioTerminal locale={locale} /></figcaption>
          </figure>
        </div>
      </section>
      <StackStrip spanish={locale === "es"} />
      <section id="projects" className="shell section-block" aria-labelledby="projects-title">
        <span className="eyebrow"><i />{t.workLabel}</span>
        <h2 id="projects-title" className="section-title">{t.work}<span>.</span></h2>
        <div className="project-grid">{projects.map(project => <article className="project-card" key={project.slug}>
          <a href={`/${locale}/work/${project.slug}`} aria-label={`${t.caseLink} · ${project.name}`}>
            <div className={`project-art project-art-${project.slug}`}>
              <div className="shot-frame">
                {project.slug !== "consultia" && <div className="window-bar" aria-hidden="true"><i/><i/><i/></div>}
                <Image src={`/work/${project.slug}.webp`} alt={project[locale].alt} width={project.width} height={project.height}
                  style={{ viewTransitionName: `case-image-${project.slug}` }}
                  sizes="(max-width: 700px) 88vw, (max-width: 1000px) 44vw, 400px"/>
              </div>
            </div>
            <div className="project-body"><p className="project-category">{project[locale].category}</p>
              <h3>{project.name} <span className="card-link"><Glyph name="upRight" size={20} /></span></h3>
              <p className="project-summary">{project[locale].summary}</p>
            </div>
          </a>
        </article>)}</div>
      </section>
      <section id="services" className="section-band" aria-labelledby="services-title"><div className="shell section-block">
        <span className="eyebrow"><i />{t.servicesLabel}</span>
        <h2 id="services-title" className="section-title">{t.services}<span>.</span></h2>
        <div className="service-grid">{t.offers.map(([icon, name, description]) => <article key={icon}>
          <span className="service-icon"><Glyph name={icon as GlyphName} size={26}/></span>
          <h3>{name}</h3><p>{description}</p>
        </article>)}</div>
      </div></section>
      <section id="about" className="shell section-block about-grid" aria-labelledby="about-title">
        <div><span className="eyebrow"><i />{t.aboutLabel}</span>
          <h2 id="about-title" className="section-title">{t.about}<span>.</span></h2>
          <p className="about-bio">{t.bio}</p>
          <a className="button button-outline" href={locale === "es" ? "/CV_ALS_ES.pdf" : "/CV_ALS_EN.pdf"} download>
            {t.cv}<small>PDF</small><Glyph name="download" size={16}/></a>
        </div>
        <div className="experience"><h3>{t.experience}</h3>{t.jobs.map(([name, role, description]) => <article key={name}>
          <span>{role}</span><h4>{name}</h4><p>{description}</p>
        </article>)}</div>
      </section>
    </main>
    <Footer locale={locale}/>
  </>;
}
