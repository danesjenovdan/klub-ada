"use client";

import { CSSProperties } from "react";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { geistPixel, plexMono } from "@/src/app/fonts";
import { pixelTitle } from "@/src/app/hack/[locale]/sponsors/model";
import { Header, PostFrame, PostProps, RED, isCompact } from "../frame";
import { beat, steps } from "../motion";

export const COUNTDOWN_DURATION = 4;
export const COUNTDOWN_STILL = 3.5;

/** The days before AdaHack a countdown post is made for. */
export const COUNTDOWN_DAYS = [30, 14, 7, 3, 1];

/**
 * How far the countdown runs: the bar is empty this many days out, so even
 * the first post (30 days) shows some of it filled.
 */
const SPAN = 45;

const sunken =
  "border-[3px] border-t-[#262626] border-l-[#262626] border-r-[#e6e6e6] border-b-[#e6e6e6]";

/**
 * A countdown post: the days left in the site's pixel type, and under it the
 * site's loading bar, filling block by block to how close the hackathon is.
 * The bar filling is the only motion.
 */
export function CountdownPostView({
  t,
  format,
  data: days,
}: PostProps<number>) {
  const tPosts = useTranslations("Posts.countdown");
  const compact = isCompact(format);
  const tall = format.height > 1600;
  const blocks = 20;
  const target = Math.round(((SPAN - days) / SPAN) * blocks);
  const filled = Math.round(target * steps(beat(t, 0.4, 1.6), target || 1));

  return (
    <PostFrame t={t} format={format}>
      <Header t={t} format={format} align="center" still />
      <div
        className="absolute inset-x-[52px] flex flex-col items-center justify-center text-center"
        style={{
          top: compact ? 320 : 400,
          bottom: compact ? 64 : 88,
          gap: compact ? 28 : tall ? 64 : 44,
        }}
      >
        <p
          className={clsx(
            geistPixel.className,
            pixelTitle,
            "text-[var(--fill)]",
          )}
          style={
            {
              "--fill": "#fafafa",
              fontSize: compact ? 220 : tall ? 360 : 300,
            } as CSSProperties
          }
        >
          {days}
        </p>
        <p
          className={clsx(plexMono.className, "tracking-[0.04em]")}
          style={{ fontSize: compact ? 30 : 40 }}
        >
          {tPosts("days", { count: days })}
        </p>
        {/* The site's loading bar: chunky red blocks in a sunken track. */}
        <div
          className={clsx("flex w-full bg-[#0C0303]", sunken)}
          style={{ gap: 5, padding: 6, maxWidth: 820 }}
        >
          {Array.from({ length: blocks }, (_, index) => (
            <span
              key={index}
              className="flex-1"
              style={{
                height: compact ? 34 : 44,
                background: index < filled ? RED : "transparent",
              }}
            />
          ))}
        </div>
        <p
          className={clsx(plexMono.className, "tracking-[0.06em] text-red")}
          style={{ fontSize: compact ? 24 : 30 }}
        >
          hack.klub-ada.si
        </p>
      </div>
    </PostFrame>
  );
}
