import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTypescript,
  globalIgnores([
    ".next/**", "out/**", "build/**", "next-env.d.ts",
    // Archived template components are retained for reference.
    "components/ui/**", "components/{Approach,Clients,DarkModeButton,Experience,Footer,Hero,LanguageSelector,MagicButton,RecentProjects,SocialMediaButton}.tsx",
    "hooks/useDarkMode.ts", "data/{globe,index}.ts", "lib/utils.ts",
  ]),
]);
