"use client";

import { useEffect, useRef, useState } from "react";
import { usePreviewPointer } from "@/hooks/usePreviewPointer";
import "@/app/workstation.css";

export function WorkstationArtwork({ alt, names }: { alt: string; names: string[] }) {
  const frame = usePreviewPointer<HTMLSpanElement>();
  const [tapped, setTapped] = useState(false);
  const touchTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(touchTimer.current), []);

  function showOnTap() {
    clearTimeout(touchTimer.current);
    setTapped(true);
    touchTimer.current = setTimeout(() => setTapped(false), 3200);
  }

  return (
    <span className="workstation-art" ref={frame} data-tapped={tapped ? "" : undefined}
      onPointerUp={event => { if (event.pointerType === "touch") showOnTap(); }}>
      <span className="workstation-model">
        <picture>
          <source type="image/webp" srcSet="/art/terminal-modern-640.webp 640w, /art/terminal-modern.webp 1200w"
            sizes="(max-width: 520px) calc(100vw - 40px), (max-width: 750px) 480px, (max-width: 1450px) 43vw, 620px" />
          <img src="/art/terminal-modern.webp" width={1200} height={900} alt={alt} fetchPriority="high" />
        </picture>
        <svg className="workstation-screen" viewBox="0 0 1448 1086" aria-hidden="true" focusable="false">
          {/* Keep the pixels on the glass in both responsive image sizes. */}
          <g transform="matrix(1 .008 -.064 1 254 153)">
            <svg width="806" height="474" overflow="hidden" fontFamily="ui-monospace, Consolas, monospace">
              <circle cx="37" cy="42" r="6" fill="#bef26e" />
              <text x="57" y="52" fontSize="31" fill="#d5e4db">antlopsou.dev</text>
              <path d="M28 75h745" stroke="#899f94" strokeOpacity=".48" strokeWidth="2" />
              <g className="screen-landscape">
                <image href="/art/terminal-landscape.svg" x="16" y="89" width="774" height="290" />
                <path d="m43 402 14 12-14 12" fill="none" stroke="#bdf275" strokeWidth="5" />
                <path className="screen-caret" d="M68 427h25" stroke="#bdf275" strokeWidth="5" />
              </g>
              <g className="screen-directory">
                <text x="36" y="147" fontSize="38" fill="#bdf275">&gt; ls projects</text>
                {names.map((name, index) => (
                  <text key={name} className="workstation-project" x="38" y={228 + index * 72}
                    fontSize="49" fill="#eff6f0" style={{ animationDelay: `${index * 65}ms` }}>
                    <tspan fill="#93b6aa">./</tspan>{name}
                  </text>
                ))}
              </g>
            </svg>
          </g>
        </svg>
      </span>
    </span>
  );
}
