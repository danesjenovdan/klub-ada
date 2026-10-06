"use client";

import { CSSProperties } from "react";
import clsx from "clsx";
import Image from "next/image";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import imageLoader from "@/src/app/utils/image-loader";
import { geistPixel } from "@/src/app/fonts";
import { PixelPlanet } from "./pixel-planet";
import { PLANETS, Planet, Sponsor, pixelTitle } from "./model";

/*
 * One sponsor tier: the planet fills the bottom of the window like a world
 * seen from orbit, the tier name hangs in the sky above it in pixel type, and
 * the sponsors' logos float between the two, bare, separated by pixel stars.
 */

export type TierViewProps = {
  planet: Planet;
  sponsors: Sponsor[];
  /** Current width of the window body in CSS pixels, for sizing from the design's 1254px. */
  skyWidth: number;
  onBack: () => void;
  onSelectTier: (planet: Planet) => void;
};

const glowVar = (color: string) => ({ "--glow": color }) as CSSProperties;

/** Scale factor from the 1254px design width, clamped so phones and ultrawides both behave. */
const scaleFor = (skyWidth: number) =>
  Math.min(1.5, Math.max(0.75, skyWidth / 1254));

/**
 * Four-step pixel materialise: nothing, then a quarter, half, and full. Used
 * for anything that arrives after the burst, so it lands in the same stepped
 * language as the twinkling stars.
 */
const materialise = (delay: number) => ({
  initial: { opacity: 0 },
  animate: { opacity: [0, 0, 0.25, 0.25, 0.5, 0.5, 1] },
  transition: {
    duration: 0.45,
    delay,
    times: [0, 0.25, 0.25, 0.5, 0.5, 0.75, 0.75],
    ease: "linear" as const,
  },
});

function TierHeading({ planet, count }: { planet: Planet; count: number }) {
  const t = useTranslations("Hackathon.sponsors");
  return (
    <motion.div
      {...materialise(0.05)}
      className="flex flex-col items-center gap-3 text-center"
    >
      <h2
        className={clsx(
          geistPixel.className,
          pixelTitle,
          "text-4xl text-[var(--fill)] md:text-6xl",
          planet.tier === "vibe" && "whitespace-pre-line",
        )}
        style={
          {
            "--fill": `color-mix(in srgb, ${planet.color} 70%, white)`,
          } as CSSProperties
        }
      >
        {t(`labels.${planet.labelKey}`)}
      </h2>
      <p className=" text-sm text-gray200 md:text-base">
        {t("count", { count })}
      </p>
    </motion.div>
  );
}

function BackButton({ onBack }: { onBack: () => void }) {
  const t = useTranslations("Hackathon.sponsors");
  return (
    <button
      type="button"
      onClick={onBack}
      className="group relative z-10 flex w-fit items-center gap-3 outline-none"
    >
      <img
        src="/assets/hackathon26/sponsors.svg"
        alt=""
        className="h-10 w-10 -rotate-90"
      />
      <span className=" text-sm uppercase tracking-widest text-white md:text-base transition-colors duration-200 group-hover:text-red group-focus-visible:text-red">
        {t("back")}
      </span>
    </button>
  );
}

/** The other four tiers as small planets, so a visitor can hop between systems. */
function OtherPlanets({
  current,
  onSelectTier,
}: {
  current: Planet;
  onSelectTier: (planet: Planet) => void;
}) {
  const t = useTranslations("Hackathon.sponsors");
  return (
    <div className="z-10 md:absolute md:bottom-0 md:right-0">
      <motion.nav
        {...materialise(0.6)}
        aria-label={t("other_tiers")}
        className="flex flex-wrap items-start justify-center gap-5"
      >
        {PLANETS.filter((p) => p.tier !== current.tier).map((planet) => (
          <button
            key={planet.tier}
            type="button"
            onClick={() => onSelectTier(planet)}
            className="group flex w-14 flex-col items-center gap-1.5 outline-none"
          >
            <PixelPlanet
              tier={planet.tier}
              className="h-[30px] w-[30px] transition-[transform,filter] duration-200 group-hover:scale-110 group-hover:[filter:drop-shadow(0_0_10px_var(--glow))] group-focus-visible:scale-110 group-focus-visible:[filter:drop-shadow(0_0_10px_var(--glow))]"
              style={glowVar(`${planet.color}aa`)}
            />
            <span
              className={clsx(
                " text-[11px] leading-tight text-gray300 group-hover:text-white",
                planet.tier === "vibe" && "whitespace-pre-line text-center",
              )}
            >
              {t(`labels.${planet.labelKey}`)}
            </span>
          </button>
        ))}
      </motion.nav>
    </div>
  );
}

/** A plus of pixels in the tier color, dividing one logo from the next. */
function PixelPlus({ color }: { color: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 3 3"
      shapeRendering="crispEdges"
      className="h-[9px] w-[9px]"
      style={{ fill: color }}
    >
      <rect x="1" y="0" width="1" height="3" />
      <rect x="0" y="1" width="3" height="1" />
    </svg>
  );
}

/** A logo on its own, no container: sized by height so wide and square marks weigh the same. */
function Logo({
  sponsor,
  height,
  index,
}: {
  sponsor: Sponsor;
  height: number;
  index: number;
}) {
  return (
    <motion.a
      href={sponsor.link}
      target="_blank"
      rel="noopener noreferrer"
      title={sponsor.name}
      {...materialise(0.3 + index * 0.08)}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
      className="relative z-10 flex items-center outline-none transition-[filter] duration-200 hover:[filter:drop-shadow(0_0_12px_rgba(255,255,255,0.5))] focus-visible:[filter:drop-shadow(0_0_12px_rgba(255,255,255,0.5))]"
      style={{ height }}
    >
      <Image
        src={imageLoader(sponsor.image, 600)}
        alt={sponsor.name}
        width={sponsor.dimensions.width}
        height={sponsor.dimensions.height}
        className="h-full w-auto object-contain"
        style={{ maxWidth: height * 3.4 }}
      />
    </motion.a>
  );
}

function Logos({
  sponsors,
  planet,
  height,
}: {
  sponsors: Sponsor[];
  planet: Planet;
  height: number;
}) {
  const t = useTranslations("Hackathon");
  if (!sponsors.length) {
    return (
      <motion.p
        {...materialise(0.3)}
        className="relative z-10 flex items-center gap-3 text-base text-gray200"
      >
        <PixelPlus color={planet.color} />
        {t("main_cta")}
        <PixelPlus color={planet.color} />
      </motion.p>
    );
  }
  return (
    <div className="flex flex-wrap items-center justify-center gap-y-6">
      {sponsors.map((sponsor, index) => (
        <div key={sponsor.name} className="flex items-center">
          {index > 0 && (
            <span className="mx-7 hidden md:block">
              <PixelPlus color={`${planet.color}99`} />
            </span>
          )}
          <Logo sponsor={sponsor} height={height} index={index} />
        </div>
      ))}
    </div>
  );
}

export function TierView({
  planet,
  sponsors,
  skyWidth,
  onBack,
  onSelectTier,
}: TierViewProps) {
  const s = scaleFor(skyWidth);
  // Capped so each of the planet's 25 cells stays a readable block, not a slab.
  const planetSize = Math.round(Math.min(skyWidth * 0.62, 880));
  const logoHeight = Math.round(50 * s);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative flex min-h-full flex-col overflow-hidden"
    >
      {/* Motion owns `transform` on what it animates, so positioning lives on this wrapper. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-full -translate-x-1/2 -translate-y-[38%] opacity-75"
        style={{ width: planetSize, height: planetSize }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
          className="h-full w-full"
        >
          <PixelPlanet
            tier={planet.tier}
            className="h-full w-full [filter:drop-shadow(0_0_24px_var(--glow))]"
            style={glowVar(`${planet.color}66`)}
          />
        </motion.div>
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0c0303] via-[#0c0303]/40 to-transparent"
      />
      <BackButton onBack={onBack} />
      <div className="relative z-10 flex grow flex-col items-center justify-start gap-10 pt-6 md:pt-10">
        <TierHeading planet={planet} count={sponsors.length} />
        <Logos sponsors={sponsors} planet={planet} height={logoHeight} />
      </div>
      <OtherPlanets current={planet} onSelectTier={onSelectTier} />
    </motion.div>
  );
}
