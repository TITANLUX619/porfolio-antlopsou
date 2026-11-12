"use client";

import Image from "next/image";
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
        <Image src="/assets/op1.jpg" alt={alt} width={1024} height={1024} preload
          sizes="(max-width: 520px) 78vw, (max-width: 750px) 390px, (max-width: 1350px) 36vw, 490px" />
        <svg className="workstation-screen" viewBox="0 0 1024 1024" aria-hidden="true" focusable="false">
          {/* The overlay follows the glass in the original square illustration. */}
          <g transform="matrix(1 -.524 0 1 74 363)">
            <rect width="504" height="190" fill="#84c6ff" fillOpacity=".16" />
            <rect width="324" height="190" fill="#102433" />
            <path d="M0 47h324M324 0v190" fill="none" stroke="#507282" strokeWidth="2" />
            <g fontFamily="monospace">
              <text x="20" y="32" fontSize="22" fill="#aee3ed">antlopsou.dev</text>
              {names.map((name, index) => (
                <text key={name} className="workstation-project" x="20" y={84 + index * 43}
                  fontSize="35" fill="#e8f6f7" style={{ animationDelay: `${index * 75}ms` }}>{name}</text>
              ))}
            </g>
          </g>
        </svg>
      </span>
    </span>
  );
}
