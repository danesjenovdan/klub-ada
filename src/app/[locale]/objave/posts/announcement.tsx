"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { plexMono } from "@/src/app/fonts";
import imageLoader from "@/src/app/utils/image-loader";
import { PLANETS, Tier } from "@/src/app/hack/[locale]/sponsors/model";
import { PixelPlanet } from "@/src/app/hack/[locale]/sponsors/pixel-planet";
import { Trimmed, trimLogo } from "@/src/app/hack/[locale]/sponsors/trim-logo";
import { GalleryPhoto, SponsorPost } from "../data";
import { Format } from "../formats";
import {
  INK,
  NotchButton,
  PostProps,
  Stars,
  isCompact,
  materialise,
} from "../frame";
import { Photo, pickPhotos } from "./gallery";
import { LockupPost } from "./save-the-date";
import { trackDrawing } from "./screen-photo";
import { PlanetBody } from "./sponsor";

export const ANNOUNCEMENT_DURATION = 6;
export const ANNOUNCEMENT_STILL = 5;

/** The site's address, as people type it. */
const URL = "hack.klub-ada.si";

/**
 * The paying tiers on the wall. Partners (food and drink, the venue, media)
 * are left off it.
 */
const WALL_TIERS: Tier[] = ["gold", "silver", "bronze", "vibe"];

/**
 * The area each logo gets in its cell, at 1080px wide, so a long wordmark and
 * a compact mark weigh about the same; gold gets more.
 */
const LOGO_AREA = { gold: 7600, rest: 4600 };

/** The sponsors on the wall, one group per tier, gold first; empty tiers dropped. */
export const wallRows = (sponsors: SponsorPost[]) =>
  WALL_TIERS.map((tier) =>
    sponsors.filter((sponsor) => sponsor.type === tier),
  ).filter((group) => group.length);

/** Every sponsor's logo trimmed to what is drawn, once all have loaded. */
function useTrimmedLogos(sponsors: SponsorPost[]) {
  const [logos, setLogos] = useState<Record<string, Trimmed> | null>(null);
  const key = sponsors.map((s) => s._id).join();

  useEffect(() => {
    let cancelled = false;
    const job = Promise.all(
      sponsors.map((sponsor) =>
        trimLogo(imageLoader(sponsor.image, 1200))
          .then((logo) => [sponsor._id, logo] as const)
          .catch(() => null),
      ),
    ).then((entries) => {
      if (!cancelled)
        setLogos(
          Object.fromEntries(
            entries.filter((entry): entry is [string, Trimmed] => !!entry),
          ),
        );
    });
    trackDrawing(job);
    return () => {
      cancelled = true;
    };
    // The ids stand for the list; a new array with the same sponsors is no change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return logos;
}

/**
 * The sponsors as the site's sponsor sky shows them: one row per tier, led by
 * the tier's pixel planet and its name in the site's tier label, the logos
 * after it in cells framed in the tier's colour. The cells share the row
 * between them, so every row runs the full width of the post and each sponsor
 * is set apart in its own frame. A fade into the ground keeps the swirl from
 * running through them. The logos hold still from the first frame.
 */
function SponsorWall({
  t,
  format,
  sponsors,
  labels = true,
  small = false,
}: {
  t: number;
  format: Format;
  sponsors: SponsorPost[];
  /** Lead each row with its tier's planet and name; off, the cells take the row. */
  labels?: boolean;
  /** A narrower wall, about 70% of the post's width, with smaller logos. */
  small?: boolean;
}) {
  const tLabels = useTranslations("Hackathon.sponsors.labels");
  const logos = useTrimmedLogos(sponsors);
  const compact = isCompact(format);
  const tall = format.height > 1600;
  const unit = compact ? 1 : tall ? 1.3 : 1.1;
  const margin = small ? format.width * 0.15 : 48;
  const labelWidth = labels ? 212 * unit : 0;
  const gap = (small ? 10 : 12) * unit;
  const rowHeight = (small ? 60 : 76) * unit;
  const rowsWidth = format.width - margin * 2 - labelWidth;
  return (
    <div
      className="relative flex shrink-0 flex-col"
      style={{
        padding: `${(compact ? 28 : 44) * unit}px ${margin}px ${(compact ? 48 : 72) * unit}px`,
        gap,
        background: `linear-gradient(to bottom, transparent, ${INK}e6 ${compact ? 26 : 34}%)`,
      }}
    >
      {logos &&
        wallRows(sponsors).map((group) => {
          const planet = PLANETS.find((p) => p.tier === group[0].type)!;
          const cellWidth =
            (rowsWidth - (group.length - 1) * gap) / group.length;
          const area =
            (planet.tier === "gold" ? LOGO_AREA.gold : LOGO_AREA.rest) *
            (small ? 0.62 : 1) *
            unit *
            unit;
          return (
            <div
              key={planet.tier}
              className="flex items-center"
              style={{ height: rowHeight }}
            >
              {labels && (
                <div
                  className="flex shrink-0 items-center"
                  style={{ width: labelWidth, gap: 12 * unit }}
                >
                  <PixelPlanet
                    tier={planet.tier}
                    frame={0}
                    className="shrink-0"
                    style={{
                      width: 30 * unit,
                      height: 30 * unit,
                      filter: `drop-shadow(0 0 ${8 * unit}px ${planet.color}99)`,
                    }}
                  />
                  <span
                    className={clsx(
                      plexMono.className,
                      "whitespace-nowrap uppercase leading-none tracking-[0.12em]",
                    )}
                    style={{ fontSize: 19 * unit, color: planet.color }}
                  >
                    {tLabels(planet.labelKey).replace("\n", " ")}
                  </span>
                </div>
              )}
              <div className="flex h-full" style={{ gap }}>
                {group.map((sponsor) => {
                  const logo = logos[sponsor._id];
                  if (!logo) return null;
                  const pad = (small ? 13 : 16) * unit;
                  const height = Math.min(
                    Math.sqrt(area / logo.ratio),
                    rowHeight - pad * 2,
                    (cellWidth - pad * 2) / logo.ratio,
                  );
                  return (
                    <div
                      key={sponsor._id}
                      className="flex items-center justify-center"
                      style={{
                        width: cellWidth,
                        height: "100%",
                        background: INK,
                        border: `2px solid ${planet.color}99`,
                      }}
                    >
                      <img
                        src={logo.src}
                        alt={sponsor.name}
                        style={{ height, width: height * logo.ratio }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
    </div>
  );
}

type SkySpot = { tier: Tier; x: number; y: number; size: number };

/** The planets of the sponsor sky, as fractions of the post: centre and width. */
const SKY: SkySpot[] = [
  { tier: "gold", x: 0.1, y: 0.94, size: 0.56 },
  { tier: "bronze", x: 0.93, y: 0.08, size: 0.34 },
  { tier: "silver", x: 0.92, y: 0.74, size: 0.17 },
  { tier: "vibe", x: 0.12, y: 0.15, size: 0.13 },
  { tier: "partner", x: 0.7, y: 0.95, size: 0.08 },
];

/**
 * The sky over the sponsors' logos: every planet kept in the top half, so the
 * bottom stays clear for the wall.
 */
const SKY_ABOVE_LOGOS: SkySpot[] = [
  { tier: "gold", x: 0.04, y: 0.1, size: 0.44 },
  { tier: "bronze", x: 0.96, y: 0.3, size: 0.26 },
  { tier: "silver", x: 0.84, y: 0.04, size: 0.12 },
  { tier: "vibe", x: 0.09, y: 0.5, size: 0.08 },
  { tier: "partner", x: 0.93, y: 0.55, size: 0.05 },
];

/**
 * The sponsor sky around the lockup: its planets in the corners, cut by the
 * edges, and the site's stars between them. The planets turn their dither and
 * the stars twinkle; nothing else moves.
 */
function PlanetSky({
  t,
  format,
  spots = SKY,
}: {
  t: number;
  format: Format;
  spots?: SkySpot[];
}) {
  const { width, height } = format;
  return (
    <>
      <Stars
        t={t}
        format={format}
        count={46}
        avoid={[
          // The lockup in the middle.
          {
            x: width * 0.22,
            y: height * 0.22,
            width: width * 0.56,
            height: height * 0.58,
          },
        ]}
      />
      {spots.map((spot) => {
        const planet = PLANETS.find((p) => p.tier === spot.tier)!;
        const size = width * spot.size;
        return (
          <PlanetBody
            key={spot.tier}
            planet={planet}
            t={t}
            size={size}
            glow={size * 0.12}
            style={{
              left: width * spot.x - size / 2,
              top: height * spot.y - size / 2,
            }}
          />
        );
      })}
    </>
  );
}

/** Where each corner photo sits: its centre as fractions of the post, and its tilt. */
const CORNERS = [
  { x: 0.13, y: 0.13, rotate: -6 },
  { x: 0.88, y: 0.15, rotate: 5 },
  { x: 0.12, y: 0.86, rotate: 4 },
  { x: 0.87, y: 0.88, rotate: -5 },
];

/**
 * Last year's photos in the corners, tilted like prints dropped on a table and
 * cut by the edges, in the red frame of the gallery's grid. A dark pool behind
 * the lockup keeps the type clear of them. Each photo steps in after the last.
 */
function PhotoCorners({
  t,
  format,
  photos,
}: {
  t: number;
  format: Format;
  photos: GalleryPhoto[];
}) {
  const { width, height } = format;
  const photoWidth = width * 0.4;
  const photoHeight = photoWidth * 0.72;
  const picked = pickPhotos(photos, CORNERS.length);

  return (
    <>
      {picked.map((photo, index) => {
        const corner = CORNERS[index];
        return (
          <div
            key={index}
            className="absolute border-2 border-[rgba(255,87,87,0.6)]"
            style={{
              left: width * corner.x - photoWidth / 2,
              top: height * corner.y - photoHeight / 2,
              transform: `rotate(${corner.rotate}deg)`,
              opacity: materialise(t, 0.2 + index * 0.18, 0.3),
            }}
          >
            <Photo photo={photo} width={photoWidth} height={photoHeight} />
          </div>
        );
      })}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 42% 40% at 50% 50%, ${INK}f2, ${INK}b3 55%, transparent)`,
        }}
      />
    </>
  );
}

export type AnnouncementLook =
  | { kind: "plain" }
  | { kind: "planets" }
  | {
      kind: "planets-logos";
      sponsors: SponsorPost[];
      /** Without the tier's planet and name in front of each row. */
      bare?: boolean;
      /** A narrower wall with smaller logos. */
      small?: boolean;
    }
  | { kind: "photos"; photos: GalleryPhoto[] };

/**
 * The general announcement, for the team and every sponsor to share: the
 * save-the-date lockup and the site's address, on its own, with the sponsors'
 * logos underneath, in the sponsor sky's planets (with or without the logos),
 * or among last year's photos.
 */
export function AnnouncementPostView({
  t,
  format,
  data,
}: PostProps<AnnouncementLook>) {
  const compact = isCompact(format);
  const tall = format.height > 1600;
  const withLogos = data.kind === "planets-logos";

  return (
    <LockupPost
      t={t}
      format={format}
      // Over the planets, only the planets and stars move; the swirl holds.
      swirlStill={data.kind === "planets" || data.kind === "planets-logos"}
      scale={withLogos ? (compact ? 0.8 : tall ? 1.1 : 0.9) : undefined}
      backdrop={
        data.kind === "planets" ? (
          <PlanetSky t={t} format={format} />
        ) : data.kind === "planets-logos" ? (
          <PlanetSky t={t} format={format} spots={SKY_ABOVE_LOGOS} />
        ) : data.kind === "photos" ? (
          <PhotoCorners t={t} format={format} photos={data.photos} />
        ) : null
      }
      footer={
        withLogos && (
          <SponsorWall
            t={t}
            format={format}
            sponsors={data.sponsors}
            labels={!data.bare}
            small={data.small}
          />
        )
      }
    >
      <NotchButton size="sm" className="!normal-case">
        {URL}
      </NotchButton>
    </LockupPost>
  );
}
