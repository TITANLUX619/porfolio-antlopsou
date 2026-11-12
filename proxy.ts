import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, isLocale } from "./i18n/routing";

export function proxy(request: NextRequest) {
  const preferences = (request.headers.get("accept-language") ?? "")
    .split(",")
    .map((entry) => {
      const [tag, weight] = entry.trim().toLowerCase().split(/\s*;\s*q=/);
      return { language: tag.split("-")[0], quality: Number(weight ?? 1) };
    })
    .filter(({ quality }) => quality > 0 && quality <= 1)
    .sort((first, second) => second.quality - first.quality);

  const saved = request.cookies.get("NEXT_LOCALE")?.value;
  const language = saved && isLocale(saved)
    ? saved
    : preferences.find(({ language }) => isLocale(language))?.language ?? defaultLocale;
  const destination = request.nextUrl.clone();
  destination.pathname = `/${language}`;
  const response = NextResponse.redirect(destination);
  response.headers.set("Vary", "Cookie, Accept-Language");
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

export const config = { matcher: "/" };
