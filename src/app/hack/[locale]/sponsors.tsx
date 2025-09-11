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
import { Button } from "./components/button";
import { IconArrowRight } from "@tabler/icons-react";
import { LinkButton } from "./components/link-button";

type SponsorItemProps = {
  image: string;
  name: string;
  type: "gold" | "silver" | "bronze" | "media";
};
export function SponsorItem({ image, name, type }: SponsorItemProps) {
  return (
    <div
      className={clsx(
        "rounded-md p-5 shrink-0 flex w-full md:w-72 min-h-30 md:min-h-30 items-center justify-center",
        {
          "border-yellow border": type === "gold",
          "border-blue border": type === "silver",
          "border-red border": type === "bronze",
          "border-gray border": type === "media",
        }
      )}
    >
      <Image src={image} alt={name} />
    </div>
  );
}

export function Sponsors() {
  const t = useTranslations("Hackathon");

  const goldSponsors = [
    { name: "Smartis", image: smartis },
    { name: "Agiledrop", image: agiledrop },
    { name: "Smartis", image: smartis },
    { name: "Agiledrop", image: agiledrop },
  ];
  const silverSponsors = [
    { name: "Epilog", image: epilog },
    { name: "Abelium", image: abelium },
    { name: "Smartis", image: smartis },
    { name: "Agiledrop", image: agiledrop },
  ];
  const bronzeSponsors = [
    { name: "Celtra", image: celtra },
    { name: "Outfit", image: outfit },
    { name: "Smartis", image: smartis },
    { name: "Agiledrop", image: agiledrop },
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
              {goldSponsors.map(({ name, image }, index) => (
                <SponsorItem
                  key={index}
                  image={image}
                  name={name}
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
              {silverSponsors.map(({ name, image }, index) => (
                <SponsorItem
                  key={index}
                  image={image}
                  name={name}
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
              {bronzeSponsors.map(({ name, image }, index) => (
                <SponsorItem
                  key={index}
                  image={image}
                  name={name}
                  type="bronze"
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
              {t("sponsors.media")}
            </Paragraph>
            <div className="flex items-stretch flex-wrap gap-4 w-full justify-center">
              {bronzeSponsors.map(({ name, image }, index) => (
                <SponsorItem
                  key={index}
                  image={image}
                  name={name}
                  type="media"
                />
              ))}
            </div>
          </div>
        </div>
        <LinkButton isExternal href="https://klub-ada.si/partnerstvo" showIcon>
          {t("sponsors.cta")}
        </LinkButton>
      </div>
    </PageWrapper>
  );
}
