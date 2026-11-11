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
  demo?: string;
};

export const projects: Project[] = [
  {
    slug: "consultia",
    name: "ConsultIA",
    stack: ["React Native", "Expo", "TypeScript"],
    width: 1440,
    height: 810,
    demo: "https://consultia-landing-beta.vercel.app/",
    es: {
      category: "Salud digital · App móvil",
      summary: "Una app que reúne medicación, citas y preguntas para preparar la próxima consulta.",
      alt: "Pantalla de inicio de ConsultIA con el asistente y la próxima cita del perfil de demostración Alex.",
      caption: "Inicio de la app Android con un perfil de demostración y datos ficticios.",
      context: "Una pregunta para el médico puede acabar en las notas del móvil, la cita en el calendario y la pauta de un medicamento en otra parte. Creé ConsultIA para que esa información se pueda recuperar en un mismo lugar.",
      implementation: "Construí la app con React Native y Expo. Desde el inicio se puede abrir el asistente, añadir un informe o consultar la siguiente cita. El calendario y el historial permiten revisar las tomas registradas.",
      result: "La demostración recorre la app con Alex, un perfil ficticio. Permite ver cómo se consulta la agenda y cómo se prepara una pregunta antes de la visita.",
    },
    en: {
      category: "Digital health · Mobile app",
      summary: "A mobile app for keeping medication, appointments and questions for the next visit in one place.",
      alt: "ConsultIA home screen showing the assistant and the next appointment for Alex, the demo profile.",
      caption: "Android home screen with a demo profile and fictional data.",
      context: "A question for a doctor can end up in a notes app, the appointment in a calendar and the medication schedule somewhere else. I built ConsultIA to put that information within reach in one place.",
      implementation: "I built the app with React Native and Expo. The home screen links to the assistant, a report upload and the next appointment. The calendar and history let people look back at doses they have logged.",
      result: "The walkthrough follows Alex, a fictional profile, and shows how to check the schedule and prepare a question ahead of a visit.",
    },
  },
  {
    slug: "kollab",
    name: "Kollab",
    stack: ["Next.js", "Lexical", "Liveblocks", "Clerk"],
    width: 1144,
    height: 630,
    es: {
      category: "Colaboración · Aplicación web",
      summary: "Un editor compartido para escribir en equipo y comentar directamente en el documento.",
      alt: "Editor de Kollab con la barra de formato, el botón para compartir y el panel lateral de comentarios.",
      caption: "El editor separa el espacio de escritura del hilo de comentarios.",
      context: "Revisar un borrador por correo obliga a comparar versiones y averiguar a qué párrafo se refiere cada comentario. En Kollab, quienes escriben y quienes revisan trabajan sobre el mismo documento.",
      implementation: "Integré el editor de texto de Lexical con las salas de Liveblocks para sincronizar cambios y comentarios. Clerk identifica a los participantes y el panel para compartir permite invitar a una persona con permisos de lectura o edición.",
      result: "El autor puede dar formato al texto, compartir el borrador y recibir comentarios en el panel lateral. El equipo conserva la conversación junto a la versión que está revisando.",
    },
    en: {
      category: "Collaboration · Web app",
      summary: "A shared editor for writing together and leaving feedback directly in a document.",
      alt: "Kollab editor with formatting controls, a share button and a comment panel beside the document.",
      caption: "The editor keeps the writing area and the comment thread side by side.",
      context: "Reviewing a draft over email means comparing versions and working out which paragraph each comment refers to. In Kollab, writers and reviewers work on the same document.",
      implementation: "I connected the Lexical rich-text editor to Liveblocks rooms to sync edits and comments. Clerk identifies participants, and the sharing panel lets the owner invite readers or editors.",
      result: "An author can format the draft, share it and receive feedback in the side panel. The conversation stays alongside the version the team is reviewing.",
    },
  },
  {
    slug: "meridian",
    name: "Meridian",
    stack: ["Next.js", "Plaid", "Appwrite"],
    width: 1200,
    height: 555,
    es: {
      category: "Fintech · Aplicación web",
      summary: "Un panel financiero para consultar saldos y movimientos de varias cuentas desde una sola vista.",
      alt: "Panel de Meridian con dos cuentas de prueba, saldo total y pestañas de movimientos por cuenta.",
      caption: "Vista del prototipo con las cuentas de prueba de Plaid.",
      context: "Para saber cuánto dinero hay entre varias cuentas hace falta una vista de conjunto. Para entender un movimiento concreto, hace falta el detalle de su cuenta. Diseñé el recorrido de Meridian alrededor de esas dos consultas.",
      implementation: "Construí el panel en Next.js, conecté las cuentas de prueba con Plaid e integré Appwrite para gestionar sesiones y referencias de cuentas. Las pestañas sitúan los movimientos de la cuenta seleccionada bajo el saldo global.",
      result: "El prototipo muestra dos cuentas de prueba, el saldo agregado y el historial por cuenta. Se puede pasar del resumen al detalle sin perder de vista qué cuenta se está consultando.",
    },
    en: {
      category: "Fintech · Web app",
      summary: "A finance dashboard that brings balances and transactions from several accounts into a single view.",
      alt: "Meridian dashboard showing two test accounts, the combined balance and account-specific transaction tabs.",
      caption: "Prototype dashboard populated with Plaid test accounts.",
      context: "To see how much money is spread across accounts, people need an overview. To understand an individual transaction, they need the detail for one account. I designed Meridian around those two questions.",
      implementation: "I built the dashboard in Next.js, connected test accounts through Plaid and integrated Appwrite for sessions and account references. Tabs place transactions for the selected account directly below the combined balance.",
      result: "The prototype shows two test accounts, their combined balance and individual histories. Moving from the overview into the detail keeps the selected account visible.",
    },
  },
];
