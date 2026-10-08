"use client";

import { CSSProperties, Fragment } from "react";
import clsx from "clsx";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import imageLoader from "@/src/app/utils/image-loader";
import { lilex } from "@/src/app/fonts";
import { PixelPlanet } from "./pixel-planet";
import { logoSize, useTrimmedLogo } from "./trim-logo";
import { PLANETS, Planet, Sponsor, roundStroke } from "./model";

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

/*
 * The rocket from the design (mkt, "Group 207"), drawn in the design's own
 * pixels on its 128px-tall frame and scaled as a whole: speed lines and
 * swept fins in the tier color at the back, a hull that stretches to fit the logo, and a
 * stepped nose pointing right. The hull and nose are drawn in 4px lines, the
 * fins and speed lines in 8px. The inside is dark because the logos are white.
 */
const ROCKET_HEIGHT = 128;
/** Where the hull's top and bottom edges sit in the frame, and their weight. */
const HULL_TOP = 28;
const HULL_BOTTOM = 100;
const LINE = 4;
/** The nose's diagonal: seven 4px steps down to an 8px-tall tip. */
const NOSE_STEPS = 7;

function RocketSvg({
  width,
  scale,
  children,
}: {
  width: number;
  scale: number;
  children: React.ReactNode;
}) {
  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${width} ${ROCKET_HEIGHT}`}
      width={width * scale}
      height={ROCKET_HEIGHT * scale}
      shapeRendering="crispEdges"
      className="shrink-0"
    >
      {children}
    </svg>
  );
}

/**
 * The upper fin, row by row in 4px cells as `[from, to)`: swept back from
 * the hull's top edge (row 7) to a point behind the back wall.
 */
const FIN_ROWS: [number, number][] = [
  [4, 8],
  [5, 10],
  [6, 12],
  [7, 14],
  [8, 16],
  [9, 18],
];

/**
 * A fin in the tier color with a one-cell white outline, open where it sits
 * on the hull; `flip` mirrors it below. Drawn in cells, inside `scale(4)`.
 */
function Fin({ flip }: { flip?: boolean }) {
  const cells = ROCKET_HEIGHT / LINE;
  const y = (row: number) => (flip ? cells - 1 - row : row);
  const fill: [number, number, number][] = [];
  const line: [number, number, number][] = [];
  FIN_ROWS.forEach(([a, b], i) => {
    const row = i + 1;
    fill.push([a, y(row), b - a]);
    line.push([a, y(row), 1], [b - 1, y(row), 1]);
    // The part of the row the one above doesn't cover is outer edge too.
    const above = FIN_ROWS[i - 1];
    if (!above) line.push([a, y(row), b - a]);
    else if (above[1] < b) line.push([above[1], y(row), b - above[1]]);
  });
  const rects = (boxes: [number, number, number][]) =>
    boxes.map(([x, row, w]) => (
      <rect key={`${x}-${row}-${w}`} x={x} y={row} width={w} height="1" />
    ));
  return (
    <>
      <g style={{ fill: "var(--fin)" }}>{rects(fill)}</g>
      <g className="fill-[var(--line)]">{rects(line)}</g>
    </>
  );
}

function SpeedLine({
  x,
  y,
  width,
  delay,
}: {
  x: number;
  y: number;
  width: number;
  delay: number;
}) {
  return (
    <rect
      x={x}
      y={y}
      width={width}
      height="8"
      // On hover the exhaust stretches back in two hard steps: thrust.
      className="transition-transform duration-150 ease-[steps(2,end)] motion-safe:animate-[hack-twinkle_1.2s_steps(1,end)_infinite] [@media(hover:hover)]:group-hover:[transform:scaleX(1.5)] group-focus-visible:[transform:scaleX(1.5)]"
      style={{
        animationDelay: `${delay}s`,
        transformBox: "fill-box",
        transformOrigin: "right",
      }}
    />
  );
}

function RocketTail({ scale }: { scale: number }) {
  return (
    <RocketSvg width={80} scale={scale}>
      <rect
        x="40"
        y={HULL_TOP + LINE}
        width="40"
        height={HULL_BOTTOM - HULL_TOP - 2 * LINE}
        style={{ fill: "var(--hull)" }}
      />
      <g transform={`scale(${LINE})`}>
        <Fin />
        <Fin flip />
      </g>
      <g className="fill-[var(--line)]">
        {/* Speed lines, flickering out of step with each other. */}
        <SpeedLine x={12} y={44} width={16} delay={0} />
        <SpeedLine x={4} y={60} width={24} delay={-0.4} />
        <SpeedLine x={12} y={76} width={16} delay={-0.8} />
        {/* Back wall, and the start of the hull's top and bottom edges. */}
        <rect
          x="36"
          y={HULL_TOP}
          width={LINE}
          height={HULL_BOTTOM - HULL_TOP}
        />
        <rect x="40" y={HULL_TOP} width="40" height={LINE} />
        <rect x="40" y={HULL_BOTTOM - LINE} width="40" height={LINE} />
      </g>
    </RocketSvg>
  );
}

function RocketNose({ scale }: { scale: number }) {
  const steps = Array.from({ length: NOSE_STEPS }, (_, i) => i * LINE);
  const top = HULL_TOP + LINE;
  const bottom = HULL_BOTTOM - LINE;
  const tip = steps.length * LINE;
  return (
    <RocketSvg width={32} scale={scale}>
      {/* The nose cone is painted in the tier color, like the fins. */}
      <g style={{ fill: "var(--fin)" }}>
        {steps.map((d) => (
          <Fragment key={d}>
            <rect x="0" y={top + d} width={d} height={LINE} />
            <rect x="0" y={bottom - LINE - d} width={d} height={LINE} />
          </Fragment>
        ))}
        <rect x="0" y={top + tip} width={tip} height={8} />
      </g>
      <g className="fill-[var(--line)]">
        {/* The seam between the dark hull and the painted cone. */}
        <rect x="0" y={HULL_TOP} width={LINE} height={HULL_BOTTOM - HULL_TOP} />
        {steps.map((d) => (
          <Fragment key={d}>
            <rect x={d} y={top + d} width="8" height={LINE} />
            <rect x={d} y={bottom - LINE - d} width="8" height={LINE} />
          </Fragment>
        ))}
        <rect x={tip} y={top + tip} width={LINE} height="8" />
      </g>
    </RocketSvg>
  );
}

/** Strong ease-out: rockets arrive fast and settle. */
const EASE_OUT = [0.23, 1, 0.32, 1] as const;

/** A sponsor's logo riding in the hull of a pixel rocket. */
function Logo({
  sponsor,
  scale,
  index,
  color,
}: {
  sponsor: Sponsor;
  scale: number;
  index: number;
  color: string;
}) {
  const reduceMotion = useReducedMotion();
  const logo = useTrimmedLogo(
    imageLoader(sponsor.image, 1200),
    sponsor.dimensions.width / sponsor.dimensions.height,
  );
  // Trimmed and sized by area, so every logo carries the same weight; a
  // wordmark lands about half the hull's inner height, as in the design.
  const size = logoSize(
    logo.ratio,
    2800 * scale * scale,
    140 * scale,
    44 * scale,
  );
  const delay = 0.3 + index * 0.06;
  return (
    <motion.a
      href={sponsor.link}
      target="_blank"
      rel="noopener noreferrer"
      {...materialise(delay)}
      whileTap={{ scale: 0.97 }}
      // Hover matches the desktop shortcuts: the rocket grows a little,
      // brightens and glows in its tier color around its own outline.
      className="group relative z-10 block outline-none [--line:#fff]"
      style={
        {
          "--tier": color,
          // The hull is the night sky itself, so the logo sits on plain dark;
          // the tier color goes on the fins.
          "--hull": "#0c0303",
          "--fin": `color-mix(in srgb, ${color} 80%, #0c0303)`,
          "--bob": `${-LINE * scale}px`,
        } as CSSProperties
      }
    >
      {/* Flies in from the left, the way it is pointing. */}
      <motion.span
        initial={{
          transform: reduceMotion ? "translateX(0px)" : "translateX(-40px)",
        }}
        animate={{ transform: "translateX(0px)" }}
        transition={{ duration: 0.6, delay, ease: EASE_OUT }}
        className="block"
      >
        {/* Idles with a one-line hop, each rocket out of step with the last. */}
        <span
          className="block motion-safe:animate-[hack-bob_2.4s_steps(1,end)_infinite]"
          style={{ animationDelay: `${-index * 0.7}s` }}
        >
          <span
            className={clsx(
              "flex items-center transition-[transform,filter] duration-200 ease-out",
              "[@media(hover:hover)]:group-hover:scale-105 [@media(hover:hover)]:group-hover:[filter:brightness(1.1)_drop-shadow(0_0_2px_color-mix(in_srgb,var(--tier)_50%,transparent))_drop-shadow(0_0_8px_color-mix(in_srgb,var(--tier)_30%,transparent))]",
              "group-focus-visible:scale-105 group-focus-visible:[filter:brightness(1.1)_drop-shadow(0_0_2px_color-mix(in_srgb,var(--tier)_50%,transparent))_drop-shadow(0_0_8px_color-mix(in_srgb,var(--tier)_30%,transparent))]",
            )}
          >
            <RocketTail scale={scale} />
            <span
              className="flex shrink-0 items-center border-y border-[var(--line)] bg-[var(--hull)]"
              style={{
                height: (HULL_BOTTOM - HULL_TOP) * scale,
                borderTopWidth: LINE * scale,
                borderBottomWidth: LINE * scale,
                paddingRight: 12 * scale,
                // Start the logo in the tail's empty stretch of hull, as far
                // clear of the back wall (x 40) as `paddingRight` leaves it
                // clear of the nose, so the logo sits centred in the hull and
                // the rocket is no longer than it needs to be.
                marginLeft: -(80 - 40 - 12) * scale,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- a trimmed data URL */}
              <img
                src={logo.src}
                alt={sponsor.name}
                className="block object-contain"
                style={size}
              />
            </span>
            <RocketNose scale={scale} />
          </span>
        </span>
      </motion.span>
    </motion.a>
  );
}

function Logos({
  sponsors,
  planet,
  scale,
}: {
  sponsors: Sponsor[];
  planet: Planet;
  scale: number;
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
    // A loose flight, not a queue: up to three rockets a row, each nudged off
    // the grid by its own amount so the rows don't line up.
    <div
      className="flex flex-wrap items-center justify-center"
      style={{
        maxWidth: 1000 * scale,
        columnGap: 64 * scale,
        rowGap: 40 * scale,
      }}
    >
      {sponsors.map((sponsor, index) => (
        <div
          key={sponsor.name}
          className="flex items-center"
          style={{
            transform: `translate(${FLIGHT[index % FLIGHT.length][0] * scale}px, ${FLIGHT[index % FLIGHT.length][1] * scale}px)`,
          }}
        >
          <Logo
            sponsor={sponsor}
            scale={scale}
            index={index}
            color={planet.color}
          />
        </div>
      ))}
    </div>
  );
}

/** Each rocket's nudge `[x, y]` off its slot, in design pixels; repeats. */
const FLIGHT: [number, number][] = [
  [-24, -36],
  [16, 28],
  [-8, -14],
  [40, 18],
  [-36, -10],
  [12, 34],
  [28, -26],
];

export function TierView({
  planet,
  sponsors,
  skyWidth,
  onSelectTier,
}: TierViewProps) {
  const s = scaleFor(skyWidth);
  // Capped so each of the planet's 25 cells stays a readable block, not a slab.
  const planetSize = Math.round(Math.min(skyWidth * 0.52, 740));
  const t = useTranslations("Hackathon.sponsors");
  // How much of the planet shows above the bottom edge.
  const planetShows = planetSize * 0.38;

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
      {/* At the top of the sky; the other tiers below are the way out. */}
      <motion.h2
        {...materialise(0.05)}
        className={clsx(
          lilex.className,
          "pointer-events-none relative z-10 mx-auto flex min-h-10 items-center whitespace-nowrap text-center text-2xl font-bold lowercase leading-none text-white md:text-3xl",
          planet.tier === "vibe" && "whitespace-pre-line",
        )}
        style={roundStroke(planet.color, "0.08em")}
      >
        {t(`labels.${planet.labelKey}`)}
      </motion.h2>
      {/* The rockets float in the sky between the top and the planet. */}
      <div
        className="relative z-10 flex grow flex-col items-center justify-center gap-10 pt-6 md:pt-10"
        style={{ paddingBottom: planetShows }}
      >
        <Logos sponsors={sponsors} planet={planet} scale={s} />
      </div>
      <OtherPlanets current={planet} onSelectTier={onSelectTier} />
    </motion.div>
  );
}
