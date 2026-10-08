"use client";

import {
  CSSProperties,
  MouseEvent,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import clsx from "clsx";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { useSanityData } from "@/src/app/utils/use-sanity-data";
import { lilex, plexMono } from "@/src/app/fonts";
import { Window, WindowLoading } from "../components/window";
import { SPONSORS_FIXTURES } from "../_dev/fixtures";
import { PixelPlanet } from "./pixel-planet";
import { BurstOrigin, PixelBurst } from "./pixel-burst";
import { TierView } from "./tier-view";
import {
  PLANETS,
  Planet,
  SKY_HEIGHT,
  SKY_WIDTH,
  Sponsor,
  Tier,
  pct,
  roundStroke,
} from "./model";

const GET_SPONSORS = `*[_type == "hack26Sponsor"] | order(name) {
  name,
  type,
  link,
  image,
  'dimensions': image.asset->metadata.dimensions
}`;

/** The bigger stars: a plus of four pixels. */
const PLUS_STARS: [number, number][] = [
  [292, 62],
  [384, 219],
  [83, 416],
  [578, 550],
  [941, 309],
  [1145, 501],
  [1186, 58],
  [858, 115],
];

/** The small stars: a single pixel each. */
const DOT_STARS: [number, number][] = [
  [292, 169],
  [321, 337],
  [200, 276],
  [188, 398],
  [45, 331],
  [179, 537],
  [41, 571],
  [377, 591],
  [463, 493],
  [740, 575],
  [733, 471],
  [1023, 550],
  [1217, 591],
  [1200, 153],
  [1196, 401],
  [996, 412],
  [1157, 250],
  [1059, 104],
  [961, 31],
  [637, 140],
  [459, 106],
  [563, 27],
  [60, 27],
];

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
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 hidden md:block"
    >
      {PLUS_STARS.map(([x, y], index) => (
        <svg
          key={`${x}-${y}`}
          viewBox="0 0 3 3"
          shapeRendering="crispEdges"
          className="absolute h-3 w-3 fill-white motion-safe:animate-[hack-twinkle_3s_steps(1,end)_infinite]"
          style={{
            left: pct(x, SKY_WIDTH),
            top: pct(y, SKY_HEIGHT),
            ...twinkle(index),
          }}
        >
          <rect x="1" y="1" width="1" height="1" />
          <g
            className="motion-safe:animate-[hack-star-arms_3s_steps(1,end)_infinite]"
            style={twinkle(index + 3)}
          >
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
          style={{
            left: pct(x, SKY_WIDTH),
            top: pct(y, SKY_HEIGHT),
            ...twinkle(index + 11),
          }}
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

const planetLabel = clsx(
  lilex.className,
  "text-xl font-bold leading-none tracking-[-0.02em] text-white",
);

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
          "absolute inset-0 flex items-center justify-center text-center",
          planet.tier === "vibe" && "whitespace-pre-line",
        )}
        style={roundStroke(planet.color, "0.08em")}
      >
        {t(`labels.${planet.labelKey}`)}
      </span>
    </motion.button>
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
        <h1
          className={clsx(
            lilex.className,
            "whitespace-nowrap text-[26px] font-bold lowercase leading-none text-white md:text-[30px]",
          )}
          style={roundStroke("#ff5757", "0.05em")}
        >
          {t("title")}
        </h1>
        <p
          className={clsx(
            plexMono.className,
            "max-w-[36ch] whitespace-pre-line text-sm font-normal leading-snug tracking-[-0.02em] text-gray200 md:text-base",
          )}
        >
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

/**
 * Size of an element, kept current as it resizes. `mounted` tells the hook
 * when the element exists, since the sky only renders once the data is in.
 */
function useElementSize(ref: RefObject<HTMLElement | null>, mounted: boolean) {
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const element = ref.current;
    if (!mounted || !element) return;
    const observer = new ResizeObserver(([entry]) =>
      setSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      }),
    );
    observer.observe(element);
    setSize({ width: element.clientWidth, height: element.clientHeight });
    return () => observer.disconnect();
  }, [ref, mounted]);
  return size;
}

/** How long after the click the tier view starts to show through the debris. */
const REVEAL_DELAY = 420;

export default function Page() {
  const t = useTranslations("Hackathon");
  const reducedMotion = useReducedMotion();
  const { data, isLoading } = useSanityData({
    query: GET_SPONSORS,
    fixtures: SPONSORS_FIXTURES,
  });
  const skyRef = useRef<HTMLDivElement>(null);
  const { width: skyWidth } = useElementSize(
    skyRef,
    !isLoading,
  );
  const [selected, setSelected] = useState<Planet | null>(null);
  const [burst, setBurst] = useState<{
    planet: Planet;
    origin: BurstOrigin;
  } | null>(null);
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
              <TierView
                key={selected.tier}
                planet={selected}
                sponsors={sponsors.filter((s) => s.type === selected.tier)}
                skyWidth={skyWidth}
                onSelectTier={setSelected}
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
