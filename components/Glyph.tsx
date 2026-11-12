import type { CSSProperties } from "react";

const paths = {
  terminal: "m4 5 6.5 6.5L4 18m9 0h7",
  play: "m7 4 12 8-12 8z",
  pause: "M8 5v14m8-14v14",
  replay: "M4 10a8 8 0 1 1 1.3 7M4 4v6h6",
  upRight: "M5 19 19 5M5 5h14v14",
  right: "M4 12h16m-7-7 7 7-7 7",
  down: "M12 4v16m-7-7 7 7 7-7",
  sun: "M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z",
  moon: "M20.5 14A8.6 8.6 0 0 1 10 3.5 8.7 8.7 0 1 0 20.5 14Z",
  menu: "M3 7h18M3 16h18",
  close: "m5 5 14 14M19 5 5 19",
  copy: "M8 8h12v12H8zM4 16V4h12",
  check: "m4 12 5 5L20 6",
  download: "M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5",
  pin: "M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 0 1 14 0Zm-4.7 0a2.3 2.3 0 1 1-4.6 0 2.3 2.3 0 0 1 4.6 0Z",
  layers: "m12 3 10 5-10 5L2 8l10-5Zm-9 10 9 4.5 9-4.5M3 17l9 4.5 9-4.5",
  code: "m8 6-6 6 6 6m8-12 6 6-6 6m-3-15-2 18",
  mobile: "M8 2h8q2 0 2 2v16q0 2-2 2H8q-2 0-2-2V4q0-2 2-2Zm3 17h2",
  mail: "M2 5h20v14H2zM3 6l9 7 9-7",
} as const;

export type GlyphName = keyof typeof paths;

export function Glyph({ name, size = 20, style }: { name: GlyphName; size?: number; style?: CSSProperties }) {
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" style={style}><path d={paths[name]} /></svg>;
}
