"use client";

import { useTranslations } from "next-intl";
import { PageWrapper } from "./components/page-wrapper";
import { Paragraph } from "../../[locale]/components/paragraph";
import { LinkButton } from "./components/link-button";
import Image from "next/image";
import racka from "../../../../public/assets/hackathon/racka.svg";

export function CallToAction() {
  const t = useTranslations("Hackathon25");

  return (
    <PageWrapper>
      <div className="flex flex-col gap-4 sm:gap-6 bg-[rgba(255,87,87,0.16)] border border-red shadow-shineRed rounded-lg items-center w-full py-6 sm:py-8 md:py-14 px-4 sm:px-6">
        <Image
          src={racka}
          alt="Duck image"
          className="w-16 h-16 sm:w-20 sm:h-20 md:w-32 md:h-32 object-contain"
        />
        <h1 className="font-paragraph font-extrabold text-white text-2xl sm:text-3xl md:text-5xl text-center tracking-tight max-w-2xl px-2">
          {t("call_to_action.title")}
        </h1>
        <Paragraph
          size="lg"
          weight="medium"
          color="white"
          textAlign="center"
          className="max-w-xl px-2"
        >
          {t("call_to_action.description")}
        </Paragraph>
        <div className="relative group">
          <button className="relative px-8 py-4 bg-[#FF5757] hover:bg-[#FF5757]/90 text-white font-bold text-lg rounded-lg transition-all">
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
              0%,
              100% {
                transform: translate(0, 0);
              }
              20% {
                transform: translate(3px, -2px);
              }
              40% {
                transform: translate(-2px, 3px);
              }
              60% {
                transform: translate(2px, 2px);
              }
              80% {
                transform: translate(-3px, -1px);
              }
            }
            @keyframes wiggle2 {
              0%,
              100% {
                transform: translate(0, 0);
              }
              15% {
                transform: translate(-3px, 2px);
              }
              35% {
                transform: translate(2px, -3px);
              }
              55% {
                transform: translate(-2px, -2px);
              }
              75% {
                transform: translate(3px, 1px);
              }
            }
            @keyframes wiggle3 {
              0%,
              100% {
                transform: translate(0, 0);
              }
              25% {
                transform: translate(2px, 3px);
              }
              50% {
                transform: translate(-3px, -2px);
              }
              75% {
                transform: translate(3px, -1px);
              }
            }
            @keyframes wiggle4 {
              0%,
              100% {
                transform: translate(0, 0);
              }
              30% {
                transform: translate(-2px, 2px);
              }
              60% {
                transform: translate(3px, -3px);
              }
              90% {
                transform: translate(-1px, 2px);
              }
            }
            @keyframes wiggle5 {
              0%,
              100% {
                transform: translate(0, 0);
              }
              20% {
                transform: translate(2px, -3px);
              }
              45% {
                transform: translate(-3px, 2px);
              }
              70% {
                transform: translate(1px, 3px);
              }
              90% {
                transform: translate(-2px, -2px);
              }
            }
          `}</style>
        </div>
      </div>
    </PageWrapper>
  );
}
