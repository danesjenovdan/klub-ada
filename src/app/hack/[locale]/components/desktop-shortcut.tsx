"use client";

import Image from "next/image";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/src/i18n/navigation";
import { PageWithIcon } from "../pages";

export interface DesktopShortcutProps {
  page: PageWithIcon;
  isSelected: boolean;
  onSelect: () => void;
  className?: string;
}

/**
 * A single desktop shortcut: an icon with its label underneath. Like on an old
 * Windows desktop, a single click only selects it and a double click opens it.
 */
export function DesktopShortcut({
  page: { href, labelKey, icon },
  isSelected,
  onSelect,
  className,
}: DesktopShortcutProps) {
  const t = useTranslations("Hackathon");
  const router = useRouter();

  return (
    <Link
      href={href}
      onClick={(event) => {
        // A single click selects rather than opens.
        event.preventDefault();
        onSelect();
      }}
      onDoubleClick={() => router.push(href)}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          router.push(href);
        }
      }}
      className={clsx(
        "w-24 flex flex-col items-center gap-1 p-1 outline-none group",
        className,
      )}
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
      <span className="font-paragraph text-sm text-white text-center leading-tight break-words px-1 [text-shadow:1px_1px_2px_rgba(0,0,0,0.9)]">
        {t(labelKey)}
      </span>
    </Link>
  );
}
