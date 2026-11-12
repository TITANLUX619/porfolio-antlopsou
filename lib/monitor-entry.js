// This script runs as soon as the power button is parsed, including on a cold visit.
(() => {
  const root = document.documentElement;
  if (root.dataset.entrance !== "standby") return;

  const power = document.getElementById("entrance-power");
  const photo = document.getElementById("entrance-photo");
  const device = photo.closest(".entrance-device");
  const glass = document.querySelector(".entrance-glass-bounds");
  const events = new AbortController();
  const options = { signal: events.signal };
  const animations = [];
  let frameRequest = 0;
  let aperture;

  function finish(focus) {
    if (events.signal.aborted) return;
    events.abort();
    settings.disconnect();
    sizes?.disconnect();
    cancelAnimationFrame(frameRequest);
    for (const animation of animations) animation.cancel();
    if (aperture) aperture.inert = false;
    delete root.dataset.entrance;
    if (focus) document.getElementById("main")?.focus({ preventScroll: true });
  }

  function cameraTracks(bounds, width, height, previewDepth) {
    const halfWidth = bounds.width / 2, halfHeight = bounds.height / 2;
    const cx = bounds.left + halfWidth, cy = bounds.top + halfHeight;
    // The small bleed clears the last bezel pixel on fractional viewports.
    const zoom = 1.006 * Math.max(cx / halfWidth, (width - cx) / halfWidth, cy / halfHeight, (height - cy) / halfHeight);
    const previewWidth = Math.max(width, previewDepth * halfWidth / halfHeight);
    const hardware = [], mask = [], page = [];
    for (let i = 0; i <= 24; i++) {
      const t = i / 24, scale = zoom ** t;
      const left = Math.max(0, cx - halfWidth * scale), right = Math.min(width, cx + halfWidth * scale);
      const top = Math.max(0, cy - halfHeight * scale), bottom = Math.min(height, cy + halfHeight * scale);
      const blend = t * t * (3 - 2 * t);
      const pageWidth = previewWidth + (width - previewWidth) * blend;
      hardware.push({ offset: t, transform: `scale(${scale})` });
      mask.push({ offset: t, clipPath: `inset(${top}px ${width - right}px ${height - bottom}px ${left}px)` });
      page.push({ offset: t, width: `${pageWidth}px`, transform: `translate(${left}px, ${top}px) scale(${(right - left) / pageWidth})` });
    }
    return [hardware, mask, page];
  }

  function layout() {
    frameRequest = 0;
    if (!photo.naturalWidth || document.hidden || !root.dataset.entrance) return;
    // The button can be pressed while the rest of the HTML is still arriving.
    aperture = document.querySelector(".entrance-aperture");
    const site = aperture?.firstElementChild;
    const title = site?.querySelector("main > .hero + section .section-title");
    if (!title && document.readyState === "loading") return;
    if (!site) { finish(true); return; }
    const bounds = glass.getBoundingClientRect();
    const width = aperture.clientWidth, height = aperture.clientHeight;
    if (!bounds.width || !bounds.height || !width || !height) return;
    const pageBox = site.getBoundingClientRect();
    const depth = title ? (title.getBoundingClientRect().bottom - pageBox.top) * site.offsetWidth / pageBox.width + 28 : height;
    const tracks = cameraTracks(bounds, width, height, depth);
    if (animations.length) {
      animations.forEach((animation, i) => animation.effect.setKeyframes(tracks[i]));
      return;
    }
    window.scrollTo({ top: 0, behavior: "instant" });
    aperture.inert = true;
    const timing = { duration: 1580, delay: 560, easing: "cubic-bezier(.53,.04,.24,1)", fill: "both" };
    for (const [i, element] of [device, aperture, site].entries()) {
      animations.push(element.animate(tracks[i], timing));
    }
    root.dataset.entrance = "playing";
    sizes?.observe(aperture);
    animations[0].finished.then(() => finish(true), () => {});
  }

  function schedule() {
    const state = root.dataset.entrance;
    if (frameRequest || document.hidden || (state !== "starting" && state !== "playing")) return;
    frameRequest = requestAnimationFrame(() => {
      try { layout(); } catch { finish(true); }
    });
  }
  const sizes = window.ResizeObserver ? new ResizeObserver(schedule) : null;
  sizes?.observe(glass);
  const settings = new MutationObserver(() => {
    if (!root.dataset.entrance) finish(false);
  });
  settings.observe(root, { attributes: true, attributeFilter: ["data-entrance"] });

  power.addEventListener("click", () => {
    if (root.dataset.entrance !== "standby") return;
    if (!device.animate || !CSS.supports("clip-path", "inset(0)") || (photo.complete && !photo.naturalWidth)) {
      finish(true);
      return;
    }
    root.dataset.entrance = "starting";
    schedule();
  }, options);
  window.addEventListener("keydown", event => {
    if (event.key === "Escape" && root.dataset.entrance !== "standby") finish(true);
  }, options);
  window.addEventListener("resize", schedule, options);
  document.addEventListener("readystatechange", schedule, options);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cancelAnimationFrame(frameRequest);
      frameRequest = 0;
      for (const animation of animations) animation.pause();
    } else {
      for (const animation of animations) animation.play();
      schedule();
    }
  }, options);
  photo.addEventListener("load", schedule, options);
  photo.addEventListener("error", () => {
    if (root.dataset.entrance === "starting") finish(true);
  }, options);
  photo.srcset = photo.dataset.srcset;
  photo.src = photo.dataset.src;
})();
