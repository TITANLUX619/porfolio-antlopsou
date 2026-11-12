"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import type { Locale } from "@/i18n/routing";
import { entranceCamera, studioMonitor } from "@/lib/entrance-camera";
import { Glyph } from "./Glyph";
import "@/app/entrance.css";

// The switch works as soon as the HTML arrives, even before React is ready.
// There is no idle timeout. Only a visitor who pressed power can start the camera.
const prepareMonitor = `(() => {
  const root = document.documentElement;
  if (root.dataset.entrance !== "standby") return;
  const photo = document.getElementById("entrance-photo");
  photo.srcset = photo.dataset.srcset;
  photo.src = photo.dataset.src;
  document.getElementById("entrance-power").addEventListener("click", () => {
    if (root.dataset.entrance !== "standby") return;
    const enter = () => {
      delete root.dataset.entrance;
      document.getElementById("main")?.focus({ preventScroll: true });
    };
    if (root.dataset.motion !== "on" || !photo.animate || !window.ResizeObserver || !CSS.supports("clip-path", "inset(0)")) {
      enter();
      return;
    }
    root.dataset.entrance = "starting";
    // A failed bundle or stalled artwork must not strand someone who pressed power.
    setTimeout(() => { if (root.dataset.entrance === "starting") enter(); }, 4500);
  }, { once: true });
})();`;

export function PortfolioEntrance({ children, locale }: { children: ReactNode; locale: Locale }) {
  const device = useRef<HTMLDivElement>(null);
  const image = useRef<HTMLImageElement>(null);
  const aperture = useRef<HTMLDivElement>(null);
  const page = useRef<HTMLDivElement>(null);
  const power = useRef<HTMLButtonElement>(null);
  const skip = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (!root.dataset.entrance || !window.ResizeObserver) return;
    const machine = device.current!, photo = image.current!, frame = aperture.current!, site = page.current!;
    const slot = machine.parentElement!;
    const firstPanelTitle = site.querySelector<HTMLElement>("main > .hero + section .section-title");
    const events = new AbortController();
    const options = { signal: events.signal };
    const animations: Animation[] = [];
    let layoutFrame = 0;
    let visibleSince = 0;

    function release(focus: boolean) {
      if (events.signal.aborted) return;
      events.abort();
      observer.disconnect();
      sizes.disconnect();
      cancelAnimationFrame(layoutFrame);
      animations.forEach(animation => animation.cancel());
      frame.inert = false;
      delete root.dataset.entrance;
      if (focus) document.getElementById("main")?.focus({ preventScroll: true });
    }
    function queueLayout() {
      const state = root.dataset.entrance;
      if ((state !== "starting" && state !== "playing") || events.signal.aborted || document.hidden || layoutFrame) return;
      if (root.dataset.motion !== "on" || (photo.complete && !photo.naturalWidth)) { release(true); return; }
      if (!photo.naturalWidth) return;
      layoutFrame = requestAnimationFrame(() => {
        layoutFrame = 0;
        if (events.signal.aborted || document.hidden || !root.dataset.entrance) return;
        // The slot never scales, even when the device inside it is mid-zoom.
        const bounds = slot.getBoundingClientRect();
        if (!bounds.width || !frame.clientWidth || !frame.clientHeight) return;
        try {
          const pageBox = site.getBoundingClientRect();
          const depth = firstPanelTitle
            ? (firstPanelTitle.getBoundingClientRect().bottom - pageBox.top) * site.offsetWidth / pageBox.width + 28
            : frame.clientHeight;
          const keys = entranceCamera(bounds, frame.clientWidth, frame.clientHeight, depth);
          const tracks = [keys.hardware, keys.aperture, keys.page];
          if (animations.length) {
            animations.forEach((animation, i) => (animation.effect as KeyframeEffect).setKeyframes(tracks[i]));
            return;
          }
          const keyboard = power.current?.matches(":focus-visible");
          window.scrollTo({ top: 0, behavior: "instant" });
          frame.inert = true;
          // Show the real, themed homepage in the small monitor before moving it.
          const timing = { duration: 1580, delay: 560, easing: "cubic-bezier(.53,.04,.24,1)", fill: "both" } as const;
          [machine, frame, site].forEach((target, i) => animations.push(target.animate(tracks[i], timing)));
          root.dataset.entrance = "playing";
          if (keyboard) skip.current?.focus({ preventScroll: true });
          visibleSince = performance.now();
          animations[0].finished.then(() => release(true), () => release(false));
        } catch { release(true); }
      });
    }
    const observer = new MutationObserver(() => {
      if (!root.dataset.entrance) release(false);
      else if (root.dataset.entrance !== "standby" && root.dataset.motion !== "on") release(true);
      else if (root.dataset.entrance === "starting") queueLayout();
    });
    const sizes = new ResizeObserver(queueLayout);
    function arm() {
      if (!root.dataset.entrance) return;
      observer.observe(root, { attributes: true, attributeFilter: ["data-motion", "data-entrance"] });
      sizes.observe(slot);
      sizes.observe(frame);
      photo.addEventListener("load", queueLayout, options);
      photo.addEventListener("error", queueLayout, options);
      skip.current?.addEventListener("click", event => { event.preventDefault(); release(true); }, options);
      window.addEventListener("keydown", event => {
        if (root.dataset.entrance !== "playing") return;
        if (event.key === "Tab") {
          if (document.activeElement === skip.current) release(true);
          else { event.preventDefault(); skip.current?.focus({ preventScroll: true }); }
        } else if (["Escape", "PageDown", "PageUp", "ArrowDown", "ArrowUp", "End", "Home"].includes(event.key)) release(true);
      }, options);
      for (const type of ["pagehide", "hashchange"]) {
        window.addEventListener(type, () => release(false), { ...options, passive: true });
      }
      window.addEventListener("wheel", event => {
        if (root.dataset.entrance === "playing" && performance.now() - visibleSince >= 560 &&
          (event.deltaMode !== WheelEvent.DOM_DELTA_PIXEL || Math.abs(event.deltaY) >= 24)) release(true);
      }, { ...options, passive: true });
      window.addEventListener("touchmove", () => {
        if (root.dataset.entrance === "playing" && performance.now() - visibleSince >= 560) release(true);
      }, { ...options, passive: true });
      document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
          cancelAnimationFrame(layoutFrame);
          layoutFrame = 0;
          animations.forEach(animation => animation.pause());
        } else if (animations.length) {
          visibleSince = performance.now();
          animations.forEach(animation => animation.play());
          queueLayout();
        } else queueLayout();
      }, options);
      queueLayout(); // Also handles a press made before hydration.
    }
    let armed = false;
    const initialFrame = requestAnimationFrame(() => { armed = true; arm(); });
    return () => {
      cancelAnimationFrame(initialFrame);
      if (armed) release(false);
    };
  }, []);

  const es = locale === "es";
  return <>
    <div className="entrance-stage" hidden aria-hidden="true">
      <div className="entrance-device-slot" style={studioMonitor.slotStyle}>
        <div className="entrance-device" ref={device} style={{ transformOrigin: studioMonitor.transformOrigin }}>
          <picture>
            <img id="entrance-photo" ref={image} data-src="/art/estudio-frontal.webp"
              data-srcset="/art/estudio-frontal-768.webp 768w, /art/estudio-frontal.webp 1536w"
              sizes="(max-width: 700px) min(100vw, 103svh), min(78vw, 103svh, 940px)"
              style={{ "--glass-cutout": studioMonitor.frameMask } as CSSProperties}
              width={studioMonitor.width} height={studioMonitor.height} alt="" fetchPriority="high" suppressHydrationWarning />
          </picture>
        </div>
      </div>
    </div>
    <button id="entrance-power" type="button" className="entrance-power" ref={power} hidden
      aria-label={es ? "Encender el ordenador y abrir el portfolio" : "Power on the computer and open the portfolio"}>
      <Glyph name="power" size={30} />
      <span className="power-ready">{es ? "Encender" : "Power on"}</span>
      <span className="power-starting">{es ? "Encendiendo…" : "Starting…"}</span>
    </button>
    <script dangerouslySetInnerHTML={{ __html: prepareMonitor }} />
    <a href="#main" className="entrance-skip" ref={skip} hidden>{es ? "Saltar intro" : "Skip intro"}<Glyph name="right" size={15} /></a>
    <div className="entrance-aperture" ref={aperture}><div className="entrance-viewport" ref={page}>
      {children}
    </div></div>
  </>;
}
