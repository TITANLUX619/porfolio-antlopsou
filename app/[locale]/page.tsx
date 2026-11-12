import Image from "next/image";
import { notFound } from "next/navigation";
import { Header, Footer } from "@/components/SiteChrome";
import { Glyph, type GlyphName } from "@/components/Glyph";
import { PortfolioEntrance } from "@/components/PortfolioEntrance";
import { SectionReveals } from "@/components/SectionReveals";
import { ProjectCardLink } from "@/components/ProjectCardLink";
import { StudioTerminal } from "@/components/StudioTerminal";
import { projects } from "@/data/projects";
import { isLocale } from "@/i18n/routing";

const clientMarks = {
  inditex: "inditex.svg",
  "mercedes-benz": "mercedes.svg",
  santander: "santander.svg",
  aesa: "aesa.png",
} as const;

type ClientId = keyof typeof clientMarks;

function ClientName({ client, name }: { client: ClientId; name: string }) {
  return (
    <>
      <span
        aria-hidden="true"
        className={`client-mark client-mark--${client}`}
        style={{ maskImage: `url("/assets/${clientMarks[client]}")` }}
      />
      <span className={client === "inditex" ? "sr-only wordmark-name" : undefined}>{name}</span>
    </>
  );
}

function ClientExperience({ client, name, role, period, description }: {
  client: ClientId;
  name: string;
  role: string;
  period?: string;
  description: string;
}) {
  return (
    <article id={client}>
      <div data-enter-from="right">
        {period && <span className="experience-date">{period}</span>}
        <h4 className="client-heading">
          <ClientName client={client} name={name} />
        </h4>
        <p className="client-role">{role}</p>
        <p>{description}</p>
      </div>
    </article>
  );
}

const content = {
  es: {
    role: "Antonio López Soult · Ingeniero frontend", city: "Sevilla, España", title: "Código con", accent: "carácter.",
    intro: "Desarrollo aplicaciones web y móviles a medida. Conecto sistemas para que los equipos no tengan que introducir los mismos datos dos veces y modernizo herramientas que ya están en producción.",
    projectsCta: "Ver proyectos", contactCta: "Hablemos",
    projectsLabel: "Casos de estudio", projectsTitle: "Proyectos", caseLink: "Ver caso", clientIndex: "Trabajo para clientes",
    servicesLabel: "Servicios", services: "Desarrollo a medida",
    offers: [
      ["code", "Aplicaciones web y automatización", "Desarrollo portales y herramientas internas. Integro la captura de datos, las validaciones y los avisos en un mismo proceso para que el equipo pueda concentrarse en las excepciones."],
      ["mobile", "Desarrollo móvil", "Diseño y desarrollo aplicaciones con React Native. Empiezo por las tareas esenciales y preparo una versión que se pueda probar en un dispositivo antes de ampliar el alcance."],
      ["layers", "Modernización de frontend", "Reviso la arquitectura de aplicaciones en producción, identifico cuellos de botella y sustituyo módulos por etapas. Las pruebas cubren los recorridos que el equipo necesita mantener operativos."],
    ],
    aboutLabel: "Sobre mí", about: "Antonio López Soult", bio: "Soy ingeniero de software en Sevilla, especializado en React y TypeScript. En logística, industria y banca he trabajado desde la definición de requisitos hasta la puesta en producción. Diseño interfaces que los equipos puedan mantener y ampliar durante años.",
    cvGroup: "Descargar el currículum", cvEs: "CV en español", cvEn: "CV en inglés", experience: "Experiencia por cliente final", jobs: [
      ["inditex", "Inditex", "Senior Frontend Engineer", "Nov 2024 — actualidad", "Lidero la arquitectura de microfrontends en Customs Clearance e IOP Documentación. Desarrollo interfaces para la gestión de partidas arancelarias y documentos de transporte, y establezco criterios comunes de TypeScript y pruebas para ambos proyectos."],
      ["mercedes-benz", "Mercedes-Benz", "Ingeniero de software · Frontend", "Jul 2022 — nov 2024", "Desarrollé funcionalidades de CaRT, la aplicación con la que los equipos de fábrica gestionan incidencias de producción. Me ocupé de los requisitos, la implementación y la resolución de problemas de rendimiento que afectaban a usuarios de varios países."],
    ],
    consultingPeriod: "Etapa de consultoría · ene 2018 — jul 2022",
    consultingClients: [
      ["santander", "Santander Alemania", "Ingeniero de software · Banca online", "Trabajé en Aleph, el sistema de gestión de préstamos, y en los portales de banca online. Participé en la separación de módulos del frontend para que pudieran evolucionar de forma independiente."],
      ["aesa", "AESA", "Ingeniero de software · Aviación civil", "Participé en la modernización de aplicaciones internas de la Agencia Estatal de Seguridad Aérea mediante la migración de sus interfaces a React."],
    ],
  },
  en: {
    role: "Antonio López Soult · Frontend engineer", city: "Seville, Spain", title: "Code with", accent: "character.",
    intro: "I build custom web and mobile applications. I connect systems so teams don’t have to enter the same information twice, and modernise software they already rely on.",
    projectsCta: "View projects", contactCta: "Let’s talk",
    projectsLabel: "Case studies", projectsTitle: "Projects", caseLink: "View case study", clientIndex: "Client work",
    servicesLabel: "Services", services: "Custom development",
    offers: [
      ["code", "Web applications and automation", "I build portals and internal tools. I connect data entry, validation and notifications in a single workflow so teams can spend their time on the exceptions."],
      ["mobile", "Mobile development", "I design and build apps with React Native. I start with the tasks people perform most often and deliver a version they can test on a device before we expand the scope."],
      ["layers", "Frontend modernisation", "I review the architecture of applications in production, address bottlenecks and replace modules in stages. I write tests around the workflows that need to remain available throughout."],
    ],
    aboutLabel: "About me", about: "Antonio López Soult", bio: "I’m a software engineer based in Seville, specialising in React and TypeScript. I’ve taken software from requirements to production in logistics, manufacturing and banking. I design interfaces that teams can maintain and extend for years.",
    cvGroup: "Download a CV", cvEs: "Spanish CV", cvEn: "English CV", experience: "Client experience", jobs: [
      ["inditex", "Inditex", "Senior Frontend Engineer", "Nov 2024 — present", "I lead frontend architecture for Customs Clearance and IOP Documentación. I build interfaces for tariff classifications and transport documents, and establish shared TypeScript and testing practices across both projects."],
      ["mercedes-benz", "Mercedes-Benz", "Software Engineer · Frontend", "Jul 2022 — Nov 2024", "I developed features for CaRT, the application factory teams use to manage incidents on production lines. My work covered requirements, implementation and performance issues affecting users in several countries."],
    ],
    consultingPeriod: "Consulting period · Jan 2018 — Jul 2022",
    consultingClients: [
      ["santander", "Santander Germany", "Software Engineer · Online banking", "I worked on Aleph, the loan management system, and the online banking portals. I helped separate frontend modules so they could be developed independently."],
      ["aesa", "AESA", "Software Engineer · Civil aviation", "I helped modernise internal applications at Spain’s aviation safety agency by migrating their interfaces to React."],
    ],
  },
} as const;

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = content[locale];
  const clients = [...t.jobs, ...t.consultingClients];
  const caseIndex = projects.map(project => ({
    name: project.name, slug: project.slug,
    terms: `${project[locale].category} ${project[locale].summary} ${project.stack.join(" ")}`,
  }));

  return <PortfolioEntrance locale={locale}>
    <Header locale={locale} />
    <main id="main" tabIndex={-1}>
      <section className="hero photo-window" aria-labelledby="hero-title">
        <div className="shell hero-inner">
          <div className="hero-text">
            <p className="eyebrow hero-kicker"><i />{t.role}</p>
            <h1 id="hero-title"><span>{t.title}</span><br /><em>{t.accent}</em></h1>
          </div>
          <div className="hero-details">
            <p className="hero-intro">{t.intro}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">{t.projectsCta}<Glyph name="down" size={18}/></a>
              <a className="text-link" href="#contact">{t.contactCta}<Glyph name="upRight" size={16} /></a>
            </div>
            <p className="hero-location"><Glyph name="pin" size={14} />{t.city}</p>
          </div>
        </div>
        <nav className="shell client-index" aria-label={t.clientIndex}>
          <span>{t.clientIndex}</span>
          <ul>
            {clients.map(([id, name]) => (
              <li key={id}>
                <a href={`#${id}`}><ClientName client={id} name={name} /><Glyph name="down" size={15} /></a>
              </li>
            ))}
          </ul>
        </nav>
      </section>
      <section id="services" className="service-sheet" aria-labelledby="services-title"><div className="shell section-block service-layout">
        <div className="spread-heading">
          <div data-enter-from="left">
            <span className="eyebrow"><i />{t.servicesLabel}</span>
            <h2 id="services-title" className="section-title">{t.services}<span>.</span></h2>
          </div>
        </div>
        <div className="service-grid">{t.offers.map(([icon, name, description]) => <article key={icon}>
          <div className="service-copy" data-enter-from="right">
            <span className="service-icon"><Glyph name={icon as GlyphName} size={26}/></span>
            <h3>{name}</h3><p>{description}</p>
          </div>
        </article>)}</div>
      </div></section>
      <section id="projects" className="project-window photo-window" aria-labelledby="projects-title"><div className="shell section-block">
        <span className="eyebrow"><i />{t.projectsLabel}</span>
        <h2 id="projects-title" className="section-title">{t.projectsTitle}<span aria-hidden="true">.</span></h2>
        <div className="project-grid">{projects.map(project => <article className="project-card" key={project.slug}>
          <ProjectCardLink href={`/${locale}/work/${project.slug}`} label={`${t.caseLink} · ${project.name}`}>
            <div className={`project-art project-art-${project.slug}`}>
              <div className="shot-frame">
                {project.visual === "website" && <div className="window-bar" aria-hidden="true"><i/><i/><i/></div>}
                <Image src={`/work/${project.slug}.webp`} alt={project[locale].alt} width={project.width} height={project.height}
                  style={{ viewTransitionName: `case-image-${project.slug}` }}
                  sizes="(max-width: 750px) 86vw, (max-width: 1280px) 42vw, 540px"/>
              </div>
              <span className="case-invitation" aria-hidden="true">{t.caseLink}<Glyph name="upRight" size={15}/></span>
            </div>
            <div className="project-body"><p className="project-category">{project[locale].category}</p>
              <h3>{project.name} <span className="card-link"><Glyph name="upRight" size={20} /></span></h3>
              <p className="project-summary">{project[locale].summary}</p>
            </div>
          </ProjectCardLink>
          {project.external && <a className="case-public-link" href={project.external.url}>{project.external.label[locale]} <Glyph name="upRight" size={14}/></a>}
        </article>)}</div>
      </div></section>
      <section id="about" className="career-sheet" aria-labelledby="about-title"><div className="shell section-block about-grid">
        <div className="spread-heading">
          <div data-enter-from="left">
            <span className="eyebrow"><i />{t.aboutLabel}</span>
            <h2 id="about-title" className="section-title">{t.about}<span>.</span></h2>
          </div>
          <p className="about-bio" data-enter-from="left">{t.bio}</p>
          <div className="cv-downloads" data-enter-from="left" role="group" aria-label={t.cvGroup}>
            <a className="button button-outline" href="/CV_ALS_ES.pdf" hrefLang="es" download>{t.cvEs}<Glyph name="download" size={15}/></a>
            <a className="button button-outline" href="/CV_ALS_EN.pdf" hrefLang="en" download>{t.cvEn}<Glyph name="download" size={15}/></a>
          </div>
        </div>
        <div className="experience"><h3 data-enter-from="right">{t.experience}</h3>
          {t.jobs.map(([id, name, role, date, description]) =>
            <ClientExperience key={id} client={id} name={name} role={role} period={date} description={description}/>)}
          <div className="consulting-clients" id="santander-aesa" role="group" aria-labelledby="consulting-period">
            <span className="experience-date" id="consulting-period" data-enter-from="right">{t.consultingPeriod}</span>
            {t.consultingClients.map(([id, name, role, description]) =>
              <ClientExperience key={id} client={id} name={name} role={role} description={description}/>)}
          </div>
        </div>
      </div></section>
    </main>
    <SectionReveals />
    <Footer locale={locale}><StudioTerminal locale={locale} cases={caseIndex}/></Footer>
  </PortfolioEntrance>;
}
