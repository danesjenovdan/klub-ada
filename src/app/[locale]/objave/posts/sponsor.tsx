"use client";

import { CSSProperties, useEffect, useState } from "react";
import imageLoader from "@/src/app/utils/image-loader";
import { PixelPlanet } from "@/src/app/hack/[locale]/sponsors/pixel-planet";
import { PLANET_ART } from "@/src/app/hack/[locale]/sponsors/planet-art";
import { PLANETS, Planet } from "@/src/app/hack/[locale]/sponsors/model";
import { Format } from "../formats";
import { SponsorPost } from "../data";
import {
  Header,
  INK,
  PostFrame,
  PostProps,
  Stars,
  isCompact,
  materialise,
} from "../frame";
import { beat, ease } from "../motion";
import { PlanetPixels } from "./planet-pixels";
import { loadImage, trackDrawing } from "./screen-photo";

/*
 * Sponsor posts, in five layouts to choose from. All of them share the centred
 * header, the logo standing bare, and the tier told by its planet's colour
 * alone. The logo and the type hold still; only the planet moves, each layout
 * with one of the gestures the sponsors page itself uses.
 */

export type SponsorVariant = "orbit" | "planet" | "sky" | "burst";

export const SPONSOR_VARIANTS: {
  id: SponsorVariant;
  label: string;
  duration: number;
  still: number;
}[] = [
  { id: "orbit", label: "Orbita", duration: 4, still: 2 },
  { id: "planet", label: "Planet", duration: 4.5, still: 4 },
  { id: "sky", label: "Nebo", duration: 5, still: 2.5 },
  { id: "burst", label: "Pok", duration: 4.5, still: 4 },
];

/** Where the centred header ends, and the margin kept at the bottom. */
const headerBottom = (format: Format) => (isCompact(format) ? 300 : 375);
const bottomMargin = (format: Format) => (isCompact(format) ? 64 : 88);

/** The dither step the site turns each planet at: 115ms + 5ms per grid cell. */
const ditherFrame = (planet: Planet, t: number) =>
  Math.floor((t * 1000) / (115 + PLANET_ART[planet.tier].size * 5));

/** A planet drawn at `size`, turning on the post clock, with its glow. */
function PlanetBody({
  planet,
  t,
  size,
  glow = 60,
  style,
}: {
  planet: Planet;
  t: number;
  size: number;
  glow?: number;
  style?: CSSProperties;
}) {
  return (
    <div
      className="absolute"
      style={{
        width: size,
        height: size,
        filter: `drop-shadow(0 0 ${glow}px ${planet.color}99)`,
        ...style,
      }}
    >
      <PixelPlanet
        tier={planet.tier}
        frame={ditherFrame(planet, t)}
        className="h-full w-full"
      />
    </div>
  );
}

type Trimmed = { src: string; ratio: number };
const trimmed = new Map<string, Promise<Trimmed>>();

/**
 * A logo cropped to its visible pixels. Several logos were uploaded on a wide
 * canvas with lots of empty space around the mark, which made them render
 * small; trimming lets every mark be sized by what is actually drawn.
 */
function trimLogo(src: string) {
  let job = trimmed.get(src);
  if (!job) {
    job = loadImage(src).then((image) => {
      const canvas = document.createElement("canvas");
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(image, 0, 0);
      const { data, width, height } = ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height,
      );
      let left = width;
      let right = -1;
      let top = height;
      let bottom = -1;
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          if (data[(y * width + x) * 4 + 3] > 16) {
            if (x < left) left = x;
            if (x > right) right = x;
            if (y < top) top = y;
            if (y > bottom) bottom = y;
          }
        }
      }
      // Nothing transparent to trim: keep the image as it is.
      if (right < 0) return { src, ratio: width / height };
      const w = right - left + 1;
      const h = bottom - top + 1;
      const crop = document.createElement("canvas");
      crop.width = w;
      crop.height = h;
      crop.getContext("2d")!.drawImage(canvas, left, top, w, h, 0, 0, w, h);
      return { src: crop.toDataURL("image/png"), ratio: w / h };
    });
    trimmed.set(src, job);
  }
  return job;
}

/**
 * The sponsor's logo, bare and trimmed, sized by area so a long wordmark and
 * a compact mark carry about the same weight, within a width and height cap.
 */
function SponsorLogo({
  data,
  format,
  style,
}: {
  data: SponsorPost;
  format: Format;
  style?: CSSProperties;
}) {
  const compact = isCompact(format);
  const tall = format.height > 1600;
  const src = imageLoader(data.image, 1600);
  const [logo, setLogo] = useState<Trimmed | null>(null);

  useEffect(() => {
    let cancelled = false;
    const job = trimLogo(src).then((result) => {
      if (!cancelled) setLogo(result);
    });
    trackDrawing(job.catch(() => undefined));
    return () => {
      cancelled = true;
    };
  }, [src]);

  if (!logo) return null;

  const unit = compact ? 0.8 : tall ? 1.25 : 1;
  const area = 100000 * unit * unit;
  const maxWidth = 680 * unit;
  const maxHeight = 220 * unit;
  let height = Math.sqrt(area / logo.ratio);
  height = Math.min(height, maxHeight, maxWidth / logo.ratio);

  return (
    <img
      src={logo.src}
      alt={data.name}
      className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ height, width: height * logo.ratio, ...style }}
    />
  );
}

type LayoutProps = PostProps<SponsorPost> & { planet: Planet };

/**
 * Orbita: the site's tier view. The planet fills the bottom like a world seen
 * from orbit, still from the first frame, in a dark sky of the site's
 * twinkling stars; only the dither and the stars move. The logo floats above.
 */
function Orbit({ t, format, data, planet }: LayoutProps) {
  const compact = isCompact(format);
  const tall = format.height > 1600;
  const size = format.width * 0.94;
  const shows = compact ? 380 : tall ? 780 : 540;
  const top = format.height - shows;
  const logoY = (headerBottom(format) + top) / 2;

  return (
    <>
      <Stars
        t={t}
        format={format}
        seed={planet.tier.length}
        count={40}
        avoid={[
          // The centred header, the band the logo sits in, and the planet.
          { x: 250, y: 0, width: 580, height: headerBottom(format) + 20 },
          { x: 0, y: logoY - 130, width: format.width, height: 260 },
          { x: 0, y: top, width: format.width, height: shows },
        ]}
      />
      <PlanetBody
        planet={planet}
        t={t}
        size={size}
        style={{
          left: (format.width - size) / 2,
          top,
        }}
      />
      {/* The site fades the planet into the ground towards the bottom. */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0"
        style={{
          height: shows * 0.55,
          background: `linear-gradient(to top, ${INK}, ${INK}66 40%, transparent)`,
        }}
      />
      <SponsorLogo data={data} format={format} style={{ top: logoY }} />
    </>
  );
}

/**
 * Planet: one whole planet over the logo, like a planet in the site's sponsor
 * sky. It is there from the first frame and holds still; its dither turns and
 * its glow slowly breathes.
 */
function WholePlanet({ t, format, data, planet }: LayoutProps) {
  const compact = isCompact(format);
  const tall = format.height > 1600;
  const size = compact ? 400 : tall ? 680 : 540;
  const gap = compact ? 48 : 72;
  const logoBox = compact ? 130 : tall ? 210 : 160;
  const area = format.height - headerBottom(format) - bottomMargin(format);
  const top = headerBottom(format) + (area - size - gap - logoBox) / 2;

  // One slow breath every four seconds or so.
  const breath = (1 - Math.cos(t * 1.5)) / 2;

  return (
    <>
      <PlanetBody
        planet={planet}
        t={t}
        size={size}
        glow={44 + 24 * breath}
        style={{
          left: (format.width - size) / 2,
          top,
        }}
      />
      <SponsorLogo
        data={data}
        format={format}
        style={{ top: top + size + gap + logoBox / 2 }}
      />
    </>
  );
}

/**
 * Nebo: the site's sponsor sky. A big planet sits in the bottom right corner
 * from the first frame; the only motion is its dither turning and the stars
 * twinkling around it in hard steps. The logo holds the middle.
 * The stars keep clear of the header and the logo.
 */
function Sky({ t, format, data, planet }: LayoutProps) {
  const compact = isCompact(format);
  const tall = format.height > 1600;
  const size = compact ? 620 : tall ? 900 : 760;
  const left = format.width - size * 0.64;
  const top = format.height - size * 0.56;
  const logoY = (headerBottom(format) + top) / 2;

  return (
    <>
      <Stars
        t={t}
        format={format}
        seed={planet.tier.length}
        count={40}
        avoid={[
          // The centred header, and the band the logo sits in.
          { x: 250, y: 0, width: 580, height: headerBottom(format) + 20 },
          { x: 0, y: logoY - 130, width: format.width, height: 260 },
        ]}
      />
      <PlanetBody planet={planet} t={t} size={size} style={{ left, top }} />
      <SponsorLogo data={data} format={format} style={{ top: logoY }} />
    </>
  );
}

/**
 * Pok: the site's click, as a story. The planet sits alone, bursts into its
 * pixels, and the tier view forms out of the debris with the
 * logo, exactly as the sponsors page does after a click.
 */
function Burst({ t, format, data, planet }: LayoutProps) {
  const compact = isCompact(format);
  const size = compact ? 400 : 520;
  const area = format.height - headerBottom(format) - bottomMargin(format);
  const top = headerBottom(format) + (area - size) / 2;
  const left = (format.width - size) / 2;
  const burstAt = 1.1;
  // The site lets the tier view show through the debris 420ms after the click.
  const revealAt = burstAt + 0.42;
  const burst = beat(t, burstAt, 1.1);
  const shown = materialise(t, 0.15, 0.4);

  return (
    <>
      {t < burstAt && (
        <PlanetBody
          planet={planet}
          t={t}
          size={size}
          style={{ left, top, opacity: shown }}
        />
      )}
      {t >= revealAt && (
        <div
          className="absolute inset-0"
          style={{ opacity: ease.outCubic(beat(t, revealAt, 0.3)) }}
        >
          <Orbit t={t} format={format} data={data} planet={planet} />
        </div>
      )}
      {burst > 0 && burst < 1 && (
        <PlanetPixels
          tier={planet.tier}
          width={format.width}
          height={format.height}
          left={left}
          top={top}
          size={size}
          progress={burst}
          mode="burst"
        />
      )}
    </>
  );
}

const LAYOUTS: Record<SponsorVariant, (props: LayoutProps) => JSX.Element> = {
  orbit: Orbit,
  planet: WholePlanet,
  sky: Sky,
  burst: Burst,
};

export function SponsorPostView({
  t,
  format,
  data,
  variant,
}: PostProps<SponsorPost> & { variant: SponsorVariant }) {
  const planet = PLANETS.find((p) => p.tier === data.type) ?? PLANETS[0];
  const Layout = LAYOUTS[variant];

  return (
    <PostFrame
      t={t}
      format={format}
      rippleStill
      // Orbita is a night sky: stars on the dark ground, no red swirl.
      showRipple={variant !== "orbit"}
    >
      <Header t={t} format={format} align="center" still />
      <Layout t={t} format={format} data={data} planet={planet} />
    </PostFrame>
  );
}
