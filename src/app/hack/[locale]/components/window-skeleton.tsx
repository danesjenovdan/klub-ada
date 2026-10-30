"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "@/src/i18n/navigation";
import { PAGES_WITH_ICONS } from "../pages";
import { Window, WindowLoading } from "./window";

/**
 * The window a subpage will open in, shown the instant a shortcut is clicked,
 * before the page's own code and content have arrived. It reads the title
 * from the route so the frame already says where you are going.
 */
export function WindowSkeleton() {
  const t = useTranslations("Hackathon");
  const pathname = usePathname();
  const page = PAGES_WITH_ICONS.find(({ href }) => pathname.endsWith(href));

  return (
    <Window title={page ? t(page.labelKey) : ""}>
      <WindowLoading />
    </Window>
  );
}
