"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/src/i18n/navigation";
import { PAGES_WITH_ICONS } from "../pages";

/**
 * The desktop shortcuts down the left edge: an icon with its label underneath.
 * Like on an old Windows desktop, a single click only selects a shortcut and a
 * double click opens its window.
 */
export function DesktopNav() {
  const t = useTranslations("Hackathon");
  const pathname = usePathname();
  const router = useRouter();
  const navRef = useRef<HTMLElement>(null);
  const [selectedHref, setSelectedHref] = useState<string | null>(null);

  return (
    <nav
      ref={navRef}
      className="absolute z-10 top-3 left-2 md:top-8 md:left-8 flex flex-col gap-3"
    >
      {PAGES_WITH_ICONS.map(({ href, labelKey, icon }) => {
        const isSelected = selectedHref === href || pathname.endsWith(href);

        return (
          <Link
            key={href}
            href={href}
            onClick={(event) => {
              // A single click selects rather than opens.
              event.preventDefault();
              setSelectedHref(href);
            }}
            onDoubleClick={() => router.push(href)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                router.push(href);
              }
            }}
            className="w-24 flex flex-col items-center gap-1 p-1 outline-none group"
          >
            <Image
              src={icon}
              alt=""
              width={48}
              height={48}
              className={clsx(
                "w-12 h-12 object-contain",
                isSelected && "brightness-75",
              )}
            />
            <span
              className={clsx(
                "font-paragraph text-sm text-white text-center leading-tight break-words px-1 [text-shadow:1px_1px_2px_rgba(0,0,0,0.9)]",
              )}
            >
              {t(labelKey)}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
