"use client";

import { CSSProperties } from "react";
import clsx from "clsx";
import { instrumentSerif, plexMono } from "@/src/app/fonts";
import {
  CardBack,
  Corner,
  cardFace,
  cardFontSize,
  cardRow,
} from "@/src/app/hack/[locale]/components/card";
import { RewardPost } from "../data";
import {
  PixelConfetti,
  PostFrame,
  PostProps,
  RED,
  WHITE,
  isCompact,
} from "../frame";
import { beat, clamp, ease, mix } from "../motion";

export const AWARD_DURATION = 7.5;
export const AWARD_STILL = 5.5;

/** The face of the card, as on the prize deck: amount in the corners, prize in the middle. */
function CardFront({ reward }: { reward: RewardPost }) {
  return (
    <div className={clsx(cardFace, "text-white")}>
      <div className={clsx(cardRow, "items-start normal-case tracking-normal")}>
        <span className="font-semibold leading-none">{reward.amount}</span>
        <Corner icon={reward.icon} />
      </div>
      <div className="flex flex-col items-center gap-[0.3em] px-[0.3em] text-center">
        <span
          className={clsx(
            "text-[2.3em] leading-tight",
            instrumentSerif.className,
          )}
        >
          {reward.amount}
        </span>
        <span
          className={clsx("text-[0.85em] leading-tight", plexMono.className)}
        >
          {reward.title}
        </span>
        {reward.subtitle && (
          <span
            className={clsx(
              "text-[0.65em] font-light leading-tight text-gray400",
              plexMono.className,
            )}
          >
            {reward.subtitle}
          </span>
        )}
      </div>
      <div className={clsx(cardRow, "items-end normal-case tracking-normal")}>
        <Corner icon={reward.icon} />
        <span className="rotate-180 font-semibold leading-none">
          {reward.amount}
        </span>
      </div>
    </div>
  );
}

/**
 * One prize as a playing card from the site's prize deck, and nothing else:
 * the card is the whole post.
 *
 *   0.7  the card is dealt in face down on an arc, spinning to rest
 *   1.7  it lifts and turns over (a 2D squash, so it captures cleanly)
 *   2.3  pixel confetti, a shine runs across the face; the card idles
 */
export function AwardPostView({ t, format, data }: PostProps<RewardPost>) {
  const compact = isCompact(format);
  // As large as fits inside the margins, centred in what is left over.
  const margin = compact ? 96 : 120;
  const cardTop = margin;
  const cardHeight = Math.min(
    format.height > 1600 ? 1100 : 860,
    format.height - cardTop - margin,
  );
  const cardWidth = (cardHeight * 7) / 10;
  const spare = format.height - cardTop - margin - cardHeight;
  const centreY = cardTop + spare / 2 + cardHeight / 2;

  // Dealt in from the bottom left, on an arc, turning from -32° to rest.
  const deal = ease.outExpo(beat(t, 0.7, 1.0));
  const dealX = mix(-720, 0, deal);
  const dealY = mix(520, 0, deal) - Math.sin(deal * Math.PI) * 140;
  const dealRotate = mix(-32, -3, deal);

  // Turn over: 0..180°. The card is drawn as a squash of its width by |cos|,
  // which reads as a flip without needing 3D in the capture.
  const flip = ease.inOutCubic(beat(t, 1.7, 0.6));
  const angle = flip * Math.PI;
  const squash = Math.max(0.02, Math.abs(Math.cos(angle)));
  const showFront = flip > 0.5;
  const lift = Math.sin(flip * Math.PI) * 0.1;

  const settle = ease.spring(beat(t, 2.3, 1.2));
  const idle = t > 2.3 ? Math.sin((t - 2.3) * 1.4) : 0;
  const rotate = mix(dealRotate, 0, settle) + idle * 1.6;

  const shine = beat(t, 2.35, 0.8);

  return (
    // The dark ground alone, no red swirl: the card is the only colour.
    <PostFrame t={t} format={format} showRipple={false}>
      {/* The glow on the table under the card, swelling as it lands. */}
      <div
        className="pointer-events-none absolute rounded-full"
        style={{
          left: format.width / 2 - cardWidth,
          top: centreY - cardWidth * 0.55,
          width: cardWidth * 2,
          height: cardWidth * 1.1,
          background: `radial-gradient(closest-side, ${RED}${data.isMain ? "26" : "14"}, transparent)`,
          opacity: clamp(deal * 1.2) * (0.8 + 0.2 * Math.sin(t * 2)),
        }}
      />

      <div
        className="absolute"
        style={
          {
            "--card-w": `${cardWidth}px`,
            fontSize: cardFontSize,
            width: cardWidth,
            aspectRatio: "7 / 10",
            left: format.width / 2 - cardWidth / 2,
            top: centreY - (cardWidth * 10) / 7 / 2,
            transform: `translate(${dealX}px, ${dealY + idle * 6}px) rotate(${rotate}deg) scale(${(1 + lift) * squash}, ${1 + lift})`,
            opacity: deal > 0 ? 1 : 0,
            filter: `drop-shadow(${12 + lift * 60}px ${16 + lift * 80}px 0 rgba(0,0,0,0.55))`,
          } as CSSProperties
        }
      >
        <div
          className={clsx(
            "absolute inset-0",
            showFront && data.isMain && "shadow-shineRed",
          )}
        >
          {showFront ? <CardFront reward={data} /> : <CardBack />}
        </div>
        {showFront && shine > 0 && shine < 1 && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div
              className="absolute -inset-y-1/4 w-1/3"
              style={{
                left: `${mix(-50, 130, ease.inOutCubic(shine))}%`,
                transform: "rotate(18deg)",
                background: `linear-gradient(90deg, transparent, ${WHITE}55, transparent)`,
              }}
            />
          </div>
        )}
      </div>

      <PixelConfetti
        t={t}
        start={2.25}
        x={format.width / 2}
        y={centreY}
        count={data.isMain ? 70 : 46}
        seed={data.title.length}
      />
    </PostFrame>
  );
}
