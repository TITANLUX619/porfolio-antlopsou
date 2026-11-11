"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { usePreviewPointer } from "@/hooks/usePreviewPointer";
import "@/app/crt-art.css";

export function CrtArtwork({ alt, names }: { alt: string; names: string[] }) {
  const frame = usePreviewPointer<HTMLSpanElement>();
  const [tapped, setTapped] = useState(false);
  const touchTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const id = useId();
  useEffect(() => () => clearTimeout(touchTimer.current), []);

  function showOnTap() {
    setTapped(true);
    clearTimeout(touchTimer.current);
    touchTimer.current = setTimeout(() => setTapped(false), 3200);
  }

  return <span className="crt-art" data-tapped={tapped ? "" : undefined} ref={frame}
    onPointerUp={event => { if (event.pointerType === "touch") showOnTap(); }}>
    <Image className="hero-terminal" src="/art/terminal.webp" width={1152} height={864} preload alt={alt}
      sizes="(max-width: 750px) 92vw, (max-width: 1400px) 48vw, 630px" />
    <svg className="crt-glass" viewBox="0 0 1152 864" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id={id + "-glass"}>
          <path d="M343 152Q369 131 435 131Q611 128 703 144Q743 149 743 196L735 429Q733 483 701 488Q526 495 336 472Q303 467 303 422Q300 260 325 176Z"/>
        </clipPath>
        <clipPath id={id + "-command"}>
          <rect className="crt-type-mask" x="0" y="23" width="247" height="39"/>
        </clipPath>
        <radialGradient id={id + "-phosphor"} cx=".4" cy=".42" r=".78">
          <stop stopColor="#243e24"/><stop offset=".73" stopColor="#0d1e14"/><stop offset="1" stopColor="#07110b"/>
        </radialGradient>
        <linearGradient id={id + "-beam"} x2="0" y2="1">
          <stop stopColor="#e2ffa5" stopOpacity="0"/><stop offset=".83" stopColor="#e2ffa5" stopOpacity=".38"/>
          <stop offset="1" stopColor="#e2ffa5" stopOpacity="0"/>
        </linearGradient>
        <pattern id={id + "-lines"} width="8" height="6" patternUnits="userSpaceOnUse">
          <path d="M0 0h8" stroke="#041108" strokeWidth="1.2" opacity=".26"/>
        </pattern>
      </defs>
      <g clipPath={`url(#${id}-glass)`}>
        <g className="crt-session">
          <rect x="294" y="122" width="461" height="382" fill={`url(#${id}-phosphor)`}/>
          <g transform="matrix(1 .035 -.039 1 351 187)" fontFamily="monospace">
            <text fontSize="22" fill="#a6cd83">antlopsou.dev</text>
            <path d="M0 15h348" stroke="#527748" strokeWidth="2"/>
            <g clipPath={`url(#${id}-command)`}>
              <text y="54" fill="#efffc7" fontSize="30" textLength="242" lengthAdjust="spacingAndGlyphs">$ ls projects</text>
            </g>
            {names.map((name, index) => <text className="crt-entry" key={name} y={103 + index * 45} fill="#c7ff83" fontSize="36"
              style={{ animationDelay: `${.47 + index * .16}s` }}>{name}/</text>)}
            <g className="crt-prompt" transform={`translate(0 ${115 + names.length * 45})`}>
              <text fill="#a6cd83" fontSize="30">&gt;</text><rect className="crt-cursor" x="27" y="-22" width="16" height="26" fill="#d7ff9a"/>
            </g>
          </g>
          <rect x="294" y="122" width="461" height="382" fill={`url(#${id}-lines)`}/>
        </g>
        <rect className="crt-boot" x="290" y="64" width="470" height="68" fill={`url(#${id}-beam)`}/>
      </g>
    </svg>
  </span>;
}
