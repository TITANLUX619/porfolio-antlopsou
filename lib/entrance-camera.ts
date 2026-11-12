// Inside the bezel in the source photograph. Both WebPs use this exact crop.
const photo = { width: 1536, height: 1024 };
const glass = { left: 165, top: 67, right: 1370, bottom: 696 };
const focusX = (glass.left + glass.right) / (2 * photo.width);
const focusY = (glass.top + glass.bottom) / (2 * photo.height);

// The two opaque bands keep the frame and keyboard, leaving the glass open.
function outsideGlass(direction: "right" | "bottom", start: number, end: number, dimension: number) {
  const near = `${100 * start / dimension}%`;
  const far = `${100 * end / dimension}%`;
  return `linear-gradient(to ${direction}, black ${near}, transparent ${near} ${far}, black ${far})`;
}

export const studioMonitor = {
  ...photo,
  frameMask: [
    outsideGlass("right", glass.left, glass.right, photo.width),
    outsideGlass("bottom", glass.top, glass.bottom, photo.height),
  ].join(", "),
  slotStyle: {
    aspectRatio: `${photo.width} / ${photo.height}`,
    transform: `translate(${-100 * focusX}%, ${-100 * focusY}%)`,
  },
  transformOrigin: `${100 * focusX}% ${100 * focusY}%`,
};

export function entranceCamera(device: DOMRect, width: number, height: number, previewDepth: number) {
  const cx = device.left + device.width * focusX, cy = device.top + device.height * focusY;
  const halfW = device.width * (glass.right - glass.left) / (2 * photo.width);
  const halfH = device.height * (glass.bottom - glass.top) / (2 * photo.height);
  // A small bleed clears the last antialiased bezel pixel on fractional viewports.
  const zoom = Math.max(cx / halfW, (width - cx) / halfW, cy / halfH, (height - cy) / halfH) * 1.006;
  // The small monitor is wide even on a phone. Frame the first section
  // together with the hero, then ease into the visitor's actual viewport.
  const previewWidth = Math.max(width, previewDepth * halfW / halfH);
  const hardware: Keyframe[] = [], aperture: Keyframe[] = [], page: Keyframe[] = [];

  // Sample the same camera path once for all three native browser animations.
  for (let i = 0; i <= 24; i++) {
    const t = i / 24, scale = zoom ** t;
    hardware.push({ offset: t, transform: `scale(${scale})` });
    const l = Math.max(0, cx - halfW * scale), r = Math.min(width, cx + halfW * scale);
    const u = Math.max(0, cy - halfH * scale), b = Math.min(height, cy + halfH * scale);
    aperture.push({ offset: t, clipPath: `inset(${u}px ${width - r}px ${height - b}px ${l}px)` });

    const blend = t * t * (3 - 2 * t);
    const pageWidth = previewWidth + (width - previewWidth) * blend;
    page.push({ offset: t, width: `${pageWidth}px`, transform: `translate(${l}px, ${u}px) scale(${(r - l) / pageWidth})` });
  }
  return { hardware, aperture, page };
}
