import { readFileSync } from "node:fs";
import { join } from "node:path";

const scrollScript = readFileSync(join(process.cwd(), "lib/section-scroll.js"), "utf8");

export function SectionReveals() {
  return <script dangerouslySetInnerHTML={{ __html: scrollScript }} />;
}
