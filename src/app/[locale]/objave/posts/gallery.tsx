"use client";

import { CSSProperties } from "react";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { instrumentSerif, lilex, plexMono } from "@/src/app/fonts";
import { urlFor } from "@/sanity/lib/image";
import { FIGURES_2025 } from "@/src/app/hack/[locale]/numbers/figures";
import { GalleryPhoto, GalleryPost } from "../data";
import { Format } from "../formats";
import {
  Header,
  INK,
  PostFrame,
  PostProps,
  RED,
  isCompact,
  materialise,
} from "../frame";
import { beat, ease, mix } from "../motion";

/*
 * Last year in pictures, in four layouts to choose from. Type is the site's
 * own (Instrument Serif and Plex Mono, no new faces), and each layout has one
 * quiet movement at most.
 */

export type GalleryVariant = "finder" | "grid" | "cover" | "cards";

export const GALLERY_VARIANTS: {
  id: GalleryVariant;
  label: string;
  duration: number;
  still: number;
}[] = [
  { id: "finder", label: "Galerija", duration: 5.5, still: 0.5 },
  { id: "grid", label: "Mreža", duration: 4, still: 3.5 },
  { id: "cover", label: "Naslovnica", duration: 5, still: 5 },
  { id: "cards", label: "Karte", duration: 4, still: 3.5 },
];

/** The order photos are picked in, by the start of their alt text in Sanity. */
const PREFERRED = [
  "team ada",
  "presentation",
  "audience 2",
  "klub ada",
  "stickers",
  "audience",
];

const CAPTION_KEYS: [string, string][] = [
  ["team", "team"],
  ["sticker", "stickers"],
  ["hackathon", "hackathon"],
  ["audience", "audience"],
  ["presentation", "presentation"],
  ["klub", "klub"],
];

/** Photos never to use, by their exact alt text: the empty room full of chairs. */
const EXCLUDED = ["hackathon"];

/** The camera's frame number from a file name like DSC01313.jpg. */
const frameNumber = (photo: GalleryPhoto) => {
  const match = photo.fileName?.match(/(\d+)\.\w+$/);
  return match ? Number(match[1]) : undefined;
};

/**
 * Frames this close together are one burst, near enough the same picture
 * (DSC01313 and DSC01314 are), so only the first of them is used.
 */
const BURST = 2;

const pickPhotos = (allPhotos: GalleryPhoto[], count: number) => {
  const photos = allPhotos.filter(
    (p) => !EXCLUDED.includes(p.alt?.toLowerCase().trim() ?? ""),
  );
  const chosen: GalleryPhoto[] = [];
  const fits = (photo: GalleryPhoto) => {
    if (chosen.includes(photo)) return false;
    const frame = frameNumber(photo);
    return (
      frame === undefined ||
      !chosen.some((other) => {
        const otherFrame = frameNumber(other);
        return (
          otherFrame !== undefined && Math.abs(otherFrame - frame) <= BURST
        );
      })
    );
  };
  for (const prefix of PREFERRED) {
    const photo = photos.find(
      (p) => p.alt?.toLowerCase().startsWith(prefix) && fits(p),
    );
    if (photo) chosen.push(photo);
  }
  for (const photo of photos) if (fits(photo)) chosen.push(photo);
  return chosen.slice(0, count);
};

/** A Sanity crop of `photo` at twice the size it is drawn, for sharp exports. */
const crop = (photo: GalleryPhoto, width: number, height: number) =>
  urlFor(photo)
    .width(Math.round(width * 2))
    .height(Math.round(height * 2))
    .fit("crop")
    .format("webp")
    .url();

/** The whole of `photo`, uncropped, at twice the width it is drawn. */
const whole = (photo: GalleryPhoto, width: number) =>
  urlFor(photo)
    .width(Math.round(width * 2))
    .format("webp")
    .url();

function Photo({
  photo,
  width,
  height,
  fit = "cover",
  className,
  style,
}: {
  photo: GalleryPhoto;
  width: number;
  height: number;
  /** `contain` shows the whole photo, letterboxed, instead of filling the box. */
  fit?: "cover" | "contain";
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <img
      src={fit === "contain" ? whole(photo, width) : crop(photo, width, height)}
      alt={photo.alt ?? ""}
      crossOrigin="anonymous"
      className={clsx(
        // Never squeezed by the flex layout around it, which would crop it
        // a second time.
        "block shrink-0",
        fit === "contain" ? "object-contain" : "object-cover",
        className,
      )}
      style={{ width, height, ...style }}
    />
  );
}

type LayoutProps = PostProps<GalleryPost> & {
  caption: (photo: GalleryPhoto) => string;
  title: string;
  recap: string;
  figures: { value: string; label: string }[];
  windowTitle: string;
};

/** The old Windows bevel of the hackathon site's windows. */
const raised =
  "border-[3px] border-t-[#e6e6e6] border-l-[#e6e6e6] border-r-[#262626] border-b-[#262626]";

/**
 * Galerija: the site's photo window, Finder's gallery view in the desktop's
 * chrome. One large preview over a filmstrip; the selection steps along the
 * strip, the preview cutting hard to each photo the way arrow keys do.
 */
function Finder({ t, format, data, windowTitle }: LayoutProps) {
  const compact = isCompact(format);
  const top = compact ? 300 : 375;
  const bottom = compact ? 64 : 88;
  const width = format.width - 104;
  const height = format.height - top - bottom;
  const strip = compact ? 104 : 150;
  const gap = 12;
  const preview = height - 48 - strip - 3 * gap - 12;
  const photos = pickPhotos(data.photos, 5);
  const selected = Math.min(
    photos.length - 1,
    Math.floor(Math.max(0, t - 0.3) / 0.9),
  );
  const thumbWidth =
    (width - 12 - 2 * gap - (photos.length - 1) * gap) / photos.length;

  return (
    <div
      className={clsx(
        "absolute flex flex-col bg-[#0C0303] shadow-[10px_10px_0_rgba(0,0,0,0.6)]",
        raised,
      )}
      style={{ left: 52, top, width, height }}
    >
      <div className="m-[3px] flex h-[42px] shrink-0 items-center bg-[#0C0303] px-[10px] ring-2 ring-[#bdbdbd]">
        <span
          className={clsx(
            lilex.className,
            "truncate text-[22px] font-bold uppercase",
          )}
        >
          / {windowTitle}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-[12px] p-[12px]">
        {/* Like Finder's preview, the whole photo, on black where it doesn't fill. */}
        <Photo
          photo={photos[selected]}
          width={width - 30}
          height={preview}
          fit="contain"
          className="w-full bg-black"
        />
        <div className="flex gap-[12px]">
          {photos.map((photo, index) => (
            <Photo
              key={index}
              photo={photo}
              width={thumbWidth}
              height={strip}
              style={{
                outline: index === selected ? `4px solid ${RED}` : undefined,
                outlineOffset: 3,
                opacity: index === selected ? 1 : 0.55,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Mreža: a contact sheet. The photos in a tight grid under the header, each
 * with a red tag naming it, appearing one by one in hard steps.
 */
function Grid({ t, format, data, caption }: LayoutProps) {
  const compact = isCompact(format);
  const tall = format.height > 1600;
  const columns = compact ? 3 : 2;
  const rows = tall ? 3 : 2;
  const gap = 16;
  const top = compact ? 320 : 400;
  const bottom = compact ? 64 : 88;
  const cellWidth = (format.width - 104 - (columns - 1) * gap) / columns;
  const cellHeight = (format.height - top - bottom - (rows - 1) * gap) / rows;
  const photos = pickPhotos(data.photos, columns * rows);

  return (
    <>
      <Header t={t} format={format} align="center" still />
      <div
        className="absolute grid"
        style={{
          left: 52,
          top,
          gap,
          gridTemplateColumns: `repeat(${columns}, ${cellWidth}px)`,
        }}
      >
        {photos.map((photo, index) => (
          <div
            key={index}
            className="relative border-2 border-[rgba(255,87,87,0.6)]"
            style={{ opacity: materialise(t, 0.2 + index * 0.22, 0.3) }}
          >
            <Photo
              photo={photo}
              width={cellWidth - 4}
              height={cellHeight - 4}
            />
            <span
              className={clsx(
                plexMono.className,
                "absolute bottom-[12px] left-[12px] bg-red px-[8px] py-[2px] font-semibold uppercase tracking-[0.08em] text-black",
              )}
              style={{ fontSize: compact ? 16 : 20 }}
            >
              {caption(photo)}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

/**
 * Naslovnica: one photo filling the frame under the header. The header sits
 * centred on the ground above it, never over a face, and the photo fades up
 * into the ground behind it. A slow settle from 106% is the only movement.
 */
function Cover({ t, format, data }: LayoutProps) {
  const compact = isCompact(format);
  const tall = format.height > 1600;
  const [photo] = pickPhotos(data.photos, 1);
  const settle = ease.outCubic(beat(t, 0, 5));
  const photoTop = compact ? 250 : tall ? 420 : 320;
  const photoHeight = format.height - photoTop;

  return (
    <>
      <div
        className="absolute inset-x-0 bottom-0 overflow-hidden"
        style={{ height: photoHeight }}
      >
        <Photo
          photo={photo}
          width={format.width}
          height={photoHeight}
          style={{ transform: `scale(${mix(1.06, 1, settle)})` }}
        />
        {/* The photo's top edge dissolves into the ground under the header. */}
        <div
          className="absolute inset-x-0 top-0"
          style={{
            height: photoHeight * 0.35,
            background: `linear-gradient(to bottom, ${INK}, ${INK}99 40%, transparent)`,
          }}
        />
      </div>
      <Header t={t} format={format} align="center" still />
    </>
  );
}

/**
 * Karte: a recap of last year. The photos dealt as the site's playing cards,
 * a fan on the card table's felt, over its three figures from the site's
 * numbers window. The fan opens once, from a squared-up deck.
 */
function Cards({
  t,
  format,
  data,
  caption,
  title,
  recap,
  figures,
}: LayoutProps) {
  const compact = isCompact(format);
  const tall = format.height > 1600;
  // The crowd lies on top of the fan, where the eye lands first.
  const picked = pickPhotos(data.photos, 5);
  const crowd =
    data.photos.find((p) => p.alt?.toLowerCase().trim() === "audience") ??
    picked[picked.length - 1];
  const photos = [...picked.filter((p) => p !== crowd).slice(0, 4), crowd];
  const cardWidth = compact ? 270 : tall ? 380 : 340;
  const cardHeight = (cardWidth * 10) / 7;
  const centreY = format.height / 2 + (compact ? 30 : 40);
  const open = ease.outCubic(beat(t, 0.3, 0.9));
  const spread = 13;
  const corner = (
    <img
      src="/assets/hackathon26/card-corner.svg"
      alt=""
      style={{ width: cardWidth * 0.045 }}
    />
  );

  return (
    <>
      {/* The table's rail, inset around the edge as on the site. */}
      <div className="pointer-events-none absolute inset-[24px] border-2 border-[rgba(255,87,87,0.2)]" />
      <div
        className="absolute inset-x-0 flex flex-col items-center text-center"
        style={{ top: compact ? 64 : tall ? 170 : 96, gap: compact ? 12 : 18 }}
      >
        <p
          className={clsx(
            plexMono.className,
            "font-medium uppercase tracking-[0.2em] text-red",
          )}
          style={{ fontSize: compact ? 22 : 28 }}
        >
          {recap}
        </p>
        <p
          className={clsx(
            instrumentSerif.className,
            "leading-none tracking-[-0.02em]",
          )}
          style={{ fontSize: compact ? 96 : 130 }}
        >
          {title}
        </p>
      </div>
      {photos.map((photo, index) => {
        const angle = (index - (photos.length - 1) / 2) * spread * open;
        return (
          <div
            key={index}
            className="absolute flex flex-col gap-[10px] border-[3px] border-red bg-[#170d10] p-[12px] shadow-[6px_8px_0_rgba(0,0,0,0.45)]"
            style={{
              width: cardWidth,
              height: cardHeight,
              left: format.width / 2 - cardWidth / 2,
              top: centreY - cardHeight / 2,
              transformOrigin: "50% 150%",
              transform: `rotate(${angle}deg)`,
            }}
          >
            <div
              className={clsx(
                plexMono.className,
                "flex items-center justify-between uppercase tracking-[0.12em] text-red",
              )}
              style={{ fontSize: cardWidth * 0.065 }}
            >
              {corner}
              <span>AdaHack</span>
              {corner}
            </div>
            <Photo
              photo={photo}
              width={cardWidth - 30}
              height={cardHeight * 0.7}
              className="w-full flex-1"
            />
            <p
              className={clsx(
                plexMono.className,
                "text-center uppercase tracking-[0.12em] text-red",
              )}
              style={{ fontSize: cardWidth * 0.06 }}
            >
              {caption(photo)}
            </p>
          </div>
        );
      })}
      {/* Last year in three figures, as on the site's numbers window. */}
      <div
        className="absolute inset-x-[52px] flex items-start justify-center"
        style={{
          bottom: compact ? 64 : tall ? 170 : 88,
          gap: compact ? 40 : 64,
        }}
      >
        {figures.map((figure, index) => (
          <div
            key={index}
            className="flex items-start"
            style={{ gap: compact ? 40 : 64 }}
          >
            {index > 0 && (
              <img
                src="/assets/hackathon26/card-corner.svg"
                alt=""
                className="mt-[0.9em] w-[16px]"
                style={{ fontSize: compact ? 64 : 88 }}
              />
            )}
            <div className="flex flex-col items-center gap-[10px]">
              <span
                className={clsx(instrumentSerif.className, "leading-none")}
                style={{ fontSize: compact ? 64 : 88 }}
              >
                {figure.value}
              </span>
              <span
                className={clsx(
                  plexMono.className,
                  "uppercase tracking-[0.14em] text-red",
                )}
                style={{ fontSize: compact ? 18 : 22 }}
              >
                {figure.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

const LAYOUTS: Record<GalleryVariant, (props: LayoutProps) => JSX.Element> = {
  finder: Finder,
  grid: Grid,
  cover: Cover,
  cards: Cards,
};

export function GalleryPostView({
  t,
  format,
  data,
  variant,
}: PostProps<GalleryPost> & { variant: GalleryVariant }) {
  const tPosts = useTranslations("Posts.gallery");
  const tPages = useTranslations("Hackathon.pages");
  const tNumbers = useTranslations("Hackathon.numbers");
  const figures = FIGURES_2025.map((figure) => ({
    value: `${figure.value}${"suffix" in figure ? figure.suffix : ""}`,
    label: tNumbers(figure.labelKey),
  }));
  const Layout = LAYOUTS[variant];

  const caption = (photo: GalleryPhoto) => {
    const alt = photo.alt?.toLowerCase() ?? "";
    const key = CAPTION_KEYS.find(([prefix]) => alt.includes(prefix))?.[1];
    return tPosts(`captions.${key ?? "fallback"}`);
  };

  return (
    <PostFrame
      t={t}
      format={format}
      rippleStill
      showRipple={variant === "finder"}
      background={variant === "cards" ? "#170d10" : INK}
    >
      {variant === "finder" && (
        <Header t={t} format={format} align="center" still />
      )}
      <Layout
        t={t}
        format={format}
        data={data}
        caption={caption}
        title={tPosts("title")}
        recap={tPosts("recap")}
        figures={figures}
        windowTitle={tPages("pictures")}
      />
    </PostFrame>
  );
}
