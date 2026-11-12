// Inside edge of the glass in the 1448 × 1086 terminal artwork, clockwise.
const glass = [[253, 149], [1068, 154], [1049, 640], [211, 635]];

export function entranceCamera(device: DOMRect, width: number, height: number) {
  const corners = glass.map(([x, y]) => ({
    x: device.left + x * device.width / 1448,
    y: device.top + y * device.height / 1086,
  }));
  // The rectangle inside all four sloping edges must cover the final viewport.
  const left = Math.max(corners[0].x, corners[3].x), right = Math.min(corners[1].x, corners[2].x);
  const top = Math.max(corners[0].y, corners[1].y), bottom = Math.min(corners[2].y, corners[3].y);
  const cx = (left + right) / 2, cy = (top + bottom) / 2;
  const zoom = Math.max(width / (right - left), height / (bottom - top)) * 1.025;
  const hardware: Keyframe[] = [], aperture: Keyframe[] = [], page: Keyframe[] = [];

  // Sample the same camera path once for all three native browser animations.
  for (let i = 0; i <= 24; i++) {
    const t = i / 24, scale = zoom ** t;
    const moveX = (width / 2 - cx) * t, moveY = (height / 2 - cy) * t;
    const x = (value: number) => cx + (value - cx) * scale + moveX;
    const y = (value: number) => cy + (value - cy) * scale + moveY;
    const points = corners.map(p => [x(p.x), y(p.y)]);
    hardware.push({ offset: t, transform: `translate(${x(device.left) - device.left}px, ${y(device.top) - device.top}px) scale(${scale})` });
    aperture.push({ offset: t, clipPath: `polygon(${points.map(([px, py]) => `${px}px ${py}px`).join(",")})` });

    // Fit the live page to the visible part of the glass without stretching
    // text. On a phone the bottom of the page is revealed as the camera enters.
    const xs = points.map(p => p[0]), ys = points.map(p => p[1]);
    const l = Math.max(0, Math.min(...xs)), r = Math.min(width, Math.max(...xs));
    const u = Math.max(0, Math.min(...ys)), b = Math.min(height, Math.max(...ys));
    const fit = Math.max((r - l) / width, (b - u) / height);
    // Frame the headline inside the wide monitor on a portrait phone. As the
    // glass opens vertically, the header returns to its normal top edge.
    const crop = Math.max(0, height * fit - (b - u));
    const headlineOffset = width < height ? Math.min(crop, 88 * fit) * (1 - t) : 0;
    page.push({ offset: t, transform: `translate(${(l + r - fit * width) / 2}px, ${u - headlineOffset}px) scale(${fit})` });
  }
  return { hardware, aperture, page };
}
