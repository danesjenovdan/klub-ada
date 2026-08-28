"use client";

import { useTranslations } from "next-intl";
import { PageWrapper } from "./components/page-wrapper";
import { Heading } from "../../[locale]/components/heading";
import { Paragraph } from "../../[locale]/components/paragraph";
import epilog from "../../../../public/assets/hackathon/epilog.png";
import abelium from "../../../../public/assets/hackathon/abelium.svg";
import celtra from "../../../../public/assets/hackathon/celtra.svg";
import istenic from "../../../../public/assets/hackathon/istenic.svg";
import leone from "../../../../public/assets/hackathon/leone.svg";
import nord from "../../../../public/assets/hackathon/nord.svg";
import redbull from "../../../../public/assets/hackathon/red bull.svg";
import stf from "../../../../public/assets/hackathon/stf.svg";
import smartis from "../../../../public/assets/hackathon/smartis.png";
import calda from "../../../../public/assets/hackathon/calda.svg";
import sazu from "../../../../public/assets/hackathon/sazu.svg";
import leanix from "../../../../public/assets/hackathon/leanix.svg";
import chipolo from "../../../../public/assets/hackathon/chipolo.svg";
import deltahub from "../../../../public/assets/hackathon/deltahub.svg";
import equalEyes from "../../../../public/assets/hackathon/equaleyes.svg";
import impactHub from "../../../../public/assets/hackathon/impact hub.svg";
import tehPark from "../../../../public/assets/hackathon/tehnoloski-park.svg";
import arnes from "../../../../public/assets/hackathon/arnes.svg";
import feelRooty from "../../../../public/assets/hackathon/feel-rooty.svg";
import juicy from "../../../../public/assets/hackathon/juicy-marbles.svg";
import ilirija from "../../../../public/assets/hackathon/ilirija.svg";
import atlantic from "../../../../public/assets/hackathon/atlantic-groupa.svg";
import banner from "../../../../public/assets/hackathon/banner.png";
import svetMetraze from "../../../../public/assets/hackathon/svet metraze.svg";
import nil from "../../../../public/assets/hackathon/nil.svg";
import lovable from "../../../../public/assets/hackathon/lovable.svg";
import src from "../../../../public/assets/hackathon/SRC.svg";
import clsx from "clsx";
import Image, { StaticImageData } from "next/image";
import { LinkButton } from "./components/link-button";
import { Link } from "@/src/i18n/navigation";

type SponsorItemProps = {
  image: string | StaticImageData;
  name: string;
  link: string;
  type: "gold" | "silver" | "bronze" | "media" | "vibe";
};
export function SponsorItem({ image, name, link, type }: SponsorItemProps) {
  return (
    <Link
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        "rounded-md p-5 shrink-0 flex w-full items-center justify-center hover:scale-105 transition-transform duration-200",
        {
          "border-yellow border": type === "gold",
          "border-blue border": type === "silver",
          "border-red border": type === "bronze",
          "border-gray border": ["media", "vibe"].includes(type),
          "md:w-72 min-h-30 md:min-h-30": type !== "media",
          "md:w-48 min-h-20 md:min-h-20": type === "media",
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
    {
      name: "Smartis",
      image: smartis,
      link: "https://smartis.si/",
    },
    {
      name: "Epilog",
      image: epilog,
      link: "https://www.epilog.net/en/",
    },
    {
      name: "Calda",
      image: calda,
      link: "https://www.thecalda.com/",
    },
  ];
  const silverSponsors = [
    {
      name: "Abelium",
      image: abelium,
      link: "https://abelium.si/",
    },
    {
      name: "Tehnološki park Ljubljana",
      image: tehPark,
      link: "https://www.tp-lj.si/sl",
    },
    {
      name: "Equaleyes",
      image: equalEyes,
      link: "https://equaleyes.com",
    },
    {
      name: "SRC",
      image: src,
      link: "https://www.src.si",
    },
  ];
  const bronzeSponsors = [
    {
      name: "Celtra",
      image: celtra,
      link: "https://celtra.com/",
    },
    {
      name: "Slovenski tehnološki forum",
      image: stf,
      link: "https://www.tehnoloski-forum.si/",
    },
    {
      name: "LeanIX",
      image: leanix,
      link: "https://www.leanix.net/",
    },
    {
      name: "Nil",
      image: nil,
      link: "https://nil.com/sl/",
    },
    {
      name: "Impact hub Ljubljana",
      image: impactHub,
      link: "https://ljubljana.impacthub.net/",
    },
  ];
  const partners = [
    {
      name: "Penine Istenič",
      image: istenic,
      link: "https://www.istenic.si",
    },
    {
      name: "Leone",
      image: leone,
      link: "https://www.leoneicecream.com",
    },
    {
      name: "Nord",
      image: nord,
      link: "https://nordhardseltzer.si",
    },
    {
      name: "Red Bull",
      image: redbull,
      link: "https://www.redbull.com/si-sl",
    },
    {
      name: "ZRC SAZU",
      image: sazu,
      link: "https://zrc-sazu.si/sl",
    },
    {
      name: "Chipolo",
      image: chipolo,
      link: "https://chipolo.net/en/",
    },
    {
      name: "Ilirija",
      image: ilirija,
      link: "https://www.ilirija.si/sl/",
    },
    {
      name: "Juicy marbles",
      image: juicy,
      link: "https://eu.juicymarbles.com",
    },
    {
      name: "Atlantic grupa",
      image: atlantic,
      link: "https://www.atlanticgrupa.com/en/",
    },
    {
      name: "Arnes",
      image: arnes,
      link: "https://www.arnes.si",
    },
    {
      name: "Feel rooty",
      image: feelRooty,
      link: "https://feelrooty.si/",
    },
    {
      name: "DeltaHub",
      image: deltahub,
      link: "https://deltahub.io/",
    },
    {
      name: "Svet metraze",
      image: svetMetraze,
      link: "https://svetmetraze.si/",
    },
  ];

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
          <div className="flex flex-col gap-3 items-center w-full">
            <Paragraph
              size="xl"
              weight="medium"
              color="white"
              textAlign="center"
            >
              {t("sponsors.vibe_coding_partner")}
            </Paragraph>
            <SponsorItem
              image={lovable}
              name="Lovable"
              link="https://lovable.dev/"
              type="vibe"
            />
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
              {partners.map(({ name, image, link }, index) => (
                <SponsorItem
                  key={index}
                  image={image}
                  name={name}
                  link={link}
                  type="media"
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
              {t("sponsors.support")}
            </Paragraph>
            <div className="rounded-md border-gray w-full md:w-[60%] border p-5 shrink-0 flex items-center justify-center">
              <Image src={banner} alt="banner" />
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
