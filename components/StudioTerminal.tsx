"use client";

import { useId, useRef, useState } from "react";
import type { Locale } from "@/i18n/routing";
import { projects } from "@/data/projects";
import { Glyph } from "./Glyph";
import "@/app/terminal.css";

function searchable(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

export function StudioTerminal({ locale }: { locale: Locale }) {
  const es = locale === "es";
  const titleId = useId();
  const searchId = useId();
  const trigger = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const firstResult = useRef<HTMLAnchorElement>(null);
  const [query, setQuery] = useState("");
  const actions = [
    ...projects.map((project) => ({
      label: project.name,
      kind: es ? "Proyecto" : "Project",
      href: `/${locale}/work/${project.slug}`,
      terms: `${project[locale].category} ${project.stack.join(" ")}`,
      download: false,
    })),
    {
      label: es ? "Descargar CV" : "Download CV",
      kind: "PDF",
      href: `/CV_ALS_${locale.toUpperCase()}.pdf`,
      terms: "currículum curriculum vitae resume experience experiencia",
      download: true,
    },
    {
      label: es ? "Contactar con Antonio" : "Contact Antonio",
      kind: es ? "Contacto" : "Contact",
      href: "#contact",
      terms: "email correo mail hablemos contratar hire get in touch",
      download: false,
    },
  ];
  const needle = searchable(query);
  const results = actions.filter((action) =>
    searchable(`${action.label} ${action.kind} ${action.terms}`).includes(needle)
  );

  function open() {
    dialog.current?.showModal();
    input.current?.focus();
  }

  function dismiss() {
    dialog.current?.close();
    trigger.current?.focus({ preventScroll: true });
  }

  return (
    <>
      <button ref={trigger} type="button" className="studio-launch" aria-haspopup="dialog" onClick={open}>
        {es ? "Abrir terminal" : "Open terminal"} <Glyph name="upRight" size={12} />
      </button>
      <dialog
        ref={dialog}
        className="studio-dialog"
        aria-labelledby={titleId}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            event.currentTarget.close();
          }
        }}
        onClose={() => setQuery("")}
        onCancel={(event) => { event.preventDefault(); dismiss(); }}
        onClick={(event) => {
          if (event.target === event.currentTarget) dismiss();
        }}
      >
        <div className="studio-window">
          <div className="studio-bar">
            <h2 id={titleId}><Glyph name="terminal" size={18} />{es ? "Terminal del portfolio" : "Portfolio terminal"}</h2>
            <button type="button" className="studio-close" onClick={dismiss}
              aria-label={es ? "Cerrar terminal" : "Close terminal"}>
              <Glyph name="close" size={18} />
            </button>
          </div>
          <form className="studio-search" role="search" onSubmit={(event) => {
            event.preventDefault();
            firstResult.current?.click();
          }}>
            <label htmlFor={searchId} className="sr-only">{es ? "Buscar proyectos o acciones" : "Search projects or actions"}</label>
            <span aria-hidden="true">›</span>
            <input id={searchId} ref={input} type="search" value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={es ? "Buscar proyectos o acciones…" : "Search projects or actions…"}
              autoComplete="off" spellCheck={false} enterKeyHint="go" />
          </form>
          <p className="sr-only" role="status">
            {es ? `Resultados: ${results.length}` : `Results: ${results.length}`}
          </p>
          {results.length ? (
            <ul className="studio-results">
              {results.map((action, index) => (
                <li key={action.href}>
                  <a ref={index === 0 ? firstResult : undefined} href={action.href}
                    download={action.download || undefined} onClick={() => dialog.current?.close()}>
                    <span>{action.label}</span>
                    <small>{action.kind}</small>
                    <Glyph name={action.download ? "download" : "right"} size={14} />
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="studio-empty">{es ? "Ningún resultado. Prueba con otro término." : "No matches. Try another search."}</p>
          )}
        </div>
      </dialog>
    </>
  );
}
