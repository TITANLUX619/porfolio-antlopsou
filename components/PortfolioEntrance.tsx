import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { CSSProperties, ReactNode } from "react";
import type { Locale } from "@/i18n/routing";
import { studioMonitor } from "@/lib/entrance-camera";
import { visitMotionStorageKey } from "@/lib/motion";
import { Glyph } from "./Glyph";
import "@/app/entrance.css";

// Ship the switch and its camera together in the static HTML, before hydration.
const monitorScript = readFileSync(join(process.cwd(), "lib/monitor-entry.js"), "utf8");

export function PortfolioEntrance({ children, locale }: { children: ReactNode; locale: Locale }) {
  const es = locale === "es";
  return <>
    <div className="entrance-stage" hidden aria-hidden="true">
      <div className="entrance-device-slot" style={studioMonitor.slotStyle}>
        <span className="entrance-glass-bounds" style={studioMonitor.glassStyle} />
        <div className="entrance-device" style={{ transformOrigin: studioMonitor.transformOrigin }}>
          <picture>
            <img id="entrance-photo" data-src="/art/estudio-frontal.webp"
              data-srcset="/art/estudio-frontal-768.webp 768w, /art/estudio-frontal.webp 1536w"
              sizes="(max-width: 700px) min(100vw, 103svh), min(78vw, 103svh, 940px)"
              style={{ "--glass-cutout": studioMonitor.frameMask } as CSSProperties}
              width={studioMonitor.width} height={studioMonitor.height} alt="" fetchPriority="high" suppressHydrationWarning />
          </picture>
        </div>
      </div>
    </div>
    <button id="entrance-power" type="button" className="entrance-power" data-visit-motion-key={visitMotionStorageKey} hidden>
      <Glyph name="power" size={30} />
      <span className="power-ready">{es ? "Encender" : "Power on"}</span>
      <span className="power-with-motion">{es ? "Encender con animaciones" : "Power on with animations"}</span>
      <span className="power-starting">{es ? "Encendiendo…" : "Starting…"}</span>
    </button>
    <a href="#main" className="entrance-skip" hidden>
      <span className="skip-intro">{es ? "Saltar intro" : "Skip intro"}</span>
      <span className="skip-motion">{es ? "Entrar sin animaciones" : "Enter without animations"}</span>
      <Glyph name="right" size={15} />
    </a>
    <script dangerouslySetInnerHTML={{ __html: monitorScript }} />
    <div className="entrance-aperture" suppressHydrationWarning><div className="entrance-viewport">
      {children}
    </div></div>
  </>;
}
