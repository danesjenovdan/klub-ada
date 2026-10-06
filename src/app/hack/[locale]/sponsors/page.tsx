"use client";

import { CSSProperties, MouseEvent, useRef, useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import imageLoader from "@/src/app/utils/image-loader";
import { useSanityData } from "@/src/app/utils/use-sanity-data";
import { Window, WindowLoading } from "../components/window";
import { PixelPlanet } from "./pixel-planet";
import { BurstOrigin, PixelBurst } from "./pixel-burst";

const GET_SPONSORS = `*[_type == "hack26Sponsor"] | order(name) {
  name,
  type,
  link,
  image,
  'dimensions': image.asset->metadata.dimensions
}`;

type Tier = "gold" | "silver" | "bronze" | "vibe" | "partner";

type Sponsor = {
  name: string;
  type: Tier;
  link: string;
  image: SanityImageSource;
  dimensions: { width: number; height: number };
};

/**
 * One sponsor tier as a planet in the night sky of the overview. Positions and
 * sizes are fractions of the 1254x617 window body the design was drawn on, so
 * the sky keeps its arrangement at any window size.
 */
type Planet = {
  tier: Tier;
  labelKey: string;
  /** Brand color of the tier: the glow, the label halo and the card borders. */
  color: string;
  x: number;
  y: number;
  size: number;
};

const PLANETS: Planet[] = [
  { tier: "gold", labelKey: "gold", color: "#fbb040", x: 57, y: 78, size: 175 },
  { tier: "partner", labelKey: "media", color: "#8686c2", x: 704, y: 41, size: 105 },
  { tier: "vibe", labelKey: "vibe", color: "#ff85a5", x: 965, y: 166, size: 140 },
  { tier: "silver", labelKey: "silver", color: "#77a4d4", x: 250, y: 384, size: 161 },
  { tier: "bronze", labelKey: "bronze", color: "#ff5757", x: 774, y: 412, size: 147 },
];

const SKY_WIDTH = 1254;
const SKY_HEIGHT = 617;

/** The bigger stars: a plus of four pixels. */
const PLUS_STARS: [number, number][] = [
  [292, 62], [384, 219], [83, 416], [578, 550], [941, 309], [1145, 501], [1186, 58], [858, 115],
];

/** The small stars: a single pixel each. */
const DOT_STARS: [number, number][] = [
  [292, 169], [321, 337], [200, 276], [188, 398], [45, 331], [179, 537], [41, 571], [377, 591],
  [463, 493], [740, 575], [733, 471], [1023, 550], [1217, 591], [1200, 153], [1196, 401],
  [996, 412], [1157, 250], [1059, 104], [961, 31], [637, 140], [459, 106], [563, 27], [60, 27],
];

const pct = (value: number, total: number) => `${(value / total) * 100}%`;

/**
 * Every star twinkles on its own clock. The timing is derived from the star's
 * index rather than drawn at random, so the server and the client agree and
 * two neighbouring stars never blink in step.
 */
const twinkle = (index: number): CSSProperties => ({
  animationDuration: `${2.8 + ((index * 7) % 9) * 0.35}s`,
  animationDelay: `-${((index * 13) % 17) * 0.41}s`,
});

function Stars() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden md:block">
      {PLUS_STARS.map(([x, y], index) => (
        <svg
          key={`${x}-${y}`}
          viewBox="0 0 3 3"
          shapeRendering="crispEdges"
          className="absolute h-3 w-3 fill-white motion-safe:animate-[hack-twinkle_3s_steps(1,end)_infinite]"
          style={{ left: pct(x, SKY_WIDTH), top: pct(y, SKY_HEIGHT), ...twinkle(index) }}
        >
          <rect x="1" y="1" width="1" height="1" />
          <g className="motion-safe:animate-[hack-star-arms_3s_steps(1,end)_infinite]" style={twinkle(index + 3)}>
            <rect x="1" y="0" width="1" height="1" />
            <rect x="1" y="2" width="1" height="1" />
            <rect x="0" y="1" width="1" height="1" />
            <rect x="2" y="1" width="1" height="1" />
          </g>
        </svg>
      ))}
      {DOT_STARS.map(([x, y], index) => (
        <span
          key={`${x}-${y}`}
          className="absolute h-1 w-1 bg-white motion-safe:animate-[hack-twinkle_3s_steps(1,end)_infinite]"
          style={{ left: pct(x, SKY_WIDTH), top: pct(y, SKY_HEIGHT), ...twinkle(index + 11) }}
        />
      ))}
    </div>
  );
}

/** A soft blurred blob of light behind the content, in the given color. */
function Glow({ color, className }: { color: string; className?: string }) {
  return (
    <div
      aria-hidden
      className={clsx(
        "pointer-events-none absolute rounded-full blur-[90px] md:blur-[120px]",
        className,
      )}
      style={{ backgroundColor: color }}
    />
  );
}

const planetLabel =
  "font-heading text-xl font-semibold leading-none tracking-[-0.02em] text-white";

/** Pixel-art corners: the four corner pixels of a box are cut away. */
const pixelCorners =
  "[clip-path:polygon(4px_0,calc(100%-4px)_0,100%_4px,100%_calc(100%-4px),calc(100%-4px)_100%,4px_100%,0_calc(100%-4px),0_4px)]";

function PlanetButton({
  planet,
  hidden,
  onClick,
}: {
  planet: Planet;
  /** The planet has just burst: its pixels are flying, so the button vanishes at once. */
  hidden: boolean;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}) {
  const t = useTranslations("Hackathon.sponsors");

  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={t(`labels.${planet.labelKey}`)}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={clsx(
        "group relative aspect-square w-28 shrink-0 outline-none",
        "md:absolute md:w-[var(--size)] md:left-[var(--x)] md:top-[var(--y)]",
        hidden && "invisible",
      )}
      style={
        {
          "--x": pct(planet.x, SKY_WIDTH),
          "--y": pct(planet.y, SKY_HEIGHT),
          "--size": pct(planet.size, SKY_WIDTH),
        } as CSSProperties
      }
    >
      <PixelPlanet
        tier={planet.tier}
        className="h-full w-full transition-[filter] duration-200 group-hover:[filter:drop-shadow(0_0_14px_var(--glow))] group-focus-visible:[filter:drop-shadow(0_0_14px_var(--glow))]"
        style={{ "--glow": `${planet.color}99` } as CSSProperties}
      />
      <span
        className={clsx(
          planetLabel,
          "absolute inset-0 flex items-center justify-center text-center [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]",
          planet.tier === "vibe" && "whitespace-pre-line",
        )}
      >
        {t(`labels.${planet.labelKey}`)}
      </span>
    </motion.button>
  );
}

function SponsorCard({
  sponsor,
  color,
  index,
}: {
  sponsor: Sponsor;
  color: string;
  index: number;
}) {
  return (
    <motion.a
      href={sponsor.link}
      target="_blank"
      rel="noopener noreferrer"
      title={sponsor.name}
      // Cards deal in one after another once the debris has started to settle.
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut", delay: 0.15 + index * 0.08 }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className={clsx(
        "group flex h-[88px] w-[169px] shrink-0 items-center justify-center border-2 bg-[#0C0303] px-4 py-5 outline-none",
        "transition-shadow duration-200 hover:shadow-[0_0_24px_var(--glow)] focus-visible:shadow-[0_0_24px_var(--glow)]",
        pixelCorners,
      )}
      style={{ borderColor: color, "--glow": `${color}66` } as CSSProperties}
    >
      <Image
        src={imageLoader(sponsor.image, 600)}
        alt={sponsor.name}
        width={sponsor.dimensions.width}
        height={sponsor.dimensions.height}
        className="h-auto max-h-11 w-auto max-w-[134px] object-contain"
      />
    </motion.a>
  );
}

function Overview({
  bursting,
  onSelect,
}: {
  /** The planet that has just been clicked and is flying apart, if any. */
  bursting: Tier | null;
  onSelect: (planet: Planet, event: MouseEvent<HTMLButtonElement>) => void;
}) {
  const t = useTranslations("Hackathon.sponsors");

  return (
    <motion.div
      key="overview"
      initial={{ opacity: 0 }}
      animate={{ opacity: bursting ? 0 : 1 }}
      // Mid-burst the overview has already faded, so leaving must not add a
      // dark pause before the tier view shows through the debris.
      exit={{ opacity: 0, transition: { duration: bursting ? 0 : 0.25 } }}
      transition={{ duration: bursting ? 0.4 : 0.25, ease: "easeOut" }}
      className="relative flex min-h-full flex-col items-center gap-10 md:block"
    >
      <Glow
        color="#ff5757"
        className="left-1/2 top-1/2 h-44 w-60 -translate-x-1/2 -translate-y-1/2 opacity-70 md:opacity-100"
      />
      <div className="relative z-10 flex max-w-[294px] flex-col items-center gap-2 pt-4 text-center md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:pt-0">
        <h1 className="font-heading text-2xl font-bold uppercase tracking-widest text-white md:text-3xl">
          {t("title")}
        </h1>
        <p className="whitespace-pre-line font-heading text-base font-light leading-normal tracking-[-0.02em] text-gray200">
          {t("subtitle")}
        </p>
      </div>
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-6 md:static">
        {PLANETS.map((planet) => (
          <PlanetButton
            key={planet.tier}
            planet={planet}
            hidden={bursting === planet.tier}
            onClick={(event) => onSelect(planet, event)}
          />
        ))}
      </div>
    </motion.div>
  );
}

function TierDetail({
  planet,
  sponsors,
  onBack,
}: {
  planet: Planet;
  sponsors: Sponsor[];
  onBack: () => void;
}) {
  const t = useTranslations("Hackathon");

  return (
    <motion.div
      key={planet.tier}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative flex min-h-full flex-col"
    >
      <Glow
        color={planet.color}
        className="left-1/2 top-[34%] h-48 w-64 -translate-x-1/2 -translate-y-1/2 opacity-60 md:opacity-90"
      />
      <button
        type="button"
        onClick={onBack}
        className="group relative z-10 flex w-fit items-center gap-4 outline-none"
      >
        <img
          src="/assets/hackathon26/sponsors.svg"
          alt=""
          className="h-12 w-12 -rotate-90 transition-transform duration-200 group-hover:-translate-x-1 group-focus-visible:-translate-x-1"
        />
        <span className="font-heading text-base tracking-[0.03em] text-white">
          {t("sponsors.back")}
        </span>
      </button>
      <div className="relative z-10 flex grow flex-col items-center justify-center gap-8 pb-10 md:gap-12">
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className={clsx(
            planetLabel,
            "text-center [text-shadow:0_0_12px_var(--glow),0_0_2px_var(--glow)]",
            planet.tier === "vibe" && "whitespace-pre-line",
          )}
          style={{ "--glow": planet.color } as CSSProperties}
        >
          {t(`sponsors.labels.${planet.labelKey}`)}
        </motion.span>
        {sponsors.length ? (
          <div className="flex max-w-[760px] flex-wrap items-center justify-center gap-[19px]">
            {sponsors.map((sponsor, index) => (
              <SponsorCard
                key={sponsor.name}
                sponsor={sponsor}
                color={planet.color}
                index={index}
              />
            ))}
          </div>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="font-heading text-base text-gray200"
          >
            {t("main_cta")}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}

/** How long after the click the tier view starts to show through the debris. */
const REVEAL_DELAY = 420;

export default function Page() {
  const t = useTranslations("Hackathon");
  const reducedMotion = useReducedMotion();
  const { data, isLoading } = useSanityData({ query: GET_SPONSORS });
  const skyRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<Planet | null>(null);
  const [burst, setBurst] = useState<{ planet: Planet; origin: BurstOrigin } | null>(null);

  const sponsors = (data || []) as Sponsor[];

  const select = (planet: Planet, event: MouseEvent<HTMLButtonElement>) => {
    const sky = skyRef.current?.getBoundingClientRect();
    if (reducedMotion || !sky) {
      setSelected(planet);
      return;
    }
    const button = event.currentTarget.getBoundingClientRect();
    setBurst({
      planet,
      origin: {
        left: button.left - sky.left,
        top: button.top - sky.top,
        size: button.width,
      },
    });
    window.setTimeout(() => setSelected(planet), REVEAL_DELAY);
  };

  return (
    <Window title={t("sponsors.title")}>
      {isLoading ? (
        <WindowLoading />
      ) : (
        <div ref={skyRef} className="relative h-full min-h-[34rem]">
          <Stars />
          <AnimatePresence mode="wait" initial={false}>
            {selected ? (
              <TierDetail
                key={selected.tier}
                planet={selected}
                sponsors={sponsors.filter((s) => s.type === selected.tier)}
                onBack={() => setSelected(null)}
              />
            ) : (
              <Overview
                key="overview"
                bursting={burst?.planet.tier ?? null}
                onSelect={select}
              />
            )}
          </AnimatePresence>
          {burst && (
            <PixelBurst
              key={`${burst.planet.tier}-${burst.origin.left}-${burst.origin.top}`}
              tier={burst.planet.tier}
              origin={burst.origin}
              onDone={() => setBurst(null)}
            />
          )}
        </div>
      )}
    </Window>
  );
}
