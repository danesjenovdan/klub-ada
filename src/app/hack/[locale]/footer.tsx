"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Paragraph } from "../../[locale]/components/paragraph";
import { LanguageDialog } from "../../[locale]/components/language-dialog";
import { Link } from "./components/link";

export function Footer() {
  const t = useTranslations("Hackathon");

  return (
    <div className="box-border max-w-full flex flex-col">
      <div className="flex flex-col-reverse items-center gap-10 md:flex-row px-7 pb-16 pt-8 md:px-14 justify-between">
        <div className="flex flex-col gap-4 items-center md:items-start">
          <a
            href="https://klub-ada.si"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/assets/hackathon/logo-obris.svg"
              width={80}
              height={50}
              alt="Klub Ada logo"
            />
          </a>
          <Paragraph size="sm" color="white">
            {"info@klub-ada.si"}
          </Paragraph>
          <LanguageDialog />
        </div>
        <div className="flex flex-col md:flex-row gap-10 lg:gap-24">
          <div className="flex flex-col gap-2 items-center md:items-start">
            <Paragraph size="lg" color="white" weight="bold">
              {t("footer.ada")}
            </Paragraph>
            <div>
              <Link variant="secondary" href="https://klub-ada.si">
                {t("footer.homepage")}
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-2 items-center md:items-start">
            <Paragraph size="lg" color="white" weight="bold">
              {t("footer.join_us")}
            </Paragraph>
            <div>
              <Link
                variant="secondary"
                href="https://forms.gle/camdd2joyHi9kAZt5"
                isExternal
              >
                {t("footer.discord")}
              </Link>
            </div>
            <div>
              <Link
                variant="secondary"
                href="https://www.linkedin.com/company/klub-ada/posts/"
                isExternal
              >
                {t("footer.linkedin")}
              </Link>
            </div>
            <div>
              <Link
                variant="secondary"
                href="https://www.instagram.com/klub_ada/"
                isExternal
              >
                {t("footer.instagram")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
