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
  glassStyle: {
    left: `${100 * glass.left / photo.width}%`,
    top: `${100 * glass.top / photo.height}%`,
    width: `${100 * (glass.right - glass.left) / photo.width}%`,
    height: `${100 * (glass.bottom - glass.top) / photo.height}%`,
  },
  transformOrigin: `${100 * focusX}% ${100 * focusY}%`,
};
