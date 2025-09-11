"use client";

import { useTranslations } from "next-intl";
import { PageWrapper } from "./components/page-wrapper";
import { Heading } from "../../[locale]/components/heading";
import { Paragraph } from "../../[locale]/components/paragraph";
import agiledrop from "../../../../public/assets/hackathon/agiledrop.svg";
import epilog from "../../../../public/assets/hackathon/epilog.svg";
import abelium from "../../../../public/assets/hackathon/abelium.svg";
import celtra from "../../../../public/assets/hackathon/celtra.svg";
import outfit from "../../../../public/assets/hackathon/outfit.svg";
import smartis from "../../../../public/assets/hackathon/smartis.svg";
import clsx from "clsx";
import Image from "next/image";
import { LinkButton } from "./components/link-button";
import { Link } from "@/src/i18n/navigation";

type SponsorItemProps = {
  image: string;
  name: string;
  link: string;
  type: "gold" | "silver" | "bronze" | "media";
};
export function SponsorItem({ image, name, link, type }: SponsorItemProps) {
  return (
    <Link
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        "rounded-md p-5 shrink-0 flex w-full md:w-72 min-h-30 md:min-h-30 items-center justify-center hover:scale-105 transition-transform duration-200",
        {
          "border-yellow border": type === "gold",
          "border-blue border": type === "silver",
          "border-red border": type === "bronze",
          "border-gray border": type === "media",
        }
      )}
    >
      <Image src={image} alt={name} />
    </Link>
  );
}

export function Sponsors() {
  const t = useTranslations("Hackathon");

  const goldSponsors = [
    { name: "Smartis", image: smartis, link: "https://smartis.si/" },
    { name: "Agiledrop", image: agiledrop, link: "https://agiledrop.si/" },
    { name: "Epilog", image: epilog, link: "https://www.epilog.net/en/" },
  ];
  const silverSponsors = [
    { name: "Abelium", image: abelium, link: "https://abelium.si/" },
  ];
  const bronzeSponsors = [
    { name: "Celtra", image: celtra, link: "https://celtra.com/" },
    { name: "Outfit7", image: outfit, link: "https://outfit7.com/" },
  ];
  // const mediaPartners = [];

  return (
    <PageWrapper>
      <div className="flex flex-col gap-8 md:gap-14 items-center w-full py-4 md:py-5 lg:py-10">
        <Heading
          className="font-paragraph"
          color="white"
          size="lg"
          textAlign="center"
        >
          {t("sponsors.title")}
        </Heading>
        <div className="flex flex-col gap-8 max-w-[1000px] w-full">
          <div className="flex flex-col gap-3 items-center w-full">
            <Paragraph
              size="xl"
              weight="medium"
              color="white"
              textAlign="center"
            >
              {t("sponsors.gold")}
            </Paragraph>
            <div className="flex items-stretch flex-wrap gap-4 w-full justify-center">
              {goldSponsors.map(({ name, image, link }, index) => (
                <SponsorItem
                  key={index}
                  image={image}
                  name={name}
                  link={link}
                  type="gold"
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3 items-center w-full">
            <Paragraph
              size="xl"
              weight="medium"
              color="white"
              textAlign="center"
            >
              {t("sponsors.silver")}
            </Paragraph>
            <div className="flex items-stretch flex-wrap gap-4 w-full justify-center">
              {silverSponsors.map(({ name, image, link }, index) => (
                <SponsorItem
                  key={index}
                  image={image}
                  name={name}
                  link={link}
                  type="silver"
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3 items-center w-full">
            <Paragraph
              size="xl"
              weight="medium"
              color="white"
              textAlign="center"
            >
              {t("sponsors.bronze")}
            </Paragraph>
            <div className="flex items-stretch flex-wrap gap-4 w-full justify-center">
              {bronzeSponsors.map(({ name, image, link }, index) => (
                <SponsorItem
                  key={index}
                  image={image}
                  name={name}
                  link={link}
                  type="bronze"
                />
              ))}
            </div>
          </div>
          {/* <div className="flex flex-col gap-3 items-center w-full">
            <Paragraph
              size="xl"
              weight="medium"
              color="white"
              textAlign="center"
            >
              {t("sponsors.media")}
            </Paragraph>
            <div className="flex items-stretch flex-wrap gap-4 w-full justify-center">
              {bronzeSponsors.map(({ name, image, link }, index) => (
                <SponsorItem
                  key={index}
                  image={image}
                  name={name}
                  link={link}
                  type="media"
                />
              ))}
            </div>
          </div> */}
        </div>
        <LinkButton isExternal href="https://klub-ada.si/partnerstvo" showIcon>
          {t("sponsors.cta")}
        </LinkButton>
      </div>
    </PageWrapper>
  );
}
