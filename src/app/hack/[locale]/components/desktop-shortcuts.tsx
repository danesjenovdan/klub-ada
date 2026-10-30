"use client";

import clsx from "clsx";
import { usePathname } from "@/src/i18n/navigation";
import { FLOATING_PAGES, NAV_PAGES, PAGES_WITH_ICONS } from "../pages";
import { DesktopShortcut } from "./desktop-shortcut";

/**
 * Every shortcut on the desktop. On a phone they are all equal, spread three
 * across the top of the screen and three across the bottom. From `md` up most
 * of them line up in the column on the left and the rest lie around wherever
 * they were dropped. On a phone held sideways (`short`) neither fits the
 * height, so all six line up in one row along the top. The shortcut of the
 * current page is shown as selected.
 */
export function DesktopShortcuts() {
  const pathname = usePathname();
  const isSelected = (href: string) => pathname.endsWith(href);

  return (
    <>
      <nav className="md:hidden short:grid absolute z-10 inset-x-2 top-3 bottom-3 grid grid-cols-3 grid-rows-[auto_auto] content-between justify-items-center short:top-2 short:bottom-auto short:grid-cols-6 short:grid-rows-1">
        {PAGES_WITH_ICONS.map((page) => (
          <DesktopShortcut
            key={page.href}
            page={page}
            isSelected={isSelected(page.href)}
          />
        ))}
      </nav>
      <nav className="hidden md:flex short:hidden absolute z-10 md:top-8 md:left-8 flex-col gap-8">
        {NAV_PAGES.map((page) => (
          <DesktopShortcut
            key={page.href}
            page={page}
            isSelected={isSelected(page.href)}
          />
        ))}
      </nav>
      {FLOATING_PAGES.map((page) => (
        <DesktopShortcut
          key={page.href}
          page={page}
          isSelected={isSelected(page.href)}
          className={clsx("hidden md:flex short:hidden absolute z-10", page.position)}
        />
      ))}
    </>
  );
}
