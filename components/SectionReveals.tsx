"use client";

import { useEffect } from "react";

// Only browsers without native view timelines need a scroll sampler. Its
// paused CSS animation uses exactly the same keyframes as the native timeline.
export function SectionReveals() {
  useEffect(() => {
    if (CSS.supports("animation-timeline", "view(block 0px)")) return;

    const root = document.documentElement;
    const page = document.querySelector<HTMLElement>(".entrance-viewport")!;
    const sections = Array.from(document.querySelectorAll<HTMLElement>("#services, #about"), section => {
      const heading = section.querySelector<HTMLElement>(".spread-heading")!;
      return {
        section, heading, rows: heading.nextElementSibling!,
        items: Array.from(section.querySelectorAll<HTMLElement>("[data-enter-from]"), item => ({
          item, inHeading: heading.contains(item),
        })),
      };
    });
    const previous = new Map<HTMLElement, string>();
    let frame = 0;

    function sample() {
      frame = 0;
      const height = root.clientHeight;
      // In the monitor the camera scales and translates the page. Scroll
      // progress belongs to the page in CSS pixels, not its image in the glass.
      const inEntrance = root.hasAttribute("data-entrance");
      const camera = root.dataset.entrance === "playing" ? page.getBoundingClientRect() : null;
      const scale = camera && page.offsetWidth ? camera.width / page.offsetWidth : 1;
      if (!scale || !height) return;
      const origin = camera?.top ?? 0;
      const changes: [HTMLElement, string][] = [];
      for (const { section, heading, rows, items } of sections) {
        const bounds = section.getBoundingClientRect();
        // The wide monitor can show rows below the fold of the final viewport.
        if (!inEntrance && (bounds.top > height + 64 || bounds.bottom < -64)) continue;
        // On desktop both columns start on the same grid line. While the left
        // one sticks, its rows keep scrolling: let the bio and CV finish coming
        // in without sending them away until they actually leave the viewport.
        const pinned = getComputedStyle(heading).position === "sticky"
          ? Math.max(0, heading.getBoundingClientRect().top - rows.getBoundingClientRect().top) / scale : 0;
        for (const { item, inHeading } of items) {
          const rect = item.getBoundingClientRect();
          // Only X is animated, so the vertical measurement is unaffected.
          const span = height + rect.height / scale;
          const visible = (height - (rect.top - origin) / scale) / span;
          const reading = inHeading ? Math.min(.65, visible + pinned / span) : visible;
          const progress = Math.max(0, Math.min(1, Math.max(visible, reading)));
          const phase = `${(-progress).toFixed(4)}s`;
          if (previous.get(item) !== phase) changes.push([item, phase]);
        }
      }
      for (const [item, phase] of changes) {
        item.style.setProperty("--scroll-phase", phase);
        previous.set(item, phase);
      }
    }
    function schedule() {
      if (!frame && root.dataset.motion === "on") {
        frame = requestAnimationFrame(sample);
      }
    }
    function sync() {
      cancelAnimationFrame(frame);
      frame = 0;
      if (root.dataset.motion === "on") sample();
    }

    // Seed the waiting monitor and hand the last pose to the document before
    // paint, including an early press, a skipped zoom or a motion change.
    const settings = new MutationObserver(sync);
    settings.observe(root, { attributes: true, attributeFilter: ["data-motion", "data-entrance"] });
    const resize = window.ResizeObserver ? new ResizeObserver(schedule) : null;
    resize?.observe(root);
    resize?.observe(page);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("pageshow", schedule);
    sync();
    return () => {
      settings.disconnect();
      resize?.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("pageshow", schedule);
      cancelAnimationFrame(frame);
      for (const item of previous.keys()) item.style.removeProperty("--scroll-phase");
    };
  }, []);

  return null;
}
