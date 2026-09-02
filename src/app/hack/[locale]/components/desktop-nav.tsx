"use client";

import clsx from "clsx";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/src/i18n/navigation";
import { PAGES } from "../pages";

export function DesktopNav() {
  const t = useTranslations("Hackathon");
  const pathname = usePathname();

  return (
    <nav className="absolute z-10 top-3 left-2 md:top-8 md:left-8 flex flex-col gap-2 w-[16rem]">
      {PAGES.map(({ href, labelKey }) => {
        const isOpen = pathname.endsWith(href);

        return (
          <Link
            key={href}
            href={href}
            className={clsx(
              "font-heading uppercase text-sm md:text-base px-3 py-2 border-2 outline-none truncate",
              isOpen
                ? "bg-gray300 text-black border-t-gray900 border-l-gray900 border-r-gray100 border-b-gray100"
                : "bg-gray200 text-black border-t-gray100 border-l-gray100 border-r-gray900 border-b-gray900 hover:bg-gray100",
            )}
          >
            {t(labelKey)}
          </Link>
        );
      })}
    </nav>
  );
}
