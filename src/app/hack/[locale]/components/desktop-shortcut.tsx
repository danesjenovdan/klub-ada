"use client";

import Image from "next/image";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/navigation";
import { PageWithIcon } from "../pages";

export interface DesktopShortcutProps {
  page: PageWithIcon;
  isSelected: boolean;
  className?: string;
}

/**
 * A single desktop shortcut: an icon with its label underneath. A single click
 * opens it. Hovering (or focusing) makes the icon grow a little, brighten, and
 * glow red around its own outline; the label stays put.
 */
export function DesktopShortcut({
  page: { href, labelKey, icon },
  isSelected,
  className,
}: DesktopShortcutProps) {
  const t = useTranslations("Hackathon");

  return (
    <Link
      href={href}
      className={clsx(
        "w-24 flex flex-col items-center gap-2 p-1 outline-none group short:w-auto short:gap-1",
        className,
      )}
    >
      <Image
        src={icon}
        alt=""
        width={48}
        height={48}
        className={clsx(
          "w-12 h-12 short:w-8 short:h-8 object-contain transition-[transform,filter] duration-200 ease-out",
          "group-hover:scale-110 group-hover:[filter:brightness(1.25)_drop-shadow(0_0_3px_rgba(255,87,87,0.9))_drop-shadow(0_0_12px_rgba(255,87,87,0.6))]",
          "group-focus-visible:scale-110 group-focus-visible:[filter:brightness(1.25)_drop-shadow(0_0_3px_rgba(255,87,87,0.9))_drop-shadow(0_0_12px_rgba(255,87,87,0.6))]",
          isSelected && "brightness-75",
        )}
      />
      <span className="font-paragraph text-sm short:text-xs text-white text-center leading-tight break-words px-1 [text-shadow:1px_1px_2px_rgba(0,0,0,0.9)]">
        {t(labelKey)}
      </span>
    </Link>
  );
}
