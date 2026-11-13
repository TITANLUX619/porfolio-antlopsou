import type { Locale } from "@/i18n/routing";

type ProjectCopy = {
  category: string;
  summary: string;
  alt: string;
  caption: string;
  context: string;
  implementation: string;
  result: string;
};

type Project = Record<Locale, ProjectCopy> & {
  slug: string;
  name: string;
  stack: string[];
  width: number;
  height: number;
  preview: { src: string; width: number; height: number; alt: Record<Locale, string> };
  external?: { url: string; label: Record<Locale, string> };
};

export const projects: Project[] = [
  {
    slug: "consultia",
    name: "ConsultIA",
    stack: ["React Native", "Expo", "TypeScript", "Node.js"],
    width: 1440,
    height: 810,
    preview: {
      src: "/work/consultia-home.webp", width: 1440, height: 900,
      alt: {
        es: "Portada de ConsultIA con el mensaje «Menos cosas en la cabeza» y la vista de la app en un móvil.",
        en: "ConsultIA homepage with its Spanish headline and a phone showing the app’s home screen.",
      },
    },
    external: { url: "https://consultia-landing-beta.vercel.app/#demo", label: { es: "Ver la demo de ConsultIA", en: "Explore the ConsultIA demo" } },
    es: {
      category: "Producto propio · Salud digital",
      summary: "Aplicación móvil que reúne medicación, citas e informes para que pacientes y cuidadores puedan preparar una consulta.",
      alt: "Inicio de ConsultIA con acceso al asistente y a la próxima cita del perfil de demostración.",
      caption: "Vista de inicio del perfil ficticio de Alex en la demostración de ConsultIA.",
      context: "Preparar una visita médica suele exigir reunir información dispersa entre informes, calendarios y notas. Fundé ConsultIA para que el paciente o su cuidador pueda consultar esos antecedentes en un mismo lugar.",
      implementation: "Desarrollé la aplicación con React Native y Expo. Integré la extracción de datos de informes clínicos, un asistente que admite voz y texto y un modo cuidador para gestionar un perfil delegado.",
      result: "Antes de la cita se pueden revisar las tomas registradas, recuperar un informe y preparar preguntas. La demostración pública muestra este recorrido con datos ficticios.",
    },
    en: {
      category: "Independent product · Digital health",
      summary: "A mobile app that brings medication, appointments and reports together so patients and carers can prepare for a medical visit.",
      alt: "ConsultIA home screen showing the assistant and the demo profile’s next appointment.",
      caption: "The home screen for Alex, the fictional profile used in the ConsultIA demo.",
      context: "Preparing for a medical visit often means piecing together information from reports, calendars and notes. I founded ConsultIA to give patients and carers one place to review that history.",
      implementation: "I built the app with React Native and Expo. I added data extraction from clinical reports, a voice and text assistant, and a carer mode for managing a delegated profile.",
      result: "Ahead of an appointment, users can review logged doses, find a report and prepare questions. The public demo shows this workflow with fictional data.",
    },
  },
  {
    slug: "trento-consulting",
    name: "Trento Consulting",
    stack: ["Next.js", "TypeScript", "CSS Modules"],
    width: 1440,
    height: 900,
    preview: {
      src: "/work/trento-consulting.webp", width: 1440, height: 900,
      alt: {
        es: "Portada de Trento Consulting con el titular «Tu clínica, con visión de negocio» junto a la recepción de una clínica.",
        en: "Trento Consulting homepage with its consultancy headline alongside a clinic reception.",
      },
    },
    external: { url: "https://trentodesarrollo.es/", label: { es: "Visitar trentodesarrollo.es", en: "Visit trentodesarrollo.es" } },
    es: {
      category: "Web corporativa · Consultoría",
      summary: "Web de consultoría para clínicas estéticas con un simulador de margen por hora de tratamiento.",
      alt: "Portada de Trento Consulting con la recepción de una clínica y los accesos al método de trabajo y al contacto.",
      caption: "Portada de la web publicada de Trento Consulting.",
      context: "Trento asesora a clínicas estéticas sobre márgenes, equipo y crecimiento. Su web debía ayudar a la dirección de una clínica a entender el servicio y a identificar qué le interesaba consultar.",
      implementation: "Diseñé y desarrollé el sitio en Next.js. Organicé los servicios y el método de trabajo, y programé una calculadora que relaciona la tarifa, el coste variable y la duración de cada tratamiento.",
      result: "Una clínica puede comparar el margen por hora de distintos escenarios antes de contactar con la consultora. El recorrido funciona tanto en móvil como en escritorio.",
    },
    en: {
      category: "Corporate website · Consulting",
      summary: "A management consultancy website for aesthetic clinics, with a calculator for comparing treatment margins per hour.",
      alt: "Trento Consulting homepage with a clinic reception and links to the consultancy’s approach and contact details.",
      caption: "Homepage of the published Trento Consulting website.",
      context: "Trento advises aesthetic clinics on margins, staffing and growth. Clinic directors needed to understand the services and decide which business question to bring to a first conversation.",
      implementation: "I designed and built the site in Next.js. I organised the services and the consultancy’s approach, and developed a calculator that takes a treatment’s fee, variable cost and duration.",
      result: "A clinic director can compare hourly margins across several scenarios before contacting the consultancy. The same workflow is available on mobile and desktop.",
    },
  },
];
