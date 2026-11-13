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

const trentoLandingAlt = {
  es: "Portada de Trento Desarrollo con el nombre del grupo junto a un cuaderno de cubierta negra y letras doradas.",
  en: "Trento Desarrollo homepage with the group’s name beside a black book with gold lettering.",
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
    slug: "trento-desarrollo",
    name: "Trento Desarrollo",
    stack: ["Next.js", "TypeScript", "CSS Modules"],
    width: 1440,
    height: 900,
    preview: {
      src: "/work/trento-desarrollo.webp", width: 1440, height: 900,
      alt: trentoLandingAlt,
    },
    external: { url: "https://www.trentodesarrollo.es/", label: { es: "Visitar trentodesarrollo.es", en: "Visit trentodesarrollo.es" } },
    es: {
      category: "Web corporativa · Grupo empresarial",
      summary: "La web del grupo reúne Consulting, Investing e Inmobiliario en un cuaderno interactivo.",
      alt: trentoLandingAlt.es,
      caption: "Al abrir el cuaderno de la portada se despliega el índice de departamentos.",
      context: "Trento Desarrollo nació con la consultoría para clínicas y amplió su alcance a la inversión y al sector inmobiliario. La web debía reflejar esa estructura y dar a cada departamento un acceso propio bajo la marca del grupo.",
      implementation: "Diseñé y desarrollé la portada en Next.js como un cuaderno que se puede hojear. El índice permite saltar a cualquier departamento y las páginas responden al ratón, al teclado y a los gestos táctiles.",
      result: "Cada departamento tiene una página que se puede compartir por separado. Consulting da acceso a los servicios y cuadernos para clínicas. Las páginas de Investing e Inmobiliario presentan las dos áreas que el grupo está preparando.",
    },
    en: {
      category: "Corporate website · Business group",
      summary: "An interactive book introduces the group’s Consulting, Investing and Inmobiliario divisions.",
      alt: trentoLandingAlt.en,
      caption: "The book on the homepage opens to a contents page for all three divisions.",
      context: "Trento Desarrollo brings together consulting for aesthetic clinics, investment and real estate. Its website needed to explain each division’s work and give it a distinct place within the group.",
      implementation: "I designed and built the Next.js homepage as a book visitors can leaf through. They can jump to a division from the contents page or turn the pages with a mouse, keyboard or swipe.",
      result: "Each division has a page visitors can share directly. Consulting offers services and guides for clinics. Investing and Inmobiliario introduce the group’s plans for investment and real estate.",
    },
  },
];
