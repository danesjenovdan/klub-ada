"use client";

import { Paragraph } from "@/src/app/[locale]/components/paragraph";
import { useTranslations } from "next-intl";
import { formatDate, formatDayOfDate } from "../../utils/date";
import { LinkButton } from "./components/link-button";

export function Hero() {
  const startDate = "2026-11-21"; // Update with actual 2026 dates
  const endDate = "2026-11-22"; // Update with actual 2026 dates

  const formattedTime = `${formatDayOfDate(startDate)} - ${formatDate(endDate)}`;

  const t = useTranslations("Hackathon");

  return (
    <section className="relative min-h-[100vh] w-full flex flex-col gap-4 md:gap-7 px-5 md:px-20 py-10 md:py-20 items-center justify-center">
      <div className="absolute top-4 right-4">
        <LinkButton showIcon href="/treasure-hunt" size="sm">
          {t("treasure_hunt.title")}
        </LinkButton>
      </div>
      <div>
        <h1 className="font-paragraph font-extrabold text-white md:text-6xl text-5xl text-center tracking-tight">
          {t("title")}
        </h1>
        <h1 className="font-paragraph font-extrabold text-white md:text-6xl text-5xl text-center tracking-tight">
          {t("slogan")}
        </h1>
      </div>
      <Paragraph
        className="hidden md:block"
        size="lg"
        color="white"
        weight="semiBold"
      >
        {`${formattedTime} 📍 ${t("location")}`}
      </Paragraph>
      <div className="flex flex-col items-center md:hidden">
        <Paragraph size="xl" color="white" weight="semiBold">
          {formattedTime}
        </Paragraph>
        <Paragraph
          size="xl"
          color="white"
          weight="semiBold"
          className="text-center"
        >
          {`📍 ${t("location")}`}
        </Paragraph>
      </div>
      <div className="relative group">
        <button
          className="relative px-8 py-4 bg-[#FF5757] hover:bg-[#FF5757]/90 text-white font-bold text-lg rounded-lg transition-all"
        >
          {t("main_cta")}
        </button>

        {/* Left Eye */}
        <div className="absolute left-1/2 -translate-x-[31px] top-0 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <div className="relative w-8 h-8 bg-white rounded-full flex items-center justify-center border-3 border-black shadow-lg">
            <div className="w-4 h-4 bg-black rounded-full animate-[wiggle1_0.6s_ease-in-out_infinite]" />
          </div>
        </div>

        {/* Right Eye */}
        <div className="absolute left-1/2 translate-x-[5px] top-0 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
          <div className="relative w-8 h-8 bg-white rounded-full flex items-center justify-center border-3 border-black shadow-lg">
            <div className="w-4 h-4 bg-black rounded-full animate-[wiggle2_0.7s_ease-in-out_infinite]" />
          </div>
        </div>

        <style jsx>{`
          @keyframes wiggle1 {
            0%, 100% { transform: translate(0, 0); }
            20% { transform: translate(3px, -2px); }
            40% { transform: translate(-2px, 3px); }
            60% { transform: translate(2px, 2px); }
            80% { transform: translate(-3px, -1px); }
          }
          @keyframes wiggle2 {
            0%, 100% { transform: translate(0, 0); }
            15% { transform: translate(-3px, 2px); }
            35% { transform: translate(2px, -3px); }
            55% { transform: translate(-2px, -2px); }
            75% { transform: translate(3px, 1px); }
          }
          @keyframes wiggle3 {
            0%, 100% { transform: translate(0, 0); }
            25% { transform: translate(2px, 3px); }
            50% { transform: translate(-3px, -2px); }
            75% { transform: translate(3px, -1px); }
          }
          @keyframes wiggle4 {
            0%, 100% { transform: translate(0, 0); }
            30% { transform: translate(-2px, 2px); }
            60% { transform: translate(3px, -3px); }
            90% { transform: translate(-1px, 2px); }
          }
          @keyframes wiggle5 {
            0%, 100% { transform: translate(0, 0); }
            20% { transform: translate(2px, -3px); }
            45% { transform: translate(-3px, 2px); }
            70% { transform: translate(1px, 3px); }
            90% { transform: translate(-2px, -2px); }
          }
        `}</style>
      </div>
    </section>
  );
}
