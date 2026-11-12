"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { plexMono } from "@/src/app/fonts";
import imageLoader from "@/src/app/utils/image-loader";
import { PLANETS, Tier } from "@/src/app/hack/[locale]/sponsors/model";
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
 * The box each logo is fitted into at 1080px wide, and the area it gets, so a
 * long wordmark and a compact mark weigh about the same. Gold gets a row of
 * its own; everyone else shares one size.
 */
const CELL = {
  gold: { width: 210, height: 54, area: 5600 },
  rest: { width: 138, height: 36, area: 2500 },
};

/** At most this many logos to a row, before the rest wrap onto another. */
const MAX_COLUMNS = 6;

/**
 * The sponsors on the wall in two groups: gold, then silver, bronze and vibe
 * coding together. Empty groups are dropped.
 */
export const wallRows = (sponsors: SponsorPost[]) =>
  [["gold"], ["silver", "bronze", "vibe"]]
    .map((tiers) =>
      WALL_TIERS.filter((tier) => tiers.includes(tier)).flatMap((tier) =>
        sponsors.filter((sponsor) => sponsor.type === tier),
      ),
    )
    .filter((group) => group.length);

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
 * The sponsors' logos under a small caption. Space, not a rule, sets them off
 * from the lockup; a fade into the ground keeps the swirl from running through
 * them. Each group is a grid of equal cells with its rows as even as they can
 * be (9 logos are 5 + 4, not 6 + 3), the last row centred. Each logo steps in
 * after the one before.
 */
function SponsorWall({
  t,
  format,
  sponsors,
}: {
  t: number;
  format: Format;
  sponsors: SponsorPost[];
}) {
  const tPosts = useTranslations("Posts.announcement");
  const logos = useTrimmedLogos(sponsors);
  const compact = isCompact(format);
  const tall = format.height > 1600;
  const unit = compact ? 1 : tall ? 1.35 : 1.12;
  // Inside a group, logos sit 28 apart across and 22 down; the groups are 44
  // apart, twice the gap inside one, so they read as two.
  const columnGap = 28 * unit;
  const rowGap = 22 * unit;
  let index = 0;

  return (
    <div
      className="relative flex shrink-0 flex-col items-center"
      style={{
        paddingTop: (compact ? 36 : 56) * unit,
        paddingBottom: (compact ? 60 : 84) * unit,
        gap: 28 * unit,
        background: `linear-gradient(to bottom, transparent, ${INK}e6 ${compact ? 30 : 40}%)`,
      }}
    >
      <p
        className={clsx(
          plexMono.className,
          "uppercase tracking-[0.2em] text-[#9a9898]",
        )}
        style={{ fontSize: 17 * unit }}
      >
        {tPosts("sponsors")}
      </p>
      {logos && (
        <div className="flex flex-col items-center" style={{ gap: 44 * unit }}>
          {wallRows(sponsors).map((group, groupIndex) => {
            const cell =
              groupIndex === 0 && group[0].type === "gold"
                ? CELL.gold
                : CELL.rest;
            const rows = Math.ceil(group.length / MAX_COLUMNS);
            const columns = Math.ceil(group.length / rows);
            const cellWidth = cell.width * unit;
            const cellHeight = cell.height * unit;
            return (
              <div
                key={group[0]._id}
                className="flex flex-wrap justify-center"
                style={{
                  columnGap,
                  rowGap,
                  width: columns * cellWidth + (columns - 1) * columnGap,
                }}
              >
                {group.map((sponsor) => {
                  const logo = logos[sponsor._id];
                  if (!logo) return null;
                  const height = Math.min(
                    Math.sqrt((cell.area * unit * unit) / logo.ratio),
                    cellHeight,
                    cellWidth / logo.ratio,
                  );
                  const shown = materialise(t, 0.5 + index++ * 0.06);
                  return (
                    <div
                      key={sponsor._id}
                      className="flex items-center justify-center"
                      style={{ width: cellWidth, height: cellHeight }}
                    >
                      <img
                        src={logo.src}
                        alt={sponsor.name}
                        style={{
                          height,
                          width: height * logo.ratio,
                          opacity: shown,
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/** The planets of the sponsor sky, as fractions of the post: centre and width. */
const SKY: { tier: Tier; x: number; y: number; size: number }[] = [
  { tier: "gold", x: 0.1, y: 0.94, size: 0.56 },
  { tier: "bronze", x: 0.93, y: 0.08, size: 0.34 },
  { tier: "silver", x: 0.92, y: 0.74, size: 0.17 },
  { tier: "vibe", x: 0.12, y: 0.15, size: 0.13 },
  { tier: "partner", x: 0.7, y: 0.95, size: 0.08 },
];

/**
 * The sponsor sky around the lockup: its planets in the corners, cut by the
 * edges, and the site's stars between them. The planets turn their dither and
 * the stars twinkle; nothing else moves.
 */
function PlanetSky({ t, format }: { t: number; format: Format }) {
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
      {SKY.map((spot) => {
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
  | { kind: "logos"; sponsors: SponsorPost[] }
  | { kind: "planets" }
  | { kind: "photos"; photos: GalleryPhoto[] };

/**
 * The general announcement, for the team and every sponsor to share: the
 * save-the-date lockup and the site's address, on its own, with the sponsors'
 * logos underneath, in the sponsor sky's planets, or among last year's photos.
 */
export function AnnouncementPostView({
  t,
  format,
  data,
}: PostProps<AnnouncementLook>) {
  const compact = isCompact(format);
  const tall = format.height > 1600;

  return (
    <LockupPost
      t={t}
      format={format}
      scale={
        data.kind === "logos" ? (compact ? 0.8 : tall ? 1.1 : 0.9) : undefined
      }
      backdrop={
        data.kind === "planets" ? (
          <PlanetSky t={t} format={format} />
        ) : data.kind === "photos" ? (
          <PhotoCorners t={t} format={format} photos={data.photos} />
        ) : null
      }
      footer={
        data.kind === "logos" && (
          <SponsorWall t={t} format={format} sponsors={data.sponsors} />
        )
      }
    >
      <NotchButton size="sm" className="!normal-case">
        {URL}
      </NotchButton>
    </LockupPost>
  );
}
