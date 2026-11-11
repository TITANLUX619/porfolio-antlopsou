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
    { href: base + "#projects", label: es ? "Proyectos" : "Work" },
    { href: base + "#services", label: es ? "Servicios" : "Services" },
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

export function Footer({ locale }: ChromeProps) {
  const es = locale === "es";
  const email = "antlopsou@gmail.com";
  return <footer id="contact" className="site-footer">
    <div className="shell">
      <div className="contact-row">
        <div><span className="eyebrow"><i />{es ? "Contacto" : "Contact"}</span>
          <h2>{es ? "¿Qué tienes" : "What do you"}<br /><em>{es ? "en mente?" : "have in mind?"}</em></h2></div>
        <div className="contact-intro">
          <p>{es ? "Cuéntame qué quieres construir, para quién y en qué punto estás. Podemos empezar por ahí." : "Tell me what you’re building, who it’s for and how far you’ve got. We can start there."}</p>
          <a className="button button-primary" href={`mailto:${email}?subject=${encodeURIComponent(es ? "Hablemos de un proyecto" : "Let’s talk about a project")}`}>{es ? "Escríbeme" : "Email me"} <Glyph name="upRight" size={18} /></a>
          <div className="email-line"><a href={`mailto:${email}`}>{email}</a><CopyEmail email={email} locale={locale} /></div>
        </div>
      </div>
      <div className="footer-base"><Brand locale={locale} /><span>© {new Date().getUTCFullYear()} Antonio López Soult</span>
        <div><a href="https://github.com/TITANLUX619">GitHub <Glyph name="upRight" size={13} /></a>
          <a href="https://www.linkedin.com/in/antlopsou/">LinkedIn <Glyph name="upRight" size={13} /></a></div>
      </div>
    </div>
  </footer>;
}
