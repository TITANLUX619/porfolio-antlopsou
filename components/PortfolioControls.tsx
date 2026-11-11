"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/i18n/routing";
import { motionStorageKey, reducedMotionQuery } from "@/lib/motion";
import { Glyph } from "./Glyph";

export function MotionControl({ locale }: { locale: Locale }) {
  const es = locale === "es";
  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.motion === "on" ? "off" : "on";
    root.dataset.motion = next;
    try {
      const system = matchMedia(reducedMotionQuery).matches ? "off" : "on";
      if (next === system) localStorage.removeItem(motionStorageKey);
      else localStorage.setItem(motionStorageKey, next);
    } catch { /* The control works for this page even if storage is disabled. */ }
  }
  return <button type="button" className="motion-control" onClick={toggle}>
    <span className="motion-enable"><Glyph name="play" size={14}/>{es ? "Activar animaciones" : "Enable animations"}</span>
    <span className="motion-disable"><Glyph name="pause" size={14}/>{es ? "Pausar animaciones" : "Pause animations"}</span>
  </button>;
}

export function ThemeControl({ locale }: { locale: Locale }) {
  function toggle() {
    const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch { /* The switch also works without storage. */ }
  }
  return <button type="button" className="icon-control theme-control" onClick={toggle}>
    <span className="theme-sun"><Glyph name="sun" size={17} /><span className="sr-only">{locale === "es" ? "Activar tema claro" : "Use light theme"}</span></span>
    <span className="theme-moon"><Glyph name="moon" size={17} /><span className="sr-only">{locale === "es" ? "Activar tema oscuro" : "Use dark theme"}</span></span>
  </button>;
}

export function LocaleLinks({ locale, slug }: { locale: Locale; slug?: string }) {
  return <div className="langs" role="group" aria-label={locale === "es" ? "Idioma" : "Language"}>
    {(["es", "en"] as const).map(lang => {
      const url = `/${lang}${slug ? `/work/${slug}` : ""}`;
      return <a key={lang} href={url} hrefLang={lang} lang={lang} aria-label={lang === "es" ? "Español" : "English"}
        aria-current={locale === lang ? "page" : undefined}
        onClick={event => {
          event.currentTarget.href = url + window.location.hash;
          try { document.cookie = `NEXT_LOCALE=${lang}; Path=/; Max-Age=31536000; SameSite=Lax`; } catch { /* Browser privacy settings. */ }
        }}>{lang.toUpperCase()}</a>;
    })}
  </div>;
}

type NavLink = { href: string; label: string };
export function MobileNav({ links, locale }: { links: NavLink[]; locale: Locale }) {
  const details = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    function dismiss(event: PointerEvent | KeyboardEvent) {
      const element = details.current;
      if (!element?.open) return;
      if (event instanceof KeyboardEvent) {
        if (event.key !== "Escape") return;
        element.querySelector("summary")?.focus();
      } else if (element.contains(event.target as Node)) return;
      element.open = false;
    }
    document.addEventListener("keydown", dismiss);
    document.addEventListener("pointerdown", dismiss);
    return () => { document.removeEventListener("keydown", dismiss); document.removeEventListener("pointerdown", dismiss); };
  }, []);
  return <details className="mobile-menu" ref={details}>
    <summary className="icon-control" aria-label={locale === "es" ? "Menú de navegación" : "Navigation menu"}><Glyph name="menu" /><Glyph name="close" /></summary>
    <nav aria-label={locale === "es" ? "Navegación móvil" : "Mobile navigation"}>
      {links.map(link => <a key={link.href} href={link.href} onClick={() => { if (details.current) details.current.open = false; }}>{link.label}<Glyph name="right" size={16} /></a>)}
    </nav>
  </details>;
}

export function CopyEmail({ email, locale }: { email: string; locale: Locale }) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  async function copy() {
    try { await navigator.clipboard.writeText(email); setStatus("copied"); }
    catch { setStatus("error"); }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus("idle"), 4500);
  }
  const label = locale === "es" ? "Copiar correo" : "Copy email";
  return <span className="copy-wrap"><button type="button" className="copy-btn" aria-label={label} title={label} onClick={copy}>
    <Glyph name={status === "copied" ? "check" : "copy"} size={17} /></button>
    <span role="status" className="copy-status">{status === "copied" ? (locale === "es" ? "Copiado" : "Copied") : status === "error" ? (locale === "es" ? "Selecciona el correo para copiarlo." : "Select the address to copy it.") : ""}</span>
  </span>;
}
