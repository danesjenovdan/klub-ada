import Image from "next/image";
import { Link } from "./link";
import { LinkButton } from "./link-button";
import { useTranslations } from "next-intl";

export function Navbar() {
  const t = useTranslations("Hackathon25");
  return (
    <nav className="sticky top-0 right-0 left-0 z-20 px-5 md:px-10 h-16 md:h-18 border-b-2 border-red flex items-center justify-between gap-2">
      <div className="flex items-center justify-start">
        <a href="/" rel="noopener noreferrer">
          <Image
            src="/assets/klub-ada-logo.svg"
            width={70}
            height={45}
            alt="Klub ada logo"
          />
        </a>
      </div>
      <div>
        <LinkButton size="md" isExternal href="https://hack.klub-ada.si">
          {t("slogan")}
        </LinkButton>
      </div>
    </nav>
  );
}
