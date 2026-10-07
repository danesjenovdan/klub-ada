"use client";

import clsx from "clsx";
import { useTranslations } from "next-intl";
import { instrumentSerif, plexMono } from "@/src/app/fonts";
import { NotchButton, PostFrame, PostProps, isCompact } from "../frame";
import { Swirl } from "./swirl";

export const SAVE_THE_DATE_DURATION = 6;
export const SAVE_THE_DATE_STILL = 5;

/**
 * Save the date, after the Figma banner: the duck, the title and the date over
 * the site's swirling backdrop, which is the only thing that moves.
 */
export function SaveTheDatePostView({ t, format }: PostProps<null>) {
  const tHero = useTranslations("Hackathon.hero");
  const tPosts = useTranslations("Posts.save_the_date");
  const compact = isCompact(format);
  const tall = format.height > 1600;
  const scale = compact ? 0.82 : tall ? 1.15 : 1;

  return (
    <PostFrame t={t} format={format} showRipple={false}>
      <Swirl t={t} width={format.width} height={format.height} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="flex flex-col items-center text-center"
          style={{ transform: `scale(${scale})` }}
        >
          {/* The Figma lockup: the duck's belly tucked behind the title. */}
          <img
            src="/assets/hackathon26/duck.svg"
            alt=""
            className="relative left-[6px] h-auto w-[230px]"
          />
          <p
            className={clsx(
              instrumentSerif.className,
              "relative -mt-[33px] text-[112px] leading-[0.9] tracking-[-0.02em] text-[#e8e6e6]",
            )}
          >
            {tHero("title_line1")}
            <br />
            {tHero("title_line2")}
          </p>
          <p
            className={clsx(
              plexMono.className,
              "mt-[28px] text-[34px] tracking-[0.04em]",
            )}
          >
            {tHero("date")}
          </p>
          <div className="mt-[32px]">
            <NotchButton size="sm">{tPosts("button")}</NotchButton>
          </div>
        </div>
      </div>
    </PostFrame>
  );
}
