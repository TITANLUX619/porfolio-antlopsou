import type { ReactNode } from "react";
import { contactEmail } from "@/data/contact";
import type { Locale } from "@/i18n/routing";
import { CopyEmail, LocaleLinks, MobileNav, ThemeControl } from "./PortfolioControls";
import { Glyph } from "./Glyph";

type ChromeProps = { locale: Locale; slug?: string };

function Brand({ locale }: { locale: Locale }) {
  return <a className="brand" href={`/${locale}`} aria-label={locale === "es" ? "antlopsou.dev, inicio" : "antlopsou.dev, home"}>
    <span className="brand-mark"><Glyph name="terminal" size={19} /></span><span>antlopsou<span className="brand-dot">.dev</span></span>
  </a>;
}

export function Header({ locale, slug }: ChromeProps) {
  const es = locale === "es";
  const base = slug ? `/${locale}` : "";
  const links = [
    { href: base + "#services", label: es ? "Servicios" : "Services" },
    { href: base + "#projects", label: es ? "Proyectos" : "Projects" },
    { href: base + "#about", label: es ? "Sobre mí" : "About" },
  ];
  const contact = { href: "#contact", label: es ? "Hablemos" : "Let’s talk" };
  return <header className="site-header">
    <a className="skip-link" href="#main">{es ? "Saltar al contenido" : "Skip to content"}</a>
    <div className="shell header-inner">
      <Brand locale={locale} />
      <nav className="desktop-nav" aria-label={es ? "Navegación principal" : "Main navigation"}>{links.map(link =>
        <a key={link.href} href={link.href}>{link.label}</a>)}</nav>
      <div className="header-actions">
        <LocaleLinks locale={locale} slug={slug} /><ThemeControl locale={locale} />
        <a className="header-cta" href={contact.href}>{contact.label}<Glyph name="upRight" size={15} /></a>
        <MobileNav locale={locale} links={[...links, contact]} />
      </div>
    </div>
  </header>;
}

export function Footer({ locale, children }: ChromeProps & { children?: ReactNode }) {
  const es = locale === "es";
  return <footer id="contact" className="site-footer photo-window">
    <div className="shell">
      <div className="contact-row">
        <div><span className="eyebrow"><i />{es ? "Contacto" : "Contact"}</span>
          <h2>{es ? "Hablemos de" : "Let’s discuss"}<br /><em>{es ? "tu proyecto." : "your project."}</em></h2></div>
        <div className="contact-intro">
          <p>{es ? "Cuéntame qué proceso necesitas mejorar, quién utilizará la solución y qué plazos manejas. Con ese contexto podemos definir el alcance de una primera entrega." : "Tell me which process you need to improve, who will use the software and what timeline you have in mind. From there we can define what a first release should cover."}</p>
          <a className="button button-primary" href={`mailto:${contactEmail}?subject=${encodeURIComponent(es ? "Consulta sobre un proyecto" : "Project enquiry")}`}>{es ? "Escríbeme" : "Email me"} <Glyph name="upRight" size={18} /></a>
          <div className="email-line"><a href={`mailto:${contactEmail}`}>{contactEmail}</a><CopyEmail email={contactEmail} locale={locale} /></div>
        </div>
      </div>
      {children && <div className="footer-tools">{children}</div>}
      <div className="footer-base"><Brand locale={locale} /><span>© {new Date().getUTCFullYear()} Antonio López Soult</span>
        <div><a href="https://github.com/TITANLUX619">GitHub <Glyph name="upRight" size={13} /></a>
          <a href="https://www.linkedin.com/in/antlopsou/">LinkedIn <Glyph name="upRight" size={13} /></a></div>
      </div>
    </div>
  </footer>;
}
