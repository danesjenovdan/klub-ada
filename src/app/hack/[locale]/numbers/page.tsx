"use client";

import { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import clsx from "clsx";
import { animate, motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { instrumentSerif, plexMono } from "@/src/app/fonts";
import stat1Src from "@/public/assets/hack-stat-1.png";
import stat2Src from "@/public/assets/hack-stat-2.png";
import stat3Src from "@/public/assets/hack-stat-3.png";
import {
  CardBack,
  Corner,
  cardFace,
  cardFontSize,
  cardRow,
  cardSize,
  table,
} from "../components/card";
import { Window } from "../components/window";
import { FIGURES_2025 } from "./figures";

type Stat = {
  src: StaticImageData;
  value: number;
  /** Printed right after the number, e.g. "€". */
  suffix?: string;
  label: string;
};

/** How long the counter takes to reach the figure once the card is turned. */
const COUNT_SECONDS = 1.4;
/** The flip takes 0.5s; the counter starts as the face comes into view. */
const COUNT_DELAY_SECONDS = 0.25;

/**
 * Counts from zero up to `value` whenever `isRunning` turns true, and rests
 * at zero otherwise. With reduced motion on, it jumps straight to the figure.
 */
function useCounter(value: number, isRunning: boolean) {
  const reducedMotion = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isRunning) {
      setCount(0);
      return;
    }
    if (reducedMotion) {
      setCount(value);
      return;
    }
    const controls = animate(0, value, {
      duration: COUNT_SECONDS,
      delay: COUNT_DELAY_SECONDS,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setCount(Math.round(latest)),
    });
    return () => controls.stop();
  }, [isRunning, value, reducedMotion]);

  return count;
}

/** The red diamond would vanish on the red face, so the face shows it white. */
const whiteCorner = "brightness-0 invert";

/** The face of a card: last year's photo under the figure and its label. */
function StatFace({ stat, isShown }: { stat: Stat; isShown: boolean }) {
  const count = useCounter(stat.value, isShown);

  return (
    <div
      className={clsx(
        cardFace,
        // The turn and the hidden backface must sit on the same element, or
        // the face shows through the back. Red, as asked, with white type.
        "[transform:rotateY(180deg)] overflow-hidden !bg-red text-white",
      )}
    >
      <Image
        src={stat.src}
        alt=""
        fill
        sizes="(min-width: 768px) 33vw, 100vw"
        className="object-cover opacity-20 mix-blend-multiply"
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
          {stat.suffix}
        </span>
        <span
          className={clsx(
            "text-[0.85em] uppercase tracking-[0.125em] text-[#fafafa]",
            plexMono.className,
          )}
        >
          {stat.label}
        </span>
      </div>
      <div className={clsx(cardRow, "relative !text-[#fafafa]")}>
        <Corner className={whiteCorner} />
        <span>AdaHack</span>
        <Corner className={whiteCorner} />
      </div>
    </div>
  );
}

/**
 * One number as a playing card. It lies face down until clicked, then turns
 * over and counts up to the figure.
 */
function StatCard({ stat }: { stat: Stat }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.button
      type="button"
      onClick={() => setIsFlipped((flipped) => !flipped)}
      aria-label={
        isFlipped
          ? `${stat.value}${stat.suffix ?? ""} ${stat.label}`
          : "AdaHack 2025"
      }
      className={clsx(
        "relative block outline-none [perspective:1000px] focus-visible:ring-2 focus-visible:ring-[rgba(255,87,87,0.6)]",
        cardSize,
      )}
      style={{ fontSize: cardFontSize }}
      whileHover={isFlipped ? undefined : { y: -6 }}
      transition={{ y: { duration: 0.2 } }}
    >
      <motion.div
        className="absolute inset-0 [transform-style:preserve-3d]"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <CardBack />
        <StatFace stat={stat} isShown={isFlipped} />
      </motion.div>
    </motion.button>
  );
}

export default function Page() {
  const t = useTranslations("Hackathon");
  const n = useTranslations("Hackathon.numbers");

  // Last edition's numbers, kept until the 2026 event has its own.
  const stats: Stat[] = FIGURES_2025.map(({ labelKey, ...figure }, index) => ({
    ...figure,
    src: [stat1Src, stat2Src, stat3Src][index],
    label: n(labelKey),
  }));

  return (
    <Window title={t("pages.numbers")}>
      {/* `--card-w`: three cards and two gaps fit inside the table's padding
          on a phone, and are capped at the design's 1.5× card from `md`. */}
      <div
        className={clsx(
          "mx-auto flex max-w-[1000px] flex-col gap-8 py-2 md:py-6 [container-type:inline-size]",
          "[--card-w:min(220px,calc((100cqw_-_56px)/3))]",
          "md:[--card-w:min(220px,calc((100cqw_-_108px)/3))]",
          plexMono.className,
        )}
      >
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold uppercase leading-normal tracking-[-0.02em] text-[#fafafa]">
            {n("heading")}
          </h1>
          <p className="text-base font-light leading-normal tracking-[-0.02em] text-[#9d9d9d]">
            {n("subtitle")}
          </p>
        </div>
        <div className={clsx(table, "gap-3 md:gap-[14px] p-4 md:p-10")}>
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </div>
      </div>
    </Window>
  );
}
