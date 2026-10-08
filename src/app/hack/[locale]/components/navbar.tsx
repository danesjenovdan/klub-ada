import Image from "next/image";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { lilex } from "@/src/app/fonts";
import { Button } from "./button";
import { LanguageSwitch } from "./language-switch";

/**
 * The title bar of the site itself: the whole hackathon site is one maximised
 * window, so its navbar is drawn like a `Window` title bar (dark bar inside the
 * grey frame, Lilex `/ TITLE`), with the tickets button where a window has
 * its minimise / maximise / close buttons. The language switch lives in the
 * desktop's tray instead, except on a phone.
 */
export function Navbar() {
  const t = useTranslations("Hackathon");

  return (
    // The grey line underneath parts the title bar from the sunken desktop,
    // the way the window chrome parts a `Window`'s title bar from its content.
    <nav className="w-full shrink-0 h-16 md:h-18 px-2 md:px-3 flex items-center gap-2 md:gap-3 bg-[#0C0303] border-b-2 border-gray200 select-none">
      <a href="/" rel="noopener noreferrer" className="shrink-0">
        <Image
          src="/assets/hackathon/logo-a.svg"
          width={33}
          height={39}
          alt="Klub ada logo"
        />
      </a>
      <span
        className={clsx(
          lilex.className,
          // Below ~420px the tickets button and language switch leave it no
          // room, and the logo already says where you are.
          "hidden min-[420px]:block min-w-0 uppercase font-bold text-sm md:text-base text-white truncate",
        )}
      >
        {`/ ${t("site_title")}`}
      </span>
      <div className="ml-auto flex items-center gap-2 md:gap-3">
        <Button isDisabled>{t("tickets_cta")}</Button>
        {/* On a phone the desktop has no room for the tray (see `Tray`). */}
        <div className="md:hidden">
          <LanguageSwitch />
        </div>
      </div>
    </nav>
  );
}
