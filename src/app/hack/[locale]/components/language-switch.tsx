"use client";

import { PointerEvent, useRef, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { useLocale, useTranslations } from "next-intl";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import { lilex } from "@/src/app/fonts";
import { routing } from "@/src/i18n/routing";
import { usePathname, useRouter } from "@/src/i18n/navigation";
import { raised, sunken } from "./bevel";

/** Height of one reel cell, in px (the reel's inner height). */
const CELL = 36;
/** How far the ball has to be dragged down before letting go pulls the lever. */
const PULL_DISTANCE = 22;
const SPIN_SECONDS = 1.1;
/** Lands a little past the target and settles back, like a real reel. */
const SPIN_EASE = [0.12, 0.6, 0.25, 1.12] as const;

/** What can blur past on the reel between the two languages. */
const SYMBOLS = ["duck", "logo", "seven", "SL", "EN"] as const;
type ReelSymbol = (typeof SYMBOLS)[number];

function ReelCell({ symbol }: { symbol: ReelSymbol }) {
  return (
    <div className="h-9 shrink-0 flex items-center justify-center">
      {symbol === "duck" ? (
        <Image
          src="/assets/hackathon26/duck.svg"
          alt=""
          width={35}
          height={24}
          className="h-6 w-auto"
        />
      ) : symbol === "logo" ? (
        <Image
          src="/assets/hackathon/logo-a.svg"
          alt=""
          width={20}
          height={24}
          className="h-6 w-auto"
        />
      ) : symbol === "seven" ? (
        <span className="text-[22px] font-bold text-red">7</span>
      ) : (
        <span className="text-lg font-bold tracking-wide">{symbol}</span>
      )}
    </div>
  );
}

/**
 * The language switch in the navbar, drawn as a little Windows-grey slot
 * machine: a reel showing the current language and a lever with a red ball.
 * Pulling the lever (clicking it, or dragging the ball down) or clicking the
 * reel spins the reel past a few symbols until it lands on the other language.
 * The route change starts as the reel starts, so the spin covers the load.
 * With reduced motion it switches straight away. Keeps the current page, so
 * switching from the FAQ lands on the FAQ.
 */
export function LanguageSwitch() {
  const t = useTranslations("Hackathon");
  const locale = useLocale();
  const router = useRouter();
  // The middleware rewrites `/{locale}/...` to `/hack/{locale}/...`; strip the
  // internal prefix in case it leaks into the pathname, so the visible URL
  // never gains a `/hack`.
  const pathname = usePathname().replace(/^\/hack(?=\/|$)/, "") || "/";
  const shouldReduceMotion = useReducedMotion();

  /** The reel's strip while it spins; at rest it shows just the locale. */
  const [spinningCells, setSpinningCells] = useState<ReelSymbol[] | null>(null);
  const stripY = useMotionValue(0);
  /** 1 is the lever standing up, -1 is it pulled all the way down. */
  const armScale = useMotionValue(1);
  const isBusy = useRef(false);
  const drag = useRef<{ startY: number; hasMoved: boolean } | null>(null);

  const spin = () => {
    if (isBusy.current) return;
    const current = locale.toUpperCase() as ReelSymbol;
    const target = routing.locales.find((option) => option !== locale)!;
    router.replace({ pathname }, { locale: target, scroll: false });
    if (shouldReduceMotion) return;

    isBusy.current = true;
    animate(armScale, [armScale.get(), -1, -0.92, 1], {
      duration: 0.62,
      times: [0, 0.38, 0.52, 1],
      ease: [0.3, 0, 0.3, 1],
    });
    const blur = Array.from(
      { length: 12 + Math.floor(Math.random() * 4) },
      () => SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
    );
    const cells = [current, ...blur, target.toUpperCase() as ReelSymbol];
    setSpinningCells(cells);
    stripY.set(0);
    animate(stripY, -(cells.length - 1) * CELL, {
      duration: SPIN_SECONDS,
      ease: SPIN_EASE,
      delay: 0.14,
    }).then(() => {
      setSpinningCells(null);
      stripY.set(0);
      isBusy.current = false;
    });
  };

  const onLeverPointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    if (isBusy.current) return;
    drag.current = { startY: event.clientY, hasMoved: false };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onLeverPointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    if (!drag.current) return;
    const distance = event.clientY - drag.current.startY;
    if (Math.abs(distance) > 3) drag.current.hasMoved = true;
    if (!drag.current.hasMoved) return;
    armScale.set(Math.max(-1, Math.min(1, 1 - distance / PULL_DISTANCE)));
  };

  const onLeverPointerUp = (event: PointerEvent<HTMLButtonElement>) => {
    if (!drag.current) return;
    const { startY, hasMoved } = drag.current;
    drag.current = null;
    if (!hasMoved || event.clientY - startY > PULL_DISTANCE) {
      spin();
    } else {
      // Let go too early: the lever springs back up and nothing happens.
      animate(armScale, 1, { type: "spring", stiffness: 600, damping: 15 });
    }
  };

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        aria-label={t("switch_language")}
        title={t("switch_language")}
        onClick={spin}
        className={clsx(
          lilex.className,
          "relative w-[58px] h-10 overflow-hidden bg-black text-white ring-2 ring-gray200 outline-none focus-visible:ring-white",
          sunken,
        )}
      >
        <motion.div style={{ y: stripY }} className="flex flex-col">
          {(spinningCells ?? [locale.toUpperCase() as ReelSymbol]).map(
            (symbol, index) => (
              <ReelCell key={index} symbol={symbol} />
            ),
          )}
        </motion.div>
        {/* The curve of the drum: the reel fades to black at top and bottom. */}
        <span className="absolute inset-0 pointer-events-none bg-[linear-gradient(#000_0,transparent_30%,transparent_70%,#000_100%)] opacity-[.85]" />
      </button>
      <button
        type="button"
        aria-label={t("switch_language")}
        title={t("switch_language")}
        onPointerDown={onLeverPointerDown}
        onPointerMove={onLeverPointerMove}
        onPointerUp={onLeverPointerUp}
        onPointerCancel={() => {
          drag.current = null;
          armScale.set(1);
        }}
        // Pointer presses are handled above; this catches Enter and Space.
        onClick={(event) => event.detail === 0 && spin()}
        className="relative w-[26px] h-16 shrink-0 cursor-grab active:cursor-grabbing touch-none outline-none focus-visible:outline-1 focus-visible:outline-dotted focus-visible:outline-white"
      >
        <span
          className={clsx(
            "absolute inset-x-[3px] top-1/2 -translate-y-1/2 h-5 bg-gray200",
            raised,
          )}
        />
        {/* The arm pivots in the middle of the housing and flips toward the
            viewer as it is pulled, which reads as swinging down. */}
        <motion.span
          style={{ scaleY: armScale }}
          className="absolute left-1/2 bottom-1/2 -ml-0.5 w-1 h-[22px] origin-bottom bg-gray900 shadow-[1px_0_0_var(--color-gray-300)]"
        >
          <span className="pixel-corners-sm absolute left-1/2 -top-[7px] -ml-[7px] w-3.5 h-3.5 bg-red shadow-[inset_2px_2px_0_var(--color-red-300),inset_-2px_-2px_0_var(--color-red-800)]" />
        </motion.span>
      </button>
    </div>
  );
}
