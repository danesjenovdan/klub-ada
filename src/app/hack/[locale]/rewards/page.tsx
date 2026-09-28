"use client";

import { useState } from "react";
import clsx from "clsx";
import { motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import imageLoader from "@/src/app/utils/image-loader";
import { instrumentSerif } from "@/src/app/fonts";
import { useSanityData } from "@/src/app/utils/use-sanity-data";
import { Window } from "../components/window";

const GET_REWARDS = `*[_type == "hack26Reward"] | order(_createdAt) {
  'title': coalesce(title[$language], title.sl),
  'subtitle': coalesce(subtitle[$language], subtitle.sl),
  'amount': coalesce(amount[$language], amount.sl),
  isMain,
  icon
}`;

type Reward = {
  amount: string;
  title: string;
  subtitle?: string;
  isMain?: boolean;
  icon?: SanityImageSource;
};

const cardFace =
  "absolute inset-0 border-2 border-red bg-[#000] [backface-visibility:hidden]";

/** Top and bottom edge of a card: corner art and labels on one line. */
const cardRow =
  "absolute inset-x-2 flex justify-between text-xs md:text-sm tracking-wider text-red";

/**
 * Corner art: the reward's own icon if it has one, pixels otherwise. The
 * turned-over card has less going on in its corners, so it draws them larger.
 */
function PixelCorner({
  icon,
  large,
}: {
  icon?: SanityImageSource;
  large?: boolean;
}) {
  return icon ? (
    <img
      src={imageLoader(icon)}
      alt=""
      className="h-6 md:h-8 w-auto max-w-[50%] object-contain"
    />
  ) : (
    <img
      src="/assets/hackathon26/card-corner.svg"
      alt=""
      className={clsx("shrink-0", large ? "w-3.5 md:w-4" : "w-2.5 md:w-3")}
    />
  );
}

const DEAL_STAGGER = 0.15;

const dealTransition = (index: number) => ({
  duration: 0.55,
  ease: [0.22, 1, 0.36, 1] as const,
  delay: index * DEAL_STAGGER,
});

/**
 * One reward as a playing card. It lies face down until clicked, then turns
 * over to show the prize.
 */
function RewardCard({
  reward,
  index,
  count,
  isDealt,
  onClick,
}: {
  reward: Reward;
  index: number;
  count: number;
  isDealt: boolean;
  onClick: () => void;
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  // The first card lies on top of the deck, so it is also the first dealt.
  const delay = index * DEAL_STAGGER;

  return (
    <motion.button
      type="button"
      layout
      // Lift each card on its way out, so it arcs up off the deck instead of
      // sliding flat along the table.
      animate={isDealt ? { y: [0, -40, 0], rotate: [0, -6, 0] } : undefined}
      // Deal the cards one after another, like solitaire laying out its piles:
      // a quick flick off the deck that eases into place without bouncing.
      // The layout move, lift and spin share one clock so they land together.
      transition={{
        layout: dealTransition(index),
        y: {
          ...dealTransition(index),
          ease: ["easeOut", "easeIn"],
          times: [0, 0.4, 1],
        },
        rotate: {
          ...dealTransition(index),
          ease: "easeOut",
          times: [0, 0.3, 1],
        },
      }}
      onClick={() =>
        isDealt ? setIsFlipped((flipped) => !flipped) : onClick()
      }
      aria-label={
        isFlipped ? `${reward.title}: ${reward.amount}` : "AdaHack 2026"
      }
      className={clsx(
        // Five fit in one row on a laptop; narrower screens wrap them.
        "relative w-36 md:w-44 aspect-[5/7] shrink-0 [perspective:1000px]",
        // Stacked: every card shares one grid cell, nudged a little so the
        // deck has visible depth.
        !isDealt && "[grid-area:1/1]",
      )}
      style={
        isDealt
          ? {
              // Rise above the deck and the cards already dealt at the moment
              // this card leaves, not before, so it never slides under them.
              zIndex: count + index,
              transition: `z-index 0s ${delay}s`,
            }
          : {
              translate: `${index * -6}px ${index * 6}px`,
              zIndex: count - index,
            }
      }
    >
      <motion.div
        className="absolute inset-0 [transform-style:preserve-3d]"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <div
          className={clsx(
            cardFace,
            "flex items-center justify-center text-white",
          )}
        >
          <div className={clsx(cardRow, "top-2 items-center")}>
            <PixelCorner />
            <span className="uppercase font-bold">AdaHack</span>
            <PixelCorner />
          </div>
          <img
            src="/assets/hackathon26/card-duck.svg"
            alt=""
            className="w-1/2"
          />
          <div className={clsx(cardRow, "bottom-2 items-center")}>
            <PixelCorner />
            <span className="font-bold">2026</span>
            <PixelCorner />
          </div>
        </div>
        <div
          className={clsx(
            cardFace,
            "[transform:rotateY(180deg)] flex flex-col items-center justify-center gap-1 px-3 text-center font-paragraph text-white",
            reward.isMain && "bg-[#1f0a0a] shadow-shineRed",
          )}
        >
          <div className={clsx(cardRow, "top-2 items-start")}>
            <span className="font-bold leading-none">{reward.amount}</span>
            <PixelCorner icon={reward.icon} large />
          </div>
          <div className={clsx(cardRow, "bottom-2 items-end")}>
            <PixelCorner icon={reward.icon} large />
            <span className="rotate-180 font-bold leading-none">
              {reward.amount}
            </span>
          </div>
          <span
            className={clsx(
              "text-2xl md:text-3xl leading-tight",
              instrumentSerif.className,
            )}
          >
            {reward.amount}
          </span>
          <span className="text-xs md:text-sm leading-tight">
            {reward.title}
          </span>
          {reward.subtitle && (
            <span className="text-[10px] md:text-xs leading-tight text-gray200">
              {reward.subtitle}
            </span>
          )}
        </div>
      </motion.div>
    </motion.button>
  );
}

export default function Page() {
  const t = useTranslations("Hackathon");
  const locale = useLocale();
  const { data } = useSanityData({
    query: GET_REWARDS,
    params: { language: locale },
  });
  const [isDealt, setIsDealt] = useState(false);

  const rewards = (data || []) as Reward[];

  return (
    <Window title={t("pages.rewards")}>
      {rewards.length ? (
        <div className="flex min-h-full flex-col gap-2">
          <h1 className="mx-auto w-full max-w-[1000px] font-heading text-2xl font-bold uppercase tracking-widest text-white md:text-3xl">
            {t("prize_deck.heading")}
          </h1>
          <p className="mx-auto w-full max-w-[1000px] font-heading text-sm text-gray400">
            {t("prize_deck.subtitle")}
          </p>
          <div
            className={clsx(
              "grow mt-4",
              isDealt
                ? "flex flex-wrap items-center content-center justify-center gap-4 max-w-[1000px] mx-auto"
                : "grid content-end justify-start pb-4 pl-6",
            )}
          >
            {rewards.map((reward, index) => (
              <RewardCard
                key={reward.title}
                reward={reward}
                index={index}
                count={rewards.length}
                isDealt={isDealt}
                onClick={() => setIsDealt(true)}
              />
            ))}
          </div>
        </div>
      ) : (
        <p className="font-paragraph text-base">{t("main_cta")}</p>
      )}
    </Window>
  );
}
