"use client";

import type { ReactNode } from "react";
import { usePreviewPointer } from "@/hooks/usePreviewPointer";

export function ProjectCardLink({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  const link = usePreviewPointer<HTMLAnchorElement>();
  return <a className="project-link" ref={link} href={href} aria-label={label}>{children}</a>;
}
