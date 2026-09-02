"use client";

import { useState } from "react";
import clsx from "clsx";
import { usePathname } from "@/src/i18n/navigation";
import { FLOATING_PAGES, NAV_PAGES } from "../pages";
import { DesktopShortcut } from "./desktop-shortcut";

/**
 * Every shortcut on the desktop: most of them lined up in the column on the
 * left, the rest lying around wherever they were dropped. The selection lives
 * here so that only ever one shortcut is selected.
 */
export function DesktopShortcuts() {
  const pathname = usePathname();
  const [selectedHref, setSelectedHref] = useState<string | null>(null);

  return (
    <>
      <nav className="absolute z-10 top-3 left-2 md:top-8 md:left-8 flex flex-col gap-3">
        {NAV_PAGES.map((page) => (
          <DesktopShortcut
            key={page.href}
            page={page}
            isSelected={
              selectedHref === page.href || pathname.endsWith(page.href)
            }
            onSelect={() => setSelectedHref(page.href)}
          />
        ))}
      </nav>
      {FLOATING_PAGES.map((page) => (
        <DesktopShortcut
          key={page.href}
          page={page}
          isSelected={
            selectedHref === page.href || pathname.endsWith(page.href)
          }
          onSelect={() => setSelectedHref(page.href)}
          className={clsx("absolute z-10", page.position)}
        />
      ))}
    </>
  );
}
