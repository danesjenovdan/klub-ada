import clsx from "clsx";
import Image, { StaticImageData } from "next/image";
import { useTranslations } from "next-intl";
import { Paragraph } from "@/src/app/[locale]/components/paragraph";
import { Link } from "@/src/i18n/navigation";
import epilog from "@/public/assets/hackathon/epilog.png";
import abelium from "@/public/assets/hackathon/abelium.svg";
import celtra from "@/public/assets/hackathon/celtra.svg";
import istenic from "@/public/assets/hackathon/istenic.svg";
import leone from "@/public/assets/hackathon/leone.svg";
import nord from "@/public/assets/hackathon/nord.svg";
import redbull from "@/public/assets/hackathon/red bull.svg";
import stf from "@/public/assets/hackathon/stf.svg";
import smartis from "@/public/assets/hackathon/smartis.png";
import calda from "@/public/assets/hackathon/calda.svg";
import sazu from "@/public/assets/hackathon/sazu.svg";
import leanix from "@/public/assets/hackathon/leanix.svg";
import chipolo from "@/public/assets/hackathon/chipolo.svg";
import deltahub from "@/public/assets/hackathon/deltahub.svg";
import equalEyes from "@/public/assets/hackathon/equaleyes.svg";
import impactHub from "@/public/assets/hackathon/impact hub.svg";
import tehPark from "@/public/assets/hackathon/tehnoloski-park.svg";
import arnes from "@/public/assets/hackathon/arnes.svg";
import feelRooty from "@/public/assets/hackathon/feel-rooty.svg";
import juicy from "@/public/assets/hackathon/juicy-marbles.svg";
import ilirija from "@/public/assets/hackathon/ilirija.svg";
import atlantic from "@/public/assets/hackathon/atlantic-groupa.svg";
import svetMetraze from "@/public/assets/hackathon/svet metraze.svg";
import nil from "@/public/assets/hackathon/nil.svg";
import lovable from "@/public/assets/hackathon/lovable.svg";
import src from "@/public/assets/hackathon/SRC.svg";
import banner from "@/public/assets/hackathon/banner.png";
import { LinkButton } from "../components/link-button";
import { Window } from "../components/window";

type Sponsor = { name: string; image: string | StaticImageData; link: string };
type SponsorType = "gold" | "silver" | "bronze" | "partner" | "vibe";

function SponsorItem({
  image,
  name,
  link,
  type,
}: Sponsor & { type: SponsorType }) {
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
      <Image src={image} alt={name} />
    </Link>
  );
}

/** Last edition's sponsors, kept until the 2026 ones are signed. */
const GROUPS: { titleKey: string; type: SponsorType; sponsors: Sponsor[] }[] = [
  {
    titleKey: "sponsors.gold",
    type: "gold",
    sponsors: [
      { name: "Smartis", image: smartis, link: "https://smartis.si/" },
      { name: "Epilog", image: epilog, link: "https://www.epilog.net/en/" },
      { name: "Calda", image: calda, link: "https://www.thecalda.com/" },
    ],
  },
  {
    titleKey: "sponsors.silver",
    type: "silver",
    sponsors: [
      { name: "Abelium", image: abelium, link: "https://abelium.si/" },
      {
        name: "Tehnološki park Ljubljana",
        image: tehPark,
        link: "https://www.tp-lj.si/sl",
      },
      { name: "Equaleyes", image: equalEyes, link: "https://equaleyes.com" },
      { name: "SRC", image: src, link: "https://www.src.si" },
    ],
  },
  {
    titleKey: "sponsors.bronze",
    type: "bronze",
    sponsors: [
      { name: "Celtra", image: celtra, link: "https://celtra.com/" },
      {
        name: "Slovenski tehnološki forum",
        image: stf,
        link: "https://www.tehnoloski-forum.si/",
      },
      { name: "LeanIX", image: leanix, link: "https://www.leanix.net/" },
      { name: "Nil", image: nil, link: "https://nil.com/sl/" },
      {
        name: "Impact hub Ljubljana",
        image: impactHub,
        link: "https://ljubljana.impacthub.net/",
      },
    ],
  },
  {
    titleKey: "sponsors.vibe_coding_partner",
    type: "vibe",
    sponsors: [
      { name: "Lovable", image: lovable, link: "https://lovable.dev/" },
    ],
  },
  {
    titleKey: "sponsors.media",
    type: "partner",
    sponsors: [
      {
        name: "Penine Istenič",
        image: istenic,
        link: "https://www.istenic.si",
      },
      { name: "Leone", image: leone, link: "https://www.leoneicecream.com" },
      { name: "Nord", image: nord, link: "https://nordhardseltzer.si" },
      {
        name: "Red Bull",
        image: redbull,
        link: "https://www.redbull.com/si-sl",
      },
      { name: "ZRC SAZU", image: sazu, link: "https://zrc-sazu.si/sl" },
      { name: "Chipolo", image: chipolo, link: "https://chipolo.net/en/" },
      { name: "Ilirija", image: ilirija, link: "https://www.ilirija.si/sl/" },
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
      { name: "Arnes", image: arnes, link: "https://www.arnes.si" },
      { name: "Feel rooty", image: feelRooty, link: "https://feelrooty.si/" },
      { name: "DeltaHub", image: deltahub, link: "https://deltahub.io/" },
      {
        name: "Svet metraze",
        image: svetMetraze,
        link: "https://svetmetraze.si/",
      },
    ],
  },
];

export default function Page() {
  const t = useTranslations("Hackathon");
  const t25 = useTranslations("Hackathon25");

  return (
    <Window title={t("pages.sponsors")}>
      <div className="flex flex-col gap-8 max-w-[1000px] mx-auto">
        {GROUPS.map(({ titleKey, type, sponsors }) => (
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
                <SponsorItem key={sponsor.name} {...sponsor} type={type} />
              ))}
            </div>
          </div>
        ))}
        <div className="flex flex-col gap-3 items-center">
          <Paragraph size="xl" weight="medium" color="white" textAlign="center">
            {t25("sponsors.support")}
          </Paragraph>
          <div className="rounded-md border-gray w-full md:w-[60%] border p-5 flex items-center justify-center">
            <Image src={banner} alt="" />
          </div>
        </div>
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
