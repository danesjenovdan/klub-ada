import Image from "next/image";
import { useTranslations } from "next-intl";

export function Navbar() {
  const t = useTranslations("Hackathon");

  return (
    <nav className="w-full shrink-0 px-2 md:px-3 h-16 md:h-18 border-b-2 border-red flex items-center gap-2">
      <div className="h-full flex items-center pr-2 pl-1 md:pr-4 border-r-2 border-red">
        <a href="/" rel="noopener noreferrer">
          <Image
            src="/assets/hackathon/logo-a.svg"
            width={33}
            height={39}
            alt="Klub ada logo"
          />
        </a>
      </div>
      <button
        type="button"
        disabled
        className="pixel-corners ml-auto inline-flex shrink-0 items-center justify-center whitespace-nowrap select-none bg-red text-white font-button font-medium text-base md:text-lg h-9 md:h-11 px-4 md:px-5 transition-transform duration-200 ease-in-out enabled:hover:-translate-y-1 enabled:hover:translate-x-1"
      >
        {t("tickets_cta")}
      </button>
    </nav>
  );
}
