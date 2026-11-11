import Image from "next/image";
import { notFound } from "next/navigation";
import { Header, Footer } from "@/components/SiteChrome";
import { Glyph, type GlyphName } from "@/components/Glyph";
import { CrtArtwork } from "@/components/CrtArtwork";
import { MotionControl } from "@/components/PortfolioControls";
import { ProjectCardLink } from "@/components/ProjectCardLink";
import { StudioTerminal } from "@/components/StudioTerminal";
import { projects } from "@/data/projects";
import { isLocale } from "@/i18n/routing";

const content = {
  es: {
    role: "Antonio López Soult · Ingeniero frontend", city: "Sevilla, España", title: "Código con", accent: "carácter.",
    intro: "En Inditex desarrollo herramientas para aduanas y transporte. En Mercedes-Benz trabajé en el software que usan sus equipos para gestionar incidencias de producción.",
    workCta: "Ver proyectos", contactCta: "Hablemos", art: "Terminal de sobremesa retro con una montaña trazada en verde fósforo sobre la pantalla.",
    workLabel: "Desarrollo independiente", work: "Proyectos propios", caseLink: "Ver caso", clientIndex: "Trabajo para clientes",
    servicesLabel: "Servicios", services: "Desarrollo a medida",
    offers: [
      ["code", "Web y automatizaciones", "Desarrollo portales y paneles con React y Next.js. Conecto tus herramientas para automatizar tareas repetitivas, como pasar datos de un sistema a otro o enviar avisos."],
      ["mobile", "Producto móvil", "Llevo las tareas clave de tu producto al móvil con React Native, desde el primer flujo hasta una versión que puedas probar."],
      ["layers", "Evolución de frontend", "Modernizo interfaces existentes, separo funcionalidades y añado pruebas para que tu equipo pueda seguir desarrollando."],
    ],
    aboutLabel: "Sobre mí", about: "Antonio López Soult", bio: "Soy ingeniero de software en Sevilla. Me especializo en React, TypeScript y arquitecturas de microfrontends. Fuera de los proyectos de cliente, creé ConsultIA y he desarrollado aplicaciones para las rutas gastronómicas de Zahara de los Atunes.",
    cvGroup: "Descargar el currículum", cvEs: "CV en español", cvEn: "CV en inglés", experience: "Experiencia por cliente final", jobs: [
      ["inditex", "Inditex", "Senior Frontend Engineer", "Nov 2024 — actualidad", "En Customs Clearance e IOP Documentación lidero la arquitectura de microfrontends. Desarrollé la carga masiva de documentos de transporte, con subidas por bloques y validación de archivos."],
      ["mercedes-benz", "Mercedes-Benz", "Ingeniero de software · Frontend", "Jul 2022 — nov 2024", "En CaRT, la herramienta de gestión de incidencias industriales, llevé nuevas funciones desde la toma de requisitos hasta producción. Resolví cuellos de botella que ralentizaban la aplicación para usuarios de distintos países."],
      ["santander-aesa", "Santander Alemania y AESA", "Ingeniero de software · Frontend", "Ene 2018 — jul 2022", "Para Santander trabajé en Aleph, la aplicación de gestión de préstamos, y en portales de banca online. Para AESA participé en la migración de aplicaciones internas a React."],
    ],
  },
  en: {
    role: "Antonio López Soult · Frontend engineer", city: "Seville, Spain", title: "Code with", accent: "character.",
    intro: "I build customs and transport tools for Inditex. At Mercedes-Benz, I worked on the software that teams use to manage incidents on production lines.",
    workCta: "Explore my work", contactCta: "Let’s talk", art: "Vintage desktop terminal with a green phosphor wireframe mountain on its screen.",
    workLabel: "Independent development", work: "Selected projects", caseLink: "View case study", clientIndex: "Client work",
    servicesLabel: "Services", services: "Custom development",
    offers: [
      ["code", "Web apps and automation", "I build portals and dashboards with React and Next.js. I connect the tools you use to automate repetitive work, such as moving data between systems or sending notifications."],
      ["mobile", "Mobile products", "I bring the essential parts of your product to mobile with React Native, from the first user flow to a build you can try."],
      ["layers", "Frontend modernisation", "I modernise existing interfaces, untangle features and add tests so your team can keep shipping."],
    ],
    aboutLabel: "About me", about: "Antonio López Soult", bio: "I’m a software engineer in Seville specialising in React, TypeScript and microfrontend architecture. Alongside client work, I created ConsultIA and built apps for the food festivals in Zahara de los Atunes.",
    cvGroup: "Download a CV", cvEs: "Spanish CV", cvEn: "English CV", experience: "End-client experience", jobs: [
      ["inditex", "Inditex", "Senior Frontend Engineer", "Nov 2024 — present", "I lead the microfrontend architecture for Customs Clearance and IOP Documentación. I built the bulk document upload for transport teams, including chunked uploads and file validation."],
      ["mercedes-benz", "Mercedes-Benz", "Software Engineer · Frontend", "Jul 2022 — Nov 2024", "On CaRT, the industrial incident management tool, I took new features from requirements to production. I resolved bottlenecks that slowed down the application for users across countries."],
      ["santander-aesa", "Santander Germany and AESA", "Software Engineer · Frontend", "Jan 2018 — Jul 2022", "For Santander I worked on Aleph, its loan management app, and on online banking portals. For Spain’s aviation safety agency, AESA, I helped migrate internal applications to React."],
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
      <section className="hero photo-window" aria-labelledby="hero-title">
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
              <CrtArtwork alt={t.art} names={projects.map(project => project.name)} />
              <span className="cross cross-bl" aria-hidden="true"/><span className="cross cross-br" aria-hidden="true"/>
            </div>
            <figcaption><MotionControl locale={locale}/><StudioTerminal locale={locale} /></figcaption>
          </figure>
        </div>
        <nav className="shell client-index" aria-label={t.clientIndex}>
          <span>{t.clientIndex}</span>
          <a href="#inditex">Inditex <Glyph name="down" size={15}/></a>
          <a href="#mercedes-benz">Mercedes-Benz <Glyph name="down" size={15}/></a>
        </nav>
      </section>
      <section id="projects" className="project-sheet" aria-labelledby="projects-title"><div className="shell section-block">
        <span className="eyebrow"><i />{t.workLabel}</span>
        <h2 id="projects-title" className="section-title">{t.work}<span>.</span></h2>
        <div className="project-grid">{projects.map(project => <article className="project-card" key={project.slug}>
          <ProjectCardLink href={`/${locale}/work/${project.slug}`} label={`${t.caseLink} · ${project.name}`}>
            <div className={`project-art project-art-${project.slug}`}>
              <div className="shot-frame">
                {project.slug !== "consultia" && <div className="window-bar" aria-hidden="true"><i/><i/><i/></div>}
                <Image src={`/work/${project.slug}.webp`} alt={project[locale].alt} width={project.width} height={project.height}
                  style={{ viewTransitionName: `case-image-${project.slug}` }}
                  sizes="(max-width: 700px) 88vw, (max-width: 1000px) 44vw, 400px"/>
              </div>
              <span className="case-invitation" aria-hidden="true">{t.caseLink}<Glyph name="upRight" size={15}/></span>
            </div>
            <div className="project-body"><p className="project-category">{project[locale].category}</p>
              <h3>{project.name} <span className="card-link"><Glyph name="upRight" size={20} /></span></h3>
              <p className="project-summary">{project[locale].summary}</p>
            </div>
          </ProjectCardLink>
        </article>)}</div>
      </div></section>
      <section id="services" className="service-window photo-window" aria-labelledby="services-title"><div className="shell section-block service-layout">
        <div className="spread-heading"><span className="eyebrow"><i />{t.servicesLabel}</span>
          <h2 id="services-title" className="section-title">{t.services}<span>.</span></h2></div>
        <div className="service-grid">{t.offers.map(([icon, name, description]) => <article key={icon}>
          <span className="service-icon"><Glyph name={icon as GlyphName} size={26}/></span>
          <h3>{name}</h3><p>{description}</p>
        </article>)}</div>
      </div></section>
      <section id="about" className="career-sheet" aria-labelledby="about-title"><div className="shell section-block about-grid">
        <div className="spread-heading"><span className="eyebrow"><i />{t.aboutLabel}</span>
          <h2 id="about-title" className="section-title">{t.about}<span>.</span></h2>
          <p className="about-bio">{t.bio}</p>
          <div className="cv-downloads" role="group" aria-label={t.cvGroup}>
            <a className="button button-outline" href="/CV_ALS_ES.pdf" hrefLang="es" download>{t.cvEs}<Glyph name="download" size={15}/></a>
            <a className="button button-outline" href="/CV_ALS_EN.pdf" hrefLang="en" download>{t.cvEn}<Glyph name="download" size={15}/></a>
          </div>
        </div>
        <div className="experience"><h3>{t.experience}</h3>{t.jobs.map(([id, name, role, date, description]) => <article key={id} id={id}>
          <span>{date}</span><h4>{name}</h4><p className="client-role">{role}</p><p>{description}</p>
        </article>)}</div>
      </div></section>
    </main>
    <Footer locale={locale}/>
  </>;
}
