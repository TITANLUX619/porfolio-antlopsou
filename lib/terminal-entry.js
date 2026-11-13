// Enter runs the command on desktop. Touch devices also expose a native button.
(() => {
  const root = document.documentElement;
  if (root.dataset.entrance !== "standby") return;

  const touchButton = document.getElementById("entrance-tap");
  const pane = document.querySelector(".entrance-pane");
  const keyHint = pane.querySelector(".entrance-key-hint");
  const transcript = pane.querySelector(".entrance-transcript");
  const windowFrame = document.querySelector(".entrance-window");
  const terminal = windowFrame.parentElement;
  const stage = terminal.parentElement;
  const events = new AbortController();
  const options = { signal: events.signal };
  const camera = [];
  const printing = [];
  let frameRequest = 0;
  let aperture;

  function finish(focus) {
    if (events.signal.aborted) return;
    events.abort();
    settings.disconnect();
    sizes?.disconnect();
    cancelAnimationFrame(frameRequest);
    for (const animation of [...printing, ...camera]) animation.cancel();
    if (aperture) aperture.inert = false;
    document.querySelector(".entrance-preview")?.style.removeProperty("--preview-height");
    delete root.dataset.entrance;
    if (focus) document.getElementById("main")?.focus({ preventScroll: true });
  }

  function cameraTracks(width, height, previewDepth) {
    // Read layout before transforms, even when resizing halfway through the zoom.
    const box = terminal.getBoundingClientRect(), inner = getComputedStyle(pane);
    const halfWidth = parseFloat(inner.width) / 2, halfHeight = parseFloat(inner.height) / 2;
    const foot = parseFloat(getComputedStyle(windowFrame).borderBottomWidth);
    const cx = box.left + box.width / 2, cy = box.bottom - foot - halfHeight;
    const zoom = 1.006 * Math.max(cx / halfWidth, (width - cx) / halfWidth, cy / halfHeight, (height - cy) / halfHeight);
    const previewWidth = Math.max(width, previewDepth * halfWidth / halfHeight);
    const frame = [], page = [];
    const offsets = new Set(Array.from({ length: 25 }, (_, i) => i / 24));
    for (const edge of [cx / halfWidth, (width - cx) / halfWidth, cy / halfHeight]) {
      if (edge > 1 && edge < zoom) offsets.add(Math.log(edge) / Math.log(zoom));
    }
    for (const t of [...offsets].sort((a, b) => a - b)) {
      const scale = zoom ** t;
      const left = cx - halfWidth * scale, right = cx + halfWidth * scale;
      const top = cy - halfHeight * scale;
      const blend = t * t * (3 - 2 * t);
      const pageWidth = previewWidth + (width - previewWidth) * blend;
      // The frame carries the page. Only compensate once its edges go offscreen.
      const x = Math.max(0, -left) / scale, y = Math.max(0, -top) / scale;
      const fit = (Math.min(width, right) - Math.max(0, left)) / (pageWidth * scale);
      frame.push({ offset: t, transform: `scale(${scale})` });
      page.push({ offset: t, width: `${pageWidth}px`, transform: `translate(${x}px, ${y}px) scale(${fit})` });
    }
    return { tracks: [frame, page], previewHeight: previewWidth * halfHeight / halfWidth };
  }

  // Six vertices cover all previous rows plus the part of the current row
  // printed so far. Percentages keep the terminal and the live page aligned
  // if the pane changes size during the reveal.
  function printMasks() {
    const rows = 14, columns = 24;
    const page = [], cover = [];
    for (let row = 0; row < rows; row++) {
      for (const edge of [0, 1]) {
        const x = edge * 100, y = 100 * row / rows, nextY = 100 * (row + 1) / rows;
        const offset = (row + edge) / rows;
        const easing = `steps(${columns}, end)`;
        page.push({ offset, easing, clipPath: `polygon(0 0, 100% 0, 100% ${y}%, ${x}% ${y}%, ${x}% ${nextY}%, 0 ${nextY}%)` });
        cover.push({ offset, easing, clipPath: `polygon(0 ${nextY}%, ${x}% ${nextY}%, ${x}% ${y}%, 100% ${y}%, 100% 100%, 0 100%)` });
      }
    }
    return [page, cover];
  }

  function startZoom() {
    if (events.signal.aborted) return;
    root.dataset.entrance = "playing";
    for (const animation of printing) animation.cancel();
    printing.length = 0;
    if (!document.hidden) for (const animation of camera) animation.play();
  }

  function printPortfolio(preview) {
    const lines = transcript.querySelectorAll(".entrance-output-line");
    let delay = 50;
    for (const line of lines) {
      const length = line.textContent.length;
      const duration = length * 16;
      printing.push(line.animate(
        [{ clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)" }],
        { duration, delay, easing: `steps(${length}, end)`, fill: "both" }
      ));
      delay += duration + 75;
    }
    const [pageMask, transcriptMask] = printMasks();
    const timing = { duration: 950, delay: delay + 120, fill: "both" };
    printing.push(transcript.animate(transcriptMask, timing));
    const reveal = preview.animate(pageMask, timing);
    printing.push(reveal);
    reveal.finished.then(startZoom, () => {});
  }

  function layout() {
    frameRequest = 0;
    if (document.hidden || !root.dataset.entrance) return;
    // Enter may be pressed while the rest of the HTML is still arriving.
    aperture = document.querySelector(".entrance-aperture");
    const site = aperture?.firstElementChild;
    const title = site?.querySelector("main > .hero + section .section-title");
    if (!title && document.readyState === "loading") return;
    if (!site) { finish(true); return; }
    const width = stage.clientWidth, height = stage.clientHeight;
    if (!pane.clientWidth || !pane.clientHeight || !width || !height) return;
    const pageBox = site.getBoundingClientRect();
    const depth = title ? (title.getBoundingClientRect().bottom - pageBox.top) * site.offsetWidth / pageBox.width + 28 : height;
    const { tracks, previewHeight } = cameraTracks(width, height, depth);
    const preview = site.firstElementChild;
    if (root.dataset.entrance !== "playing") {
      preview.style.setProperty("--preview-height", `${previewHeight}px`);
    }
    if (camera.length) {
      camera.forEach((animation, i) => animation.effect.setKeyframes(tracks[i]));
      return;
    }
    window.scrollTo({ top: 0, behavior: "instant" });
    aperture.inert = true;
    const timing = { duration: 1580, delay: 560, easing: "cubic-bezier(.53,.04,.24,1)", fill: "both" };
    for (const [i, element] of [windowFrame, site].entries()) {
      const animation = element.animate(tracks[i], timing);
      animation.pause();
      animation.currentTime = 0;
      camera.push(animation);
    }
    root.dataset.entrance = "building";
    printPortfolio(preview);
    sizes?.observe(stage);
    camera[0].finished.then(() => finish(true), () => {});
  }

  function schedule() {
    const state = root.dataset.entrance;
    if (frameRequest || document.hidden || !state || state === "standby") return;
    frameRequest = requestAnimationFrame(() => {
      try { layout(); } catch { finish(true); }
    });
  }
  const sizes = window.ResizeObserver ? new ResizeObserver(schedule) : null;
  sizes?.observe(pane);
  const settings = new MutationObserver(() => {
    if (!root.dataset.entrance) finish(false);
  });
  settings.observe(root, { attributes: true, attributeFilter: ["data-entrance"] });

  function openPortfolio() {
    if (root.dataset.entrance !== "standby") return;
    if (!windowFrame.animate || !CSS.supports("clip-path", "inset(0)")) {
      finish(true);
      return;
    }
    root.dataset.entrance = "starting";
    schedule();
  }
  touchButton.addEventListener("click", event => {
    if (event.pointerType !== "mouse" && matchMedia("(hover: none) and (pointer: coarse)").matches) openPortfolio();
  }, options);
  window.addEventListener("keydown", event => {
    if (event.key === "Escape" && root.dataset.entrance !== "standby") {
      finish(true);
      return;
    }
    if (event.key !== "Enter" || event.defaultPrevented || event.isComposing ||
        event.repeat || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (event.target === document.body || event.target === root || event.target === document ||
        event.target === keyHint || event.target === touchButton) {
      event.preventDefault();
      openPortfolio();
    }
  }, options);
  window.addEventListener("resize", schedule, options);
  document.addEventListener("readystatechange", schedule, options);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cancelAnimationFrame(frameRequest);
      frameRequest = 0;
      for (const animation of [...printing, ...camera]) animation.pause();
    } else {
      const active = root.dataset.entrance === "building" ? printing : camera;
      for (const animation of active) animation.play();
      schedule();
    }
  }, options);
})();
