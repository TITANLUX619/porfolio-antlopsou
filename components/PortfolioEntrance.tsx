import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { ReactNode } from "react";
import type { Locale } from "@/i18n/routing";
import { Glyph } from "./Glyph";
import "@/app/entrance.css";

// The command works as soon as the browser receives the terminal's HTML.
const entranceScript = readFileSync(join(process.cwd(), "lib/terminal-entry.js"), "utf8");

export function PortfolioEntrance({ children, locale }: { children: ReactNode; locale: Locale }) {
  const es = locale === "es";
  return <>
    <div className="entrance-stage">
      <div className="entrance-terminal">
        <div className="entrance-window">
          <div className="entrance-titlebar" aria-hidden="true">
            <span className="entrance-lights"><i /><i /><i /></span>
            <span className="entrance-title"><Glyph name="terminal" size={14} />Terminal</span>
          </div>
          <button id="entrance-tap" type="button" className="entrance-tap"
            aria-labelledby="entrance-command" aria-describedby="entrance-hint" />
          <div className="entrance-pane">
            <div className="entrance-transcript">
              <div className="entrance-line">
                <span className="entrance-prompt" aria-hidden="true">$</span>
                <code id="entrance-command"><span>open</span>{" "}antlopsou.dev</code>
                <span className="entrance-caret" aria-hidden="true" />
              </div>
              <div className="entrance-hint" id="entrance-hint">
                <span className="entrance-key-hint" tabIndex={0} role="group" aria-labelledby="entrance-command"
                  aria-describedby="entrance-key-help" aria-keyshortcuts="Enter">
                  <span id="entrance-key-help">
                    {es ? "Pulsa " : "Press "}<kbd>{es ? "Intro" : "Enter"} <span aria-hidden="true">↵</span></kbd>
                    {es ? " para entrar" : " to enter"}
                  </span>
                </span>
                <span className="entrance-touch-hint">{es ? "Toca para entrar" : "Tap to enter"}</span>
              </div>
              <div className="entrance-output" aria-hidden="true">
                {(es ? ["cabecera", "portada", "servicios"] : ["header", "home", "services"]).map(part => (
                  <div className="entrance-output-line" key={part}><span>render</span>{"  "}{part}</div>
                ))}
              </div>
            </div>
            <script dangerouslySetInnerHTML={{ __html: entranceScript }} />
            <div className="entrance-aperture" suppressHydrationWarning>
              <div className="entrance-viewport">
                <div className="entrance-preview">{children}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>;
}
