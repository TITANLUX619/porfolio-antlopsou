"use client";

import { useEffect, useRef } from "react";

/** Track the actual pointer on hybrids as well as on mouse-only devices. */
export function usePreviewPointer<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const target = element;
    let frame = 0;
    let clientX = 0;
    let clientY = 0;
    function draw() {
      frame = 0;
      const box = target.getBoundingClientRect();
      if (!box.width || !box.height) return;
      const x = Math.max(-1, Math.min(1, 2 * (clientX - box.left) / box.width - 1));
      const y = Math.max(-1, Math.min(1, 2 * (clientY - box.top) / box.height - 1));
      target.style.setProperty("--pointer-x", x.toFixed(3));
      target.style.setProperty("--pointer-y", y.toFixed(3));
    }
    function point(event: PointerEvent) {
      if (event.pointerType === "touch") return;
      if (!target.hasAttribute("data-pointing")) target.dataset.pointing = "";
      if (document.documentElement.dataset.motion !== "on") return;
      clientX = event.clientX;
      clientY = event.clientY;
      if (!frame) frame = requestAnimationFrame(draw);
    }
    function leave() {
      cancelAnimationFrame(frame);
      frame = 0;
      delete target.dataset.pointing;
      target.style.removeProperty("--pointer-x");
      target.style.removeProperty("--pointer-y");
    }
    target.addEventListener("pointerenter", point, { passive: true });
    target.addEventListener("pointermove", point, { passive: true });
    target.addEventListener("pointerleave", leave);
    target.addEventListener("pointercancel", leave);
    return () => {
      leave();
      target.removeEventListener("pointerenter", point);
      target.removeEventListener("pointermove", point);
      target.removeEventListener("pointerleave", leave);
      target.removeEventListener("pointercancel", leave);
    };
  }, []);
  return ref;
}
