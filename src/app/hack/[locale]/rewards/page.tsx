"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { instrumentSerif, plexMono } from "@/src/app/fonts";
import { useSanityData } from "@/src/app/utils/use-sanity-data";
import {
  CardBack,
  Corner,
  cardFace,
  cardFontSize,
  cardRow,
  cardSize,
  table,
} from "../components/card";
import { Window, WindowLoading } from "../components/window";

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

/** The face of a card: the prize. */
function CardFront({ reward }: { reward: Reward }) {
  return (
    <div
      className={clsx(
        cardFace,
        "[transform:rotateY(180deg)] text-white",
        reward.isMain && "shadow-shineRed",
      )}
    >
      <div className={clsx(cardRow, "items-start normal-case tracking-normal")}>
        <span className="font-semibold leading-none">{reward.amount}</span>
        <Corner icon={reward.icon} />
      </div>
      <div className="flex flex-col items-center gap-1 px-1 text-center">
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

const DEAL_STAGGER = 0.15;

const dealTransition = (index: number) => ({
  duration: 0.55,
  ease: [0.22, 1, 0.36, 1] as const,
  delay: index * DEAL_STAGGER,
});

/**
 * One reward as a playing card. The same `layoutId` is used in the deck and in
 * its slot on the table, so when the deck is dealt each card glides from one
 * to the other. It lies face down until clicked, then turns over to show the
 * prize.
 */
function RewardCard({
  reward,
  index,
  isDealt,
  isFlipped,
  onClick,
  className,
  style,
}: {
  reward: Reward;
  index: number;
  isDealt: boolean;
  isFlipped: boolean;
  onClick: () => void;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.button
      type="button"
      layoutId={`reward-card-${index}`}
      // Deal the cards one after another, like solitaire laying out its piles:
      // a quick flick off the deck that eases into place without bouncing.
      transition={{ layout: dealTransition(index) }}
      onClick={onClick}
      data-cursor={isDealt ? index : "deck"}
      aria-label={
        isFlipped ? `${reward.title}: ${reward.amount}` : "AdaHack 2026"
      }
      className={clsx(
        "relative block outline-none [perspective:1000px] focus-visible:ring-2 focus-visible:ring-[rgba(255,87,87,0.6)]",
        className,
      )}
      style={{ fontSize: cardFontSize, ...style }}
    >
      <motion.div
        className="absolute inset-0 [transform-style:preserve-3d]"
        // Lift the card on its way out, so it arcs up off the deck instead of
        // sliding flat along the table. Flipping is a plain turn in place.
        initial={false}
        animate={{
          rotateY: isFlipped ? 180 : 0,
          y: isDealt ? [0, -40, 0] : 0,
          rotate: isDealt ? [0, -6, 0] : 0,
        }}
        transition={{
          rotateY: { duration: 0.5 },
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
      >
        <CardBack />
        <CardFront reward={reward} />
      </motion.div>
    </motion.button>
  );
}

type CursorAction = "deal" | "show" | "fold";

/**
 * A little tag that trails the mouse over the cards and says, in poker terms,
 * what a click will do: deal the deck, show a card, or fold it back face down.
 * It is portalled to the body because the window is translated, which would
 * otherwise turn `fixed` into "fixed to the window".
 */
function CursorTag({
  action,
  x,
  y,
}: {
  action: CursorAction | null;
  x: ReturnType<typeof useMotionValue<number>>;
  y: ReturnType<typeof useMotionValue<number>>;
}) {
  const t = useTranslations("Hackathon.prize_deck.cursor");
  const [isMounted, setIsMounted] = useState(false);
  // Trail the pointer a touch, so the tag feels dragged along rather than
  // glued on.
  const springX = useSpring(x, { stiffness: 900, damping: 50, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 900, damping: 50, mass: 0.4 });

  useEffect(() => setIsMounted(true), []);
  if (!isMounted) return null;

  return createPortal(
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100]"
      style={{ x: springX, y: springY }}
    >
      <AnimatePresence>
        {action && (
          <motion.span
            key="tag"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.12, ease: "easeOut" }}
            className={clsx(
              "ml-4 mt-5 block origin-top-left whitespace-nowrap border border-red bg-[#170d10] px-2 py-1 text-xs uppercase tracking-[0.125em] text-red shadow-[2px_2px_0_rgba(255,87,87,0.35)]",
              plexMono.className,
            )}
          >
            {t(action)}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>,
    document.body,
  );
}

/**
 * The prize deck: a stack of face-down cards beside a card table. Clicking the
 * deck deals one card into each slot on the table; clicking a dealt card turns
 * it over.
 */
function PrizeDeck({ rewards }: { rewards: Reward[] }) {
  const t = useTranslations("Hackathon.prize_deck");
  const [isDealt, setIsDealt] = useState(false);
  const [flipped, setFlipped] = useState<boolean[]>(() =>
    rewards.map(() => false),
  );

  const flip = (index: number) =>
    setFlipped((cards) => cards.map((card, i) => (i === index ? !card : card)));

  // The card under the mouse ("deck" or a dealt card's index), for the cursor
  // tag. The tag's word is worked out from state, so it updates the moment a
  // click deals or flips without waiting for the mouse to move. Touch has no
  // hover, so the tag only follows a mouse or pen.
  const [hovered, setHovered] = useState<string | null>(null);
  const cursorAction: CursorAction | null =
    hovered === null
      ? null
      : hovered === "deck"
        ? isDealt
          ? null
          : "deal"
        : flipped[Number(hovered)]
          ? "fold"
          : "show";
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const trackCursor = (event: React.PointerEvent) => {
    if (event.pointerType === "touch") return;
    cursorX.set(event.clientX);
    cursorY.set(event.clientY);
    const card = (event.target as Element).closest("[data-cursor]");
    setHovered(card?.getAttribute("data-cursor") ?? null);
  };

  return (
    <LayoutGroup>
      <CursorTag action={cursorAction} x={cursorX} y={cursorY} />
      {/* The numbers subtracted below are everything beside the cards in a
          row: on a phone the table's padding and one gap (two cards per row),
          from `md` the 220px column, the 32px gap to the table, the table's
          padding and four gaps (five cards per row). */}
      <div
        onPointerMove={trackCursor}
        onPointerLeave={() => setHovered(null)}
        className={clsx(
          "flex min-h-full flex-col gap-8 md:flex-row [container-type:inline-size]",
          "[--card-w:min(160px,calc((100cqw_-_44px)/2))]",
          "md:[--card-w:min(220px,calc((100cqw_-_388px)/5))]",
        )}
      >
        <div className="flex shrink-0 flex-col gap-10 md:w-[220px]">
          <div className={clsx("flex flex-col gap-2", plexMono.className)}>
            <h1 className="text-2xl font-semibold uppercase leading-normal tracking-[-0.02em] text-[#fafafa]">
              {t("heading")}
            </h1>
            <p className="text-base font-light leading-normal tracking-[-0.02em] text-[#9d9d9d]">
              {t("subtitle")}
            </p>
          </div>
          {/* The deck: every card not yet dealt, stacked with a little offset
              so it has visible depth. The first card lies on top. Its spot is
              marked like the slots on the table, so it reads as the draw pile
              once it is empty. */}
          <div
            className={clsx(
              "relative grid border border-dashed border-[rgba(255,87,87,0.25)]",
              cardSize,
            )}
            aria-label={t("deal")}
            role={isDealt ? undefined : "group"}
          >
            {!isDealt &&
              rewards.map((reward, index) => (
                <RewardCard
                  key={reward.title}
                  reward={reward}
                  index={index}
                  isDealt={false}
                  isFlipped={false}
                  onClick={() => setIsDealt(true)}
                  className="[grid-area:1/1] h-full w-full"
                  style={{
                    translate: `${index * 4}px ${index * 4}px`,
                    zIndex: rewards.length - index,
                  }}
                />
              ))}
          </div>
        </div>
        {/* The table: felt with a rail around it and one marked slot per card,
            so it reads as a card table before anything is dealt. */}
        <div
          className={clsx(
            table,
            "grow gap-3 md:gap-[14px] p-4 md:p-10 min-h-[18rem]",
          )}
        >
          {rewards.map((reward, index) => (
            <div
              key={reward.title}
              className={clsx(
                "relative border border-dashed border-[rgba(255,87,87,0.25)]",
                cardSize,
              )}
            >
              {isDealt && (
                <RewardCard
                  reward={reward}
                  index={index}
                  isDealt
                  isFlipped={flipped[index]}
                  onClick={() => flip(index)}
                  className="absolute inset-0 h-full w-full"
                  // Rise above the deck and the cards already dealt while in
                  // flight, so a card never slides under one dealt before it.
                  style={{ zIndex: rewards.length + index }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </LayoutGroup>
  );
}

export default function Page() {
  const t = useTranslations("Hackathon");
  const locale = useLocale();
  const { data, isLoading } = useSanityData({
    query: GET_REWARDS,
    params: { language: locale },
  });

  const rewards = (data || []) as Reward[];

  return (
    <Window title={t("pages.rewards")}>
      {isLoading ? (
        <WindowLoading />
      ) : rewards.length ? (
        <PrizeDeck rewards={rewards} />
      ) : (
        <p className="font-paragraph text-base">{t("main_cta")}</p>
      )}
    </Window>
  );
}
