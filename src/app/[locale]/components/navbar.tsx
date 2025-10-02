import Image from "next/image";
import { Link } from "./link";
import { NavbarMenu } from "./navbar-menu";
import { LinkButton } from "./link-button";
import { useTranslations } from "next-intl";

export function Navbar() {
  const t = useTranslations("Pages");
  return (
    <nav className="sticky top-0 right-0 left-0 z-20 mx-5 md:mx-20 px-5 md:px-10 h-16 md:h-20 bg-white rounded-b-2xl border border-black border-t-0 flex items-center justify-between gap-2">
      <div className="flex items-center justify-start">
        <a href="/" rel="noopener noreferrer">
          <Image
            src="/assets/klub-ada-logo.svg"
            width={70}
            height={45}
            className="hidden md:block"
            alt="Klub ada logo"
          />
        </a>
        <a href="/" rel="noopener noreferrer">
          <Image
            src="/assets/klub-ada-logo.svg"
            width={52}
            height={39}
            className="block md:hidden"
            alt="Klub ada logo"
          />
        </a>
      </div>
      <ol className="items-center gap-10 hidden md:flex">
        <li>
          <Link variant="tertiary" href="/o-nas">
            {t("about_us")}
          </Link>
        </li>
        <li>
          <Link variant="tertiary" href="/blog">
            {t("blog")}
          </Link>
        </li>
        <li>
          <Link variant="tertiary" href="/partnerstvo">
            {t("partners")}
          </Link>
        </li>
        <li>
          <Link variant="tertiary" href="/dogodki">
            {t("events")}
          </Link>
        </li>
      </ol>
      <div className="hidden md:block">
        <LinkButton size="md" isExternal href="https://hack.klub-ada.si">
          {t("hackathon")}
        </LinkButton>
      </div>
      <NavbarMenu />
    </nav>
  );
}
