"use client";

import { CSSProperties, ReactNode, createContext, useContext } from "react";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { anaheim, instrumentSerif, plexMono } from "@/src/app/fonts";
import { Format } from "./formats";
import { beat, caretVisible, ease, hash, mix, steps, typed } from "./motion";

/*
 * The pieces every post is built from, measured off the Figma `mkt` file's
 * 1080px frames: the near-black ground with the blurred red swirl, the
 * duck-and-title header top left, the Klub Ada sticker bottom right, the red
 * notched button and the red-rimmed card.
 */

export const RED = "#ff5757";
export const INK = "#0c0303";
export const WHITE = "#fafafa";
export const GRAY = "#d3d2d2";

/**
 * The red swirl behind every post, flattened to a JPEG once (see
 * `rasteriseRipple`) so it is not re-blurred for every frame of a video.
 */
export const RippleContext = createContext<string>(
  "/assets/hackathon26/social/ripple.svg",
);

/**
 * Which logo the posts' header shows: the full lockup (duck, title and date)
 * or only the duck. Set by the toggle on the page, for every post at once.
 */
export type LogoMode = "full" | "duck";
export const LogoContext = createContext<LogoMode>("full");

let ripple: Promise<string> | undefined;

/**
 * Draws `ripple.svg` (a shape blurred by 80px with grain on top) onto the
 * ground colour and keeps it as a JPEG data URL. The blur makes half
 * resolution indistinguishable, and a small inline image keeps every captured
 * frame light.
 */
export function rasteriseRipple() {
  ripple ??= new Promise<string>((resolve) => {
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 1061;
      canvas.height = 893;
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = INK;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/jpeg", 0.92));
    };
    image.onerror = () => resolve("/assets/hackathon26/social/ripple.svg");
    image.src = "/assets/hackathon26/social/ripple.svg";
  });
  return ripple;
}

export type PostProps<Data> = {
  t: number;
  format: Format;
  data: Data;
};

/** A square-ish frame has a lot less height to give, so the header shrinks. */
export const isCompact = (format: Format) => format.height < 1200;

/**
 * The ground of a post. The swirl turns slowly around its own centre for the
 * whole clip, so even a held frame of a video is never quite still.
 */
export function PostFrame({
  t,
  format,
  children,
  className,
  background = INK,
  showRipple = true,
  rippleStill = false,
}: {
  t: number;
  format: Format;
  children: ReactNode;
  className?: string;
  background?: string;
  showRipple?: boolean;
  /** Hold the swirl still, for a post where only one thing should move. */
  rippleStill?: boolean;
}) {
  const rippleSrc = useContext(RippleContext);
  // The Figma frame is 1350 tall; a taller story keeps the swirl centred.
  const shiftY = (format.height - 1350) / 2;
  const grow = format.height / 1350;

  return (
    <div
      className={clsx(
        "post-frame relative overflow-hidden text-[#fafafa] antialiased",
        anaheim.className,
        className,
      )}
      style={{ width: format.width, height: format.height, background }}
    >
      {/* The site resets every element to normal weight; inside a post, text
          inherits its weight like plain CSS, so a bold heading stays bold
          through its spans. Zero specificity, so weight classes still win. */}
      <style>{":where(.post-frame *){font-weight:inherit}"}</style>
      {showRipple && (
        <img
          src={rippleSrc}
          alt=""
          className="pointer-events-none absolute max-w-none"
          style={{
            left: -740,
            top: -125 + shiftY,
            width: 2121.82,
            height: 1786.65,
            transformOrigin: "50% 50%",
            transform: rippleStill
              ? `scale(${grow})`
              : `rotate(${t * 2.4}deg) scale(${grow * (1 + 0.025 * Math.sin(t * 0.9))})`,
          }}
        />
      )}
      {children}
    </div>
  );
}

/**
 * Materialise in four hard steps, like the site's tier views: nothing, a
 * quarter, half, all there.
 */
export const materialise = (t: number, start: number, duration = 0.4) =>
  steps(beat(t, start, duration), 4);

/** "AdaHack / Code for change" with the duck, top left, as in every Figma post. */
export function Header({
  t: time,
  format,
  delay = 0,
  still = false,
  align = "left",
  duckOnly = false,
}: {
  t: number;
  format: Format;
  delay?: number;
  /** Already in place from the first frame, no intro. */
  still?: boolean;
  /** Top left as in the Figma posts, or centred over a symmetrical post. */
  align?: "left" | "center" | "right";
  /** Just the duck, without the title and the date. */
  duckOnly?: boolean;
}) {
  // A still header is the intro's last frame.
  const t = still ? delay + 10 : time;
  // The page's logo toggle can reduce every header to the duck.
  const logoMode = useContext(LogoContext);
  duckOnly = duckOnly || logoMode === "duck";
  const tHero = useTranslations("Hackathon.hero");
  const compact = isCompact(format);
  const scale = compact ? 0.78 : 1;

  // The duck draws itself in from the bottom, row by row, then hops.
  const duckIn = steps(beat(t, delay, 0.55), 10);
  const hop = beat(t, delay + 0.6, 0.45);
  const hopY = -Math.sin(hop * Math.PI) * 14;
  const line1 = ease.outExpo(beat(t, delay + 0.2, 0.8));
  const line2 = ease.outExpo(beat(t, delay + 0.32, 0.8));
  const date = beat(t, delay + 0.7, 0.55);

  return (
    <div
      className={clsx(
        "absolute top-[52px] flex flex-col items-center",
        align === "left"
          ? "left-[48px]"
          : align === "right"
            ? "right-[52px]"
            : "left-1/2",
      )}
      style={{
        transform:
          align !== "center"
            ? `scale(${scale})`
            : `translateX(-50%) scale(${scale})`,
        transformOrigin:
          align === "left" ? "0 0" : align === "right" ? "100% 0" : "50% 0",
      }}
    >
      <img
        // The lockup from the Figma homepage: the site's duck centred over the
        // title, its belly tucked behind "AdaHack". Alone, the duck is the
        // closed one, with a round bottom of its own.
        src={
          duckOnly
            ? "/assets/hackathon26/social/duck.svg"
            : "/assets/hackathon26/duck.svg"
        }
        alt=""
        width={145}
        height={duckOnly ? 113 : 100}
        className={clsx(
          "relative w-[145px]",
          duckOnly ? "h-[113px]" : "left-[4px] h-[100px]",
        )}
        style={{
          clipPath: `inset(${(1 - duckIn) * 100}% 0 0 0)`,
          transform: `translateY(${hopY}px)`,
        }}
      />
      {!duckOnly && (
        <>
          <div
            className={clsx(
              instrumentSerif.className,
              "relative -mt-[21px] text-center text-[78px] leading-[0.9] tracking-[-0.02em] text-white",
            )}
          >
            <div className="overflow-hidden pb-[6px]">
              <div style={{ transform: `translateY(${(1 - line1) * 105}%)` }}>
                {tHero("title_line1")}
              </div>
            </div>
            <div className="-mt-[6px] overflow-hidden pb-[10px]">
              <div style={{ transform: `translateY(${(1 - line2) * 105}%)` }}>
                {tHero("title_line2")}
              </div>
            </div>
          </div>
          <p
            className={clsx(
              plexMono.className,
              "mt-[22px] h-[38px] self-stretch text-[32px] leading-[1.2] tracking-[0.03em]",
              align === "left" ? "pl-[34px]" : "text-center",
            )}
          >
            {typed(tHero("date"), date)}
            <span
              className="inline-block w-[0.55em]"
              style={{
                opacity: date > 0 && date < 1 && caretVisible(t) ? 1 : 0,
              }}
            >
              _
            </span>
          </p>
        </>
      )}
    </div>
  );
}

/** A mono line or two, bottom left, typed out. */
export function Caption({
  t,
  delay,
  lines,
}: {
  t: number;
  delay: number;
  lines: [string, string?];
}) {
  const [first, second] = lines;
  const p1 = beat(t, delay, 0.03 * first.length);
  const p2 = second
    ? beat(t, delay + 0.03 * first.length + 0.1, 0.03 * second.length)
    : 0;
  return (
    <div
      className={clsx(
        plexMono.className,
        "absolute bottom-[70px] left-[52px] max-w-[640px] text-[32px] leading-[1.2] tracking-[0.03em]",
      )}
    >
      <p className="min-h-[1.2em]">{typed(first, p1)}</p>
      {second && <p className="min-h-[1.2em] italic">{typed(second, p2)}</p>}
    </div>
  );
}

/**
 * The red button with stepped pixel corners from the Figma file: three 6px
 * steps cut out of each corner.
 */
const notch = (s: number) =>
  `polygon(0 ${3 * s}px, ${s}px ${3 * s}px, ${s}px ${2 * s}px, ${2 * s}px ${2 * s}px, ${2 * s}px ${s}px, ${3 * s}px ${s}px, ${3 * s}px 0, calc(100% - ${3 * s}px) 0, calc(100% - ${3 * s}px) ${s}px, calc(100% - ${2 * s}px) ${s}px, calc(100% - ${2 * s}px) ${2 * s}px, calc(100% - ${s}px) ${2 * s}px, calc(100% - ${s}px) ${3 * s}px, 100% ${3 * s}px, 100% calc(100% - ${3 * s}px), calc(100% - ${s}px) calc(100% - ${3 * s}px), calc(100% - ${s}px) calc(100% - ${2 * s}px), calc(100% - ${2 * s}px) calc(100% - ${2 * s}px), calc(100% - ${2 * s}px) calc(100% - ${s}px), calc(100% - ${3 * s}px) calc(100% - ${s}px), calc(100% - ${3 * s}px) 100%, ${3 * s}px 100%, ${3 * s}px calc(100% - ${s}px), ${2 * s}px calc(100% - ${s}px), ${2 * s}px calc(100% - ${2 * s}px), ${s}px calc(100% - ${2 * s}px), ${s}px calc(100% - ${3 * s}px), 0 calc(100% - ${3 * s}px))`;

export function NotchButton({
  children,
  className,
  style,
  size = "md",
  color = RED,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  size?: "sm" | "md";
  color?: string;
}) {
  return (
    <div
      className={clsx(
        plexMono.className,
        "inline-flex items-center justify-center gap-[0.5em] whitespace-nowrap font-medium uppercase leading-none text-[#fafafa]",
        size === "md"
          ? "px-[64px] py-[26px] text-[48px] tracking-[0.03em]"
          : "px-[34px] py-[16px] text-[30px] tracking-[0.08em]",
        className,
      )}
      style={{
        background: color,
        clipPath: notch(size === "md" ? 6 : 4),
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/** The red-rimmed translucent card the FAQ posts hold their text in. */
export const card =
  "rounded-[23px] border-2 border-[#ff5757] bg-[rgba(0,0,0,0.34)]";

/**
 * Covers its parent with a grid of ground-coloured cells that blink out in a
 * scattered order as `progress` runs 0→1: the pixel dissolve that reveals
 * logos and photos.
 */
export function PixelDissolve({
  progress,
  columns = 12,
  rows = 12,
  color = INK,
  seed = 1,
}: {
  progress: number;
  columns?: number;
  rows?: number;
  color?: string;
  seed?: number;
}) {
  if (progress >= 1) return null;
  const cells = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      const index = y * columns + x;
      // Sweep loosely from the top left, with plenty of scatter.
      const order =
        0.55 * hash(index * 7.3 + seed) + 0.45 * ((x + y) / (columns + rows));
      if (order < progress) continue;
      cells.push(
        <span
          key={index}
          className="absolute"
          style={{
            left: `${(x / columns) * 100}%`,
            top: `${(y / rows) * 100}%`,
            // A hair of overlap so no seams show between cells.
            width: `calc(${100 / columns}% + 1px)`,
            height: `calc(${100 / rows}% + 1px)`,
            background: color,
          }}
        />,
      );
    }
  }
  return <div className="pointer-events-none absolute inset-0">{cells}</div>;
}

/**
 * An image that assembles itself tile by tile in a scattered order as
 * `progress` runs 0→1, each tile flashing white as it lands. Unlike
 * `PixelDissolve` it covers nothing, so it works over a see-through card.
 */
export function PixelReveal({
  src,
  width,
  height,
  progress,
  columns = 16,
  rows = 6,
  seed = 1,
}: {
  src: string;
  width: number;
  height: number;
  progress: number;
  columns?: number;
  rows?: number;
  seed?: number;
}) {
  if (progress >= 1) {
    return (
      <img
        src={src}
        alt=""
        crossOrigin="anonymous"
        style={{ width, height, display: "block" }}
      />
    );
  }
  const tiles = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      const index = y * columns + x;
      const order =
        0.85 *
        (0.55 * hash(index * 7.3 + seed) + 0.45 * ((x + y) / (columns + rows)));
      if (order >= progress) continue;
      // Whole-pixel edges, so neighbouring tiles meet without seams.
      const left = Math.round((x * width) / columns);
      const top = Math.round((y * height) / rows);
      const right = Math.round(((x + 1) * width) / columns);
      const bottom = Math.round(((y + 1) * height) / rows);
      const fresh = progress - order < 0.08;
      tiles.push(
        <span
          key={index}
          className="absolute"
          style={{
            left,
            top,
            width: right - left,
            height: bottom - top,
            backgroundImage: `url("${src}")`,
            backgroundSize: `${width}px ${height}px`,
            backgroundPosition: `${-left}px ${-top}px`,
          }}
        >
          {fresh && <span className="absolute inset-0 bg-white opacity-70" />}
        </span>,
      );
    }
  }
  return (
    <div className="relative" style={{ width, height }}>
      {tiles}
    </div>
  );
}

/**
 * The twinkling pixel stars of the site's sponsors sky, on the post's clock.
 * Same timing as the site's `hack-twinkle` and `hack-star-arms` keyframes:
 * each star dims to 30% for an eighth of its cycle, and a plus-shaped star
 * folds its arms away for a while, collapsing to one pixel. Every star runs on
 * its own period and phase, so neighbours never blink together.
 */
export function Stars({
  t,
  format,
  color = WHITE,
  count = 30,
  seed = 3,
  cell = 6,
  avoid = [],
}: {
  t: number;
  format: Format;
  color?: string;
  count?: number;
  seed?: number;
  /** One star pixel, in post pixels. */
  cell?: number;
  /** Areas to keep clear, such as text, so no star sits on a letter. */
  avoid?: { x: number; y: number; width: number; height: number }[];
}) {
  const phase = (index: number) => {
    const duration = 2.8 + ((index * 7) % 9) * 0.35;
    const delay = ((index * 13) % 17) * 0.41;
    return ((((t + delay) % duration) + duration) % duration) / duration;
  };
  const pixel = (x: number, y: number, key: string) => (
    <span
      key={key}
      className="absolute"
      style={{
        left: x * cell,
        top: y * cell,
        width: cell,
        height: cell,
        background: color,
      }}
    />
  );
  return (
    <div className="pointer-events-none absolute inset-0">
      {Array.from({ length: count }, (_, index) => {
        const x =
          Math.round(hash(index * 3.1 + seed) * (format.width - 40)) + 20;
        const y =
          Math.round(hash(index * 5.7 + seed * 2) * (format.height - 40)) + 20;
        const covered = avoid.some(
          (area) =>
            x > area.x - cell &&
            x < area.x + area.width + cell &&
            y > area.y - cell &&
            y < area.y + area.height + cell,
        );
        if (covered) return null;
        const p = phase(index);
        const dim = p >= 0.56 && p < 0.68;
        const isPlus = index % 3 === 0;
        const armsIn = phase(index + 3) >= 0.42 && phase(index + 3) < 0.7;
        return (
          <span
            key={index}
            className="absolute"
            style={{ left: x, top: y, opacity: dim ? 0.3 : 1 }}
          >
            {pixel(0, 0, "c")}
            {isPlus &&
              !armsIn && [
                pixel(-1, 0, "l"),
                pixel(1, 0, "r"),
                pixel(0, -1, "t"),
                pixel(0, 1, "b"),
              ]}
          </span>
        );
      })}
    </div>
  );
}

/**
 * Square pixel confetti thrown out of a point, falling under gravity. Starts
 * at `start` and is gone by about two seconds later.
 */
export function PixelConfetti({
  t,
  start,
  x,
  y,
  count = 46,
  colors = [RED, WHITE, "#ffb3b3"],
  seed = 5,
}: {
  t: number;
  start: number;
  x: number;
  y: number;
  count?: number;
  colors?: string[];
  seed?: number;
}) {
  const age = t - start;
  if (age < 0 || age > 2.4) return null;
  return (
    <div className="pointer-events-none absolute inset-0">
      {Array.from({ length: count }, (_, i) => {
        const angle = hash(i * 1.7 + seed) * Math.PI * 2;
        const speed = 380 + hash(i * 4.3 + seed) * 720;
        const size = [8, 12, 16][i % 3];
        const px = x + Math.cos(angle) * speed * age * 0.9;
        const py = y + Math.sin(angle) * speed * age * 0.9 + 900 * age * age;
        const fade = Math.max(0, 1 - Math.max(0, age - 1.4) / 1);
        // Snap to an 8px grid so the confetti moves like pixels, not paper.
        return (
          <span
            key={i}
            className="absolute"
            style={{
              left: Math.round(px / 4) * 4,
              top: Math.round(py / 4) * 4,
              width: size,
              height: size,
              background: colors[i % colors.length],
              opacity: fade,
            }}
          />
        );
      })}
    </div>
  );
}
