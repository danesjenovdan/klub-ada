"use client";

import { useState } from "react";
import clsx from "clsx";
import { usePathname } from "@/src/i18n/navigation";
import { FLOATING_PAGES, NAV_PAGES, PAGES_WITH_ICONS } from "../pages";
import { DesktopShortcut } from "./desktop-shortcut";

/**
 * Every shortcut on the desktop. On a phone they are all equal, spread three
 * across the top of the screen and three across the bottom. From `md` up most
 * of them line up in the column on the left and the rest lie around wherever
 * they were dropped. The selection lives here so that only ever one shortcut is
 * selected.
 */
export function DesktopShortcuts() {
  const pathname = usePathname();
  const [selectedHref, setSelectedHref] = useState<string | null>(null);

  const isSelected = (href: string) =>
    selectedHref === href || pathname.endsWith(href);

  return (
    <>
      <nav className="md:hidden absolute z-10 inset-x-2 top-3 bottom-3 grid grid-cols-3 grid-rows-[auto_auto] content-between justify-items-center">
        {PAGES_WITH_ICONS.map((page) => (
          <DesktopShortcut
            key={page.href}
            page={page}
            isSelected={isSelected(page.href)}
            onSelect={() => setSelectedHref(page.href)}
          />
        ))}
      </nav>
      <nav className="hidden md:flex absolute z-10 md:top-8 md:left-8 flex-col gap-8">
        {NAV_PAGES.map((page) => (
          <DesktopShortcut
            key={page.href}
            page={page}
            isSelected={isSelected(page.href)}
            onSelect={() => setSelectedHref(page.href)}
          />
        ))}
      </nav>
      {FLOATING_PAGES.map((page) => (
        <DesktopShortcut
          key={page.href}
          page={page}
          isSelected={isSelected(page.href)}
          onSelect={() => setSelectedHref(page.href)}
          className={clsx("hidden md:flex absolute z-10", page.position)}
        />
      ))}
    </>
  );
}
