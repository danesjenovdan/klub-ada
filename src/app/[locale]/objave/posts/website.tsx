"use client";

import clsx from "clsx";
import { useTranslations } from "next-intl";
import { instrumentSerif, plexMono } from "@/src/app/fonts";
import {
  INK,
  NotchButton,
  PostFrame,
  PostProps,
  RED,
  isCompact,
} from "../frame";
import { beat, ease, mix } from "../motion";
import { Pointer } from "./pointer";

export const WEBSITE_DURATION = 4.5;
export const WEBSITE_STILL = 4;

/** The site's address, as people type it. */
const URL = "hack.klub-ada.si";

/** The desktop's shortcuts, above and below the title as on the homepage. */
const TOP = ["sponsors", "rewards", "timeline"] as const;
const BOTTOM = ["numbers", "faq", "pictures"] as const;

/** The Figma mobile homepage is 393px wide; the post is 1080. */
const K = 1080 / 393;

function Shortcut({ page }: { page: string }) {
  const t = useTranslations("Hackathon.pages");
  return (
    <div
      className={clsx(
        plexMono.className,
        "flex flex-col items-center text-center",
      )}
      style={{ width: 99.3 * K, gap: 5 * K }}
    >
      <img
        src={`/assets/hackathon26/${page}.svg`}
        alt=""
        className="[image-rendering:pixelated]"
        style={{ width: 32 * K, height: 32 * K }}
      />
      <span
        className="leading-[1.2] tracking-[0.03em] text-[#fafafa] text-balance"
        style={{ fontSize: 11.5 * K }}
      >
        {t(page)}
      </span>
    </div>
  );
}

/**
 * The Klub Ada mark from the Figma top bar: an outlined "A", drawn as the
 * design's two layers, centred in a square cell of `size`.
 */
function AdaMark({ size }: { size: number }) {
  // The mark is 27.9×32.8 in the design's 70px cell; keep that proportion.
  const k = size / 70;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <img
        src="/assets/hackathon26/social/ada-a-1.svg"
        alt="Klub Ada"
        className="absolute"
        style={{
          left: (size - 27.857 * k) / 2,
          top: (size - 32.83 * k) / 2,
          width: 27.857 * k,
          height: 32.83 * k,
        }}
      />
      <img
        src="/assets/hackathon26/social/ada-a-2.svg"
        alt=""
        className="absolute"
        style={{
          left: (size - 27.857 * k) / 2 + 1.84 * k,
          top: (size - 32.83 * k) / 2 + 2.41 * k,
          width: 23.65 * k,
          height: 28.28 * k,
        }}
      />
    </div>
  );
}

/**
 * The website, as a post, after the mobile homepage in the Figma file: a red
 * grid of 2px lines around the Klub Ada mark and the address button at the
 * top, and the homepage below, the desktop's shortcuts above and below the
 * title. Only the pointer moves: it glides in and clicks the address.
 */
export function WebsitePostView({ t, format }: PostProps<null>) {
  const tHero = useTranslations("Hackathon.hero");
  const line = 4;
  // The design is a tall phone screen; a shorter post keeps the grid, bar
  // and shortcuts at its scale and shrinks only the title to fit between.
  const hero =
    K * (isCompact(format) ? 0.46 : format.height > 1600 ? 0.82 : 0.54);
  const pad = (isCompact(format) ? 22 : 32) * K;
  // The top bar, slimmer than the design's 70px so the homepage has room.
  const bar = 48 * K;
  const glide = ease.inOutCubic(beat(t, 1.4, 0.9));
  const pressed = t > 2.35 && t < 2.55;

  return (
    <PostFrame t={t} format={format} background={INK} showRipple={false}>
      <div
        className="absolute inset-0 flex flex-col"
        style={{ background: RED, padding: line, gap: line }}
      >
        {/* The top bar: the mark in its own cell, the address on the right. */}
        <div className="flex shrink-0" style={{ gap: line }}>
          <div className="shrink-0" style={{ background: INK }}>
            <AdaMark size={bar} />
          </div>
          <div
            className="flex flex-1 items-center justify-end"
            style={{ background: INK, padding: `0 ${16 * K}px`, height: bar }}
          >
            <div className="relative">
              <div style={{ transform: `translateY(${pressed ? 4 : 0}px)` }}>
                <NotchButton
                  size="sm"
                  className="!normal-case"
                  style={{
                    fontSize: 14 * K,
                    filter: pressed ? "brightness(0.85)" : undefined,
                  }}
                >
                  {URL}
                </NotchButton>
              </div>
              {t > 1.4 && (
                <div
                  className="absolute"
                  style={{
                    left: `calc(100% - ${mix(-200, 50, glide)}px)`,
                    top: mix(700, 40, glide),
                  }}
                >
                  <Pointer pressed={pressed} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* The homepage: shortcuts, the title, shortcuts. */}
        <div
          className="relative flex flex-1 flex-col items-center justify-between overflow-hidden"
          style={{ background: INK, padding: `${pad}px 0` }}
        >
          {/* The blurred red swirl from the design, behind everything. */}
          <img
            src="/assets/hackathon26/social/ripple.svg"
            alt=""
            className="pointer-events-none absolute max-w-none"
            style={{
              left: -480 * K - 0.0888 * 1167 * K,
              top: 22.85 * K - 0.1091 * 950 * K,
              width: 1167 * K * 1.1776,
              height: 950 * K * 1.2182,
            }}
          />
          <div className="relative flex" style={{ gap: 25 * K }}>
            {TOP.map((page) => (
              <Shortcut key={page} page={page} />
            ))}
          </div>
          <div className="relative flex flex-col items-center text-center">
            {/* The duck's belly tucked behind the title, as in the design. */}
            <div className="flex flex-col items-center opacity-80">
              <img
                src="/assets/hackathon26/duck.svg"
                alt=""
                className="relative h-auto"
                style={{ width: 138.65 * hero, left: 4 * hero }}
              />
              <p
                className={clsx(
                  instrumentSerif.className,
                  "relative leading-[0.9] tracking-[-0.02em] text-[#fafafa]",
                )}
                style={{ fontSize: 65.7 * hero, marginTop: -20 * hero }}
              >
                {tHero("title_line1")}
                <br />
                {tHero("title_line2")}
              </p>
            </div>
            <p
              className={clsx(plexMono.className, "tracking-[-0.02em]")}
              style={{ fontSize: 16 * K, marginTop: 14 * hero }}
            >
              {tHero("date")}
            </p>
          </div>
          <div className="relative flex" style={{ gap: 25 * K }}>
            {BOTTOM.map((page) => (
              <Shortcut key={page} page={page} />
            ))}
          </div>
        </div>
      </div>
    </PostFrame>
  );
}
