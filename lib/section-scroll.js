// Native view timelines handle both columns when available. Older engines
// sample the same CSS keyframes as soon as the sections have been parsed.
(() => {
  if (typeof window.ViewTimeline === "function" &&
      CSS.supports("animation-timeline", "view(block 0px)") && CSS.supports("animation-duration", "auto")) return;

  const root = document.documentElement;
  const page = document.querySelector(".entrance-viewport");
  const sections = Array.from(document.querySelectorAll("#services, #about"), section => {
    const heading = section.querySelector(".spread-heading");
    return {
      section, heading, rows: heading.nextElementSibling,
      items: Array.from(section.querySelectorAll("[data-enter-from]"), item => ({ item, inHeading: heading.contains(item) })),
    };
  });
  root.dataset.scrollFallback = "";
  const previous = new Map();
  let frame = 0;

  function sample() {
    frame = 0;
    const height = root.clientHeight;
    const inEntrance = root.hasAttribute("data-entrance");
    // Scroll positions belong to the unscaled page inside the monitor.
    const camera = root.dataset.entrance === "playing" ? page.getBoundingClientRect() : null;
    const scale = camera && page.offsetWidth ? camera.width / page.offsetWidth : 1;
    if (!scale || !height) return;
    const origin = camera?.top ?? 0;
    const changes = [];
    for (const { section, heading, rows, items } of sections) {
      const bounds = section.getBoundingClientRect();
      if (!inEntrance && (bounds.top > height + 64 || bounds.bottom < -64)) continue;
      // A sticky heading stays readable while the client rows move beside it.
      const pinned = getComputedStyle(heading).position === "sticky"
        ? Math.max(0, heading.getBoundingClientRect().top - rows.getBoundingClientRect().top) / scale : 0;
      for (const { item, inHeading } of items) {
        const rect = item.getBoundingClientRect();
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
    if (!frame) frame = requestAnimationFrame(sample);
  }
  function sync() {
    cancelAnimationFrame(frame);
    frame = 0;
    sample();
  }

  const settings = new MutationObserver(sync);
  settings.observe(root, { attributes: true, attributeFilter: ["data-entrance"] });
  const sizes = window.ResizeObserver ? new ResizeObserver(schedule) : null;
  sizes?.observe(root);
  sizes?.observe(page);
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  window.addEventListener("pageshow", sync);
  sync();
})();
