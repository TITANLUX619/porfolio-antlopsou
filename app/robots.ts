import type { MetadataRoute } from "next";
import { siteOrigin } from "@/i18n/routing";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteOrigin}/sitemap.xml`,
  };
}
