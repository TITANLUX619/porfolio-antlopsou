"use client";

import Image from "next/image";
import { useEffect, useId, useRef } from "react";
import "@/app/crt-art.css";

export function CrtArtwork({ alt }: { alt: string }) {
  const frame = useRef<HTMLSpanElement>(null);
  const id = useId();

  useEffect(() => {
    const element = frame.current;
    if (!element) return;
    const motion = matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    let animation = 0;
    let bounds: DOMRect | null = null;
    let x = 0;
    let y = 0;

    function reset() {
      cancelAnimationFrame(animation);
      animation = 0;
      bounds = null;
      element!.style.removeProperty("--crt-shift");
    }
    function follow(event: PointerEvent) {
      if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;
      bounds ??= element!.getBoundingClientRect();
      x = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1));
      y = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1));
      if (animation) return;
      animation = requestAnimationFrame(() => {
        element!.style.setProperty("--crt-shift", `${(x * 3).toFixed(2)}px ${(y * 2).toFixed(2)}px`);
        animation = 0;
      });
    }
    function disconnect() {
      element!.removeEventListener("pointermove", follow);
      element!.removeEventListener("pointerleave", reset);
      reset();
    }
    function configure() {
      disconnect();
      if (!motion.matches) return;
      element!.addEventListener("pointermove", follow, { passive: true });
      element!.addEventListener("pointerleave", reset);
    }
    configure();
    motion.addEventListener("change", configure);
    return () => {
      motion.removeEventListener("change", configure);
      disconnect();
    };
  }, []);

  return <span className="crt-art" ref={frame}>
    <Image className="hero-terminal" src="/art/terminal.webp" width={1152} height={864} preload alt={alt}
      sizes="(max-width: 750px) 92vw, (max-width: 1400px) 48vw, 630px" />
    <svg className="crt-glass" viewBox="0 0 1152 864" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id={id + "-glass"}>
          <path d="M345 154Q369 134 435 134Q611 130 700 147Q738 152 738 196L731 427Q729 476 701 483Q526 491 339 467Q307 461 308 421Q303 264 329 177Z"/>
        </clipPath>
        <linearGradient id={id + "-glow"} x2="0" y2="1" gradientUnits="objectBoundingBox">
          <stop stopColor="#d1ff84" stopOpacity="0"/><stop offset=".72" stopColor="#d1ff84" stopOpacity=".08"/>
          <stop offset=".86" stopColor="#d1ff84" stopOpacity=".22"/><stop offset="1" stopColor="#d1ff84" stopOpacity="0"/>
        </linearGradient>
      </defs>
      <g clipPath={`url(#${id}-glass)`}>
        <rect className="crt-sweep" x="300" y="92" width="445" height="40" fill={`url(#${id}-glow)`}/>
      </g>
    </svg>
  </span>;
}
