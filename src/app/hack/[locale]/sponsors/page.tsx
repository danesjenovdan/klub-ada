"use client";

import clsx from "clsx";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Paragraph } from "@/src/app/[locale]/components/paragraph";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { Link } from "@/src/i18n/navigation";
import imageLoader from "@/src/app/utils/image-loader";
import { useSanityData } from "@/src/app/utils/use-sanity-data";
import banner from "@/public/assets/hackathon/banner.png";
import { LinkButton } from "../components/link-button";
import { Window } from "../components/window";

const GET_SPONSORS = `*[_type == "hack26Sponsor"] | order(name) {
  name,
  type,
  link,
  image,
  'dimensions': image.asset->metadata.dimensions
}`;

type SponsorType = "gold" | "silver" | "bronze" | "partner" | "vibe";
type Sponsor = {
  name: string;
  type: SponsorType;
  link: string;
  image: SanityImageSource;
  dimensions: { width: number; height: number };
};

function SponsorItem({ image, name, link, type, dimensions }: Sponsor) {
  return (
    <Link
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        "rounded-md p-5 shrink-0 flex w-full items-center justify-center border hover:scale-105 transition-transform duration-200",
        {
          "border-yellow": type === "gold",
          "border-blue": type === "silver",
          "border-red": type === "bronze",
          "border-gray": type === "partner" || type === "vibe",
          "md:w-72 min-h-30": type !== "partner",
          "md:w-48 min-h-20": type === "partner",
        },
      )}
    >
      <Image
        src={imageLoader(image, 600)}
        alt={name}
        width={dimensions.width}
        height={dimensions.height}
      />
    </Link>
  );
}

const GROUPS: { titleKey: string; type: SponsorType }[] = [
  { titleKey: "sponsors.gold", type: "gold" },
  { titleKey: "sponsors.silver", type: "silver" },
  { titleKey: "sponsors.bronze", type: "bronze" },
  { titleKey: "sponsors.vibe_coding_partner", type: "vibe" },
  { titleKey: "sponsors.media", type: "partner" },
];

export default function Page() {
  const t = useTranslations("Hackathon");
  const t25 = useTranslations("Hackathon25");
  const { data } = useSanityData({ query: GET_SPONSORS });
  const allSponsors = (data || []) as Sponsor[];

  return (
    <Window title={t("pages.sponsors")}>
      <div className="flex flex-col gap-8 max-w-[1000px] mx-auto">
        {GROUPS.map(({ titleKey, type }) => {
          const sponsors = allSponsors.filter((s) => s.type === type);
          if (!sponsors.length) return null;
          return (
            <div key={titleKey} className="flex flex-col gap-3 items-center">
              <Paragraph
                size="xl"
                weight="medium"
                color="white"
                textAlign="center"
              >
                {t25(titleKey)}
              </Paragraph>
              <div className="flex items-stretch flex-wrap gap-4 w-full justify-center">
                {sponsors.map((sponsor) => (
                  <SponsorItem key={sponsor.name} {...sponsor} />
                ))}
              </div>
            </div>
          );
        })}
        <div className="flex justify-center">
          <LinkButton
            isExternal
            href="https://klub-ada.si/partnerstvo"
            showIcon
          >
            {t25("sponsors.cta")}
          </LinkButton>
        </div>
      </div>
    </Window>
  );
}
