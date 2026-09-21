import Image from "next/image";
import { useTranslations } from "next-intl";
import { Heading } from "@/src/app/[locale]/components/heading";
import stat1Src from "@/public/assets/hack-stat-1.png";
import stat2Src from "@/public/assets/hack-stat-2.png";
import stat3Src from "@/public/assets/hack-stat-3.png";
import { Window } from "../components/window";

function ImageStat({
  src,
  label,
  stat,
}: {
  src: typeof stat1Src;
  label: string;
  stat: string;
}) {
  return (
    <div className="relative w-full min-h-[200px] min-w-[280px] max-w-[400px] md:min-w-[360px] md:min-h-[360px] rounded-lg">
      <Image src={src} alt="" fill className="rounded-lg object-cover" />
      <div className="flex flex-col absolute w-full h-full top-0 left-0 items-center justify-center">
        <Heading
          color="red"
          className="font-paragraph text-6xl sm:text-7xl md:text-8xl"
          size="lg"
        >
          {stat}
        </Heading>
        <Heading className="font-paragraph" color="white" size="lg">
          {label}
        </Heading>
      </div>
    </div>
  );
}

export default function Page() {
  const t = useTranslations("Hackathon");
  // Last edition's numbers, kept until the 2026 event has its own.
  const t25 = useTranslations("Hackathon25");

  return (
    <Window title={t("pages.numbers")}>
      <div className="flex gap-4 md:gap-6 flex-wrap items-stretch justify-center">
        <ImageStat
          src={stat1Src}
          label={t25("numbers.participants")}
          stat="80"
        />
        <ImageStat src={stat2Src} label={t25("numbers.sponsors")} stat="25" />
        <ImageStat src={stat3Src} label={t25("numbers.awards")} stat="4000€" />
      </div>
    </Window>
  );
}
