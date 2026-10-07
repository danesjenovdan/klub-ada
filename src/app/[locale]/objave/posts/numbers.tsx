"use client";

import { CSSProperties } from "react";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { instrumentSerif, plexMono } from "@/src/app/fonts";
import {
  CardBack,
  Corner,
  cardFace,
  cardFontSize,
  cardRow,
} from "@/src/app/hack/[locale]/components/card";
import { FIGURES_2025 } from "@/src/app/hack/[locale]/numbers/figures";
import { Header, PostFrame, PostProps, isCompact } from "../frame";
import { beat, ease } from "../motion";

export const NUMBERS_DURATION = 5;
export const NUMBERS_STILL = 4.5;

/** Last year's photos, faint under each figure, as on the site. */
const PHOTOS = [
  "/assets/hack-stat-1.png",
  "/assets/hack-stat-2.png",
  "/assets/hack-stat-3.png",
];

/** The red diamond would vanish on the red face, so the face shows it white. */
const whiteCorner = "brightness-0 invert";

/**
 * AdaHack 2025 in numbers, after the site's numbers window: three playing
 * cards lying face down turn over one after another, each counting up to its
 * figure as it shows. The turn is a 2D squash, so it captures cleanly.
 */
export function NumbersPostView({ t, format }: PostProps<null>) {
  const tNumbers = useTranslations("Hackathon.numbers");
  const compact = isCompact(format);
  const tall = format.height > 1600;
  const cardWidth = compact ? 270 : 300;
  // Under the duck, title and cards centre in the space left.
  const top = compact ? 200 : 230;
  const bottom = compact ? 64 : 88;

  return (
    <PostFrame t={t} format={format}>
      <Header t={t} format={format} align="center" duckOnly still />
      <div
        className="absolute inset-x-[52px] flex flex-col items-center justify-center"
        style={{ top, bottom, gap: compact ? 40 : tall ? 88 : 64 }}
      >
        <p
          className={clsx(
            instrumentSerif.className,
            "text-center leading-[0.95] tracking-[-0.02em]",
          )}
          style={{ fontSize: compact ? 76 : 96 }}
        >
          {tNumbers("heading")}
        </p>
        <div
          className="flex justify-center"
          style={
            {
              gap: 28,
              "--card-w": `${cardWidth}px`,
              fontSize: cardFontSize,
            } as CSSProperties
          }
        >
          {FIGURES_2025.map((figure, index) => {
            const flip = ease.inOutCubic(beat(t, 0.6 + index * 0.45, 0.6));
            const squash = Math.max(0.02, Math.abs(Math.cos(flip * Math.PI)));
            const shown = flip > 0.5;
            const count = Math.round(
              figure.value * ease.outCubic(beat(t, 0.9 + index * 0.45, 1.2)),
            );
            return (
              <div
                key={figure.labelKey}
                className="relative"
                style={{
                  width: cardWidth,
                  aspectRatio: "7 / 10",
                  transform: `scaleX(${squash})`,
                  filter: "drop-shadow(10px 14px 0 rgba(0,0,0,0.5))",
                }}
              >
                {shown ? (
                  <div className={clsx(cardFace, "overflow-hidden !bg-red")}>
                    <img
                      src={PHOTOS[index]}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover opacity-20 mix-blend-multiply"
                    />
                    <div className={clsx(cardRow, "relative !text-[#fafafa]")}>
                      <Corner className={whiteCorner} />
                      <span>2025</span>
                      <Corner className={whiteCorner} />
                    </div>
                    <div className="relative flex flex-col items-center gap-[0.5em] text-center">
                      <span
                        className={clsx(
                          "text-[3em] leading-[0.9] tracking-[-0.02em] tabular-nums text-[#fafafa]",
                          instrumentSerif.className,
                        )}
                      >
                        {count}
                        {"suffix" in figure ? figure.suffix : ""}
                      </span>
                      <span
                        className={clsx(
                          "text-[0.85em] uppercase tracking-[0.125em] text-[#fafafa]",
                          plexMono.className,
                        )}
                      >
                        {tNumbers(figure.labelKey)}
                      </span>
                    </div>
                    <div className={clsx(cardRow, "relative !text-[#fafafa]")}>
                      <Corner className={whiteCorner} />
                      <span>AdaHack</span>
                      <Corner className={whiteCorner} />
                    </div>
                  </div>
                ) : (
                  <CardBack />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </PostFrame>
  );
}
