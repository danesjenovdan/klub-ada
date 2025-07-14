"use client";

import Image from "next/image";
import { CtaLink } from "./cta-link";
import { Heading } from "./heading";
import { PageWrapper } from "./page-wrapper";
import { Paragraph } from "./paragraph";
import { Link } from "./link";
import { Card } from "./card";
import FooterNewsletter from "./footer-newsletter";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { LanguageDialog } from "./language-dialog";

export function Footer() {
  const t = useTranslations();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768); // md breakpoint in Tailwind
    };

    handleResize(); // Check on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const content = (
    <div className="flex flex-col pt-10 md:pt-20">
      <div className="flex flex-col pt-8 px-7 md:pt-16 md:px-14 bg-beige rounded-t-2xl">
        <div className="flex flex-col lg:flex-row justify-between gap-6">
          <Heading size="sm" className="max-w-80">
            {t("Footer.title")}
          </Heading>
          <div className="flex flex-col grow max-w-3xl gap-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="basis-8/12">
                <CtaLink
                  label={t("Footer.cta_discord")}
                  color="yellow"
                  description={t("Footer.description_discord")}
                  href="https://forms.gle/iRmFfg7Amn3YchM2A"
                  isExternal
                />
              </div>
              <div className="basis-4/12">
                <CtaLink
                  label={t("Partners.cta")}
                  color="blue"
                  href="/partnerstvo"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="basis-4/12">
                <CtaLink
                  label={t("Footer.cta_events")}
                  color="red"
                  href="/dogodki"
                />
              </div>
              <div className="basis-8/12">
                <Card>
                  <div className="flex flex-col gap-4">
                    <Paragraph size="xl" weight="bold">
                      {t("Footer.cta_newsletter")}
                    </Paragraph>
                    <FooterNewsletter />
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col-reverse gap-10 md:flex-row px-7 py-16 md:px-14 bg-beige justify-between">
        <div className="flex flex-col gap-4">
          <a href="/" rel="noopener noreferrer">
            <Image
              src="/assets/klub-ada-logo.svg"
              width={80}
              height={50}
              alt="Klub Ada logo"
            />
          </a>
          <Paragraph size="sm">{"info@klub-ada.si"}</Paragraph>
          <LanguageDialog />
        </div>
        <div className="flex flex-col md:flex-row gap-10 lg:gap-24">
          <div className="flex flex-col gap-2">
            <Paragraph size="lg" weight="bold">
              {t("Pages.about_us")}
            </Paragraph>
            <div className="flex flex-col gap-2">
              <div>
                <Link variant="secondary" href="/o-nas">
                  {t("Pages.about_us_description")}
                </Link>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Paragraph size="lg" weight="bold">
              {t("Pages.activities")}
            </Paragraph>
            <div className="flex flex-col gap-2">
              <div>
                <Link variant="secondary" href="/dogodki">
                  {t("Pages.events")}
                </Link>
              </div>
              <div>
                <Link variant="secondary" href="/blog">
                  {t("Pages.blog")}
                </Link>
              </div>
              <div>
                <Link variant="secondary" href="/partnerstvo">
                  {t("Pages.partners")}
                </Link>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Paragraph size="lg" weight="bold">
              {t("Footer.cta")}
            </Paragraph>
            <div className="flex flex-col gap-2">
              <div>
                <Link
                  variant="secondary"
                  href="https://forms.gle/camdd2joyHi9kAZt5"
                  isExternal
                >
                  {t("Common.discord")}
                </Link>
              </div>
              <div>
                <Link
                  variant="secondary"
                  href="https://www.linkedin.com/company/klub-ada/posts/"
                  isExternal
                >
                  {t("Common.linkedin")}
                </Link>
              </div>
              <div>
                <Link
                  variant="secondary"
                  href="https://www.instagram.com/klub_ada/"
                  isExternal
                >
                  {t("Common.instagram")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return isDesktop ? (
    <PageWrapper hasNoBottomPadding hasNoTopPadding bgColor="bg-white">
      {content}
    </PageWrapper>
  ) : (
    <div className="bg-white pt-4">{content}</div>
  );
}
