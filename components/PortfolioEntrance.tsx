"use client";

import { useEffect, useRef, type ReactNode } from "react";
import type { Locale } from "@/i18n/routing";
import { entranceCamera } from "@/lib/entrance-camera";
import { entranceSessionKey } from "@/lib/motion";
import { Glyph } from "./Glyph";
import "@/app/entrance.css";

// Begin loading the responsive artwork as the homepage HTML is parsed, but
// only for a visit that will actually play the intro.
const firstPhoto = `if (document.documentElement.dataset.entrance === "pending") {
  const photo = document.getElementById("entrance-photo");
  photo.srcset = photo.dataset.srcset;
  photo.src = photo.dataset.src;
}`;

export function PortfolioEntrance({ children, locale }: { children: ReactNode; locale: Locale }) {
  const device = useRef<HTMLDivElement>(null);
  const image = useRef<HTMLImageElement>(null);
  const aperture = useRef<HTMLDivElement>(null);
  const page = useRef<HTMLDivElement>(null);
  const skip = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const machine = device.current!, photo = image.current!, frame = aperture.current!, site = page.current!;
    const replay = document.getElementById("entrance-replay");
    let stop: (() => void) | undefined;
    if (!machine.animate || !photo.decode || !CSS.supports("clip-path", "polygon(0 0, 100% 0, 0 100%)")) {
      delete root.dataset.entrance;
      return;
    }

    function play(explicit = false) {
      const initialMotion = root.dataset.motion;
      if (stop || (!explicit && initialMotion !== "on")) return;
      const returnToReplay = explicit && document.activeElement === replay;
      window.scrollTo({ top: 0, behavior: "instant" });
      root.dataset.entrance = "pending";
      const events = new AbortController();
      const options = { signal: events.signal };
      const animations: Animation[] = [];
      const finish = () => {
        if (events.signal.aborted) return;
        const moveFocus = document.activeElement === skip.current;
        events.abort();
        clearTimeout(deadline);
        observer.disconnect();
        animations.forEach(animation => animation.cancel());
        delete root.dataset.entrance;
        frame.inert = false;
        stop = undefined;
        if (moveFocus) document.getElementById("main")?.focus({ preventScroll: true });
        else if (returnToReplay) replay?.focus({ preventScroll: true });
      };
      stop = finish;
      // A missing image or a stalled browser must never hold the page closed.
      let deadline = window.setTimeout(finish, 1400);
      const observer = new MutationObserver(() => {
        if (!root.dataset.entrance || (initialMotion === "on" && root.dataset.motion === "off")) finish();
      });
      observer.observe(root, { attributes: true, attributeFilter: ["data-motion", "data-entrance"] });
      frame.inert = true;
      try { sessionStorage.setItem(entranceSessionKey, "1"); } catch { /* Storage is optional. */ }
      skip.current?.addEventListener("click", event => { event.preventDefault(); finish(); }, options);
      window.addEventListener("keydown", event => {
        if (event.key === "Tab") {
          if (document.activeElement === skip.current) finish();
          else { event.preventDefault(); skip.current?.focus({ preventScroll: true }); }
          return;
        }
        if (["Escape", "PageDown", "PageUp", "ArrowDown", "ArrowUp", "End", "Home"].includes(event.key)) finish();
      }, options);
      for (const event of ["wheel", "touchmove", "resize", "pagehide", "hashchange"]) {
        window.addEventListener(event, finish, { ...options, passive: true });
      }
      document.addEventListener("visibilitychange", () => { if (document.hidden) finish(); }, options);

      if (!photo.hasAttribute("src")) {
        photo.srcset = photo.dataset.srcset!;
        photo.src = photo.dataset.src!;
      }
      photo.decode().then(() => {
        if (events.signal.aborted) return;
        const bounds = machine.getBoundingClientRect();
        if (!bounds.width || !frame.clientWidth || !frame.clientHeight) return finish();
        const keys = entranceCamera(bounds, frame.clientWidth, frame.clientHeight);
        const timing = { duration: 1580, delay: 430, easing: "cubic-bezier(.53,.04,.24,1)", fill: "both" } as const;
        animations.push(machine.animate(keys.hardware, timing), frame.animate(keys.aperture, timing), site.animate(keys.page, timing));
        root.dataset.entrance = "playing";
        clearTimeout(deadline);
        deadline = window.setTimeout(finish, timing.duration + timing.delay + 250);
        animations[0].finished.then(finish, () => {});
      }).catch(finish);
    }

    const initialFrame = requestAnimationFrame(() => { if (root.dataset.entrance === "pending") play(); });
    const replayOnce = () => play(true);
    replay?.addEventListener("click", replayOnce);
    replay?.setAttribute("data-ready", "");
    return () => {
      cancelAnimationFrame(initialFrame);
      stop?.();
      replay?.removeEventListener("click", replayOnce);
      replay?.removeAttribute("data-ready");
    };
  }, []);

  return <>
    <div className="entrance-stage" hidden aria-hidden="true">
      <div className="entrance-device" ref={device}>
        <picture>
          <img id="entrance-photo" ref={image} data-src="/art/terminal-modern.webp"
            data-srcset="/art/terminal-modern-640.webp 640w, /art/terminal-modern.webp 1200w"
            sizes="(max-width: 700px) 94vw, min(82vw, 84vh, 780px)"
            width={1200} height={900} alt="" fetchPriority="high" suppressHydrationWarning />
        </picture>
        <script dangerouslySetInnerHTML={{ __html: firstPhoto }} />
      </div>
    </div>
    <a href="#main" className="entrance-skip" ref={skip} hidden>{locale === "es" ? "Saltar intro" : "Skip intro"}<Glyph name="right" size={15} /></a>
    <div className="entrance-aperture" ref={aperture}><div className="entrance-viewport" ref={page}>
      <div className="site-backdrop" aria-hidden="true" />{children}
    </div></div>
  </>;
}
