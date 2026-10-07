"use client";

import clsx from "clsx";
import { useTranslations } from "next-intl";
import { IconMinus, IconSquare, IconX } from "@tabler/icons-react";
import { instrumentSerif, plexMono } from "@/src/app/fonts";
import { urlFor } from "@/sanity/lib/image";
import { WorkshopPost } from "../data";
import {
  GRAY,
  Header,
  NotchButton,
  PostFrame,
  PostProps,
  isCompact,
} from "../frame";
import { beat, ease, mix } from "../motion";
import { DEFAULT_CROP, ScreenPhoto } from "./screen-photo";

/*
 * Workshop posts: the speaker's photo opens in a window from the hackathon
 * desktop, the zoom rectangles growing out the way Windows drew it at 0.3s.
 * Nothing else moves. The photo is shown as on an old monitor, in red.
 */

export const WORKSHOP_DURATION = 4.5;
export const WORKSHOP_STILL = 3.5;

/** The old Windows bevel of the hackathon site's windows. */
const raised =
  "border-[3px] border-t-[#e6e6e6] border-l-[#e6e6e6] border-r-[#262626] border-b-[#262626]";

/** The height of a window's title bar and frame around the photo. */
export const CHROME = 56;

/**
 * The speaker's photo in a desktop window. Before it opens, four dotted
 * outlines grow from the title-bar corner to its size, as Windows drew it.
 */
export function PhotoWindow({
  t,
  data,
  title,
  left,
  top,
  photoWidth,
  photoHeight,
}: {
  t: number;
  data: WorkshopPost;
  title: string;
  /** Where to pin it; without these it takes its place in the flow. */
  left?: number;
  top?: number;
  photoWidth: number;
  photoHeight: number;
}) {
  const width = photoWidth + 12;
  const height = photoHeight + CHROME;
  const zoom = beat(t, 0.3, 0.42);
  const pinned = left !== undefined && top !== undefined;
  // The original photo: the treatment is drawn from it in the browser.
  const photoSrc = data.photo
    ? urlFor(data.photo).width(1000).format("jpg").url()
    : data.photoUrl;

  return (
    <div
      className={clsx(pinned ? "absolute" : "relative shrink-0")}
      style={{ left, top, width, height }}
    >
      {t < 0.72 ? (
        zoom > 0 &&
        [0, 1, 2, 3].map((index) => {
          const p = ease.outCubic(
            Math.max(0, zoom - index * 0.12) / (1 - index * 0.12 * 0.5),
          );
          if (p <= 0) return null;
          return (
            <div
              key={index}
              className="absolute left-0 top-0 border-[3px] border-dotted border-[#fafafa]"
              style={{
                width: mix(60, width, Math.min(1, p)),
                height: mix(30, height, Math.min(1, p)),
                opacity: 0.85 - index * 0.15,
              }}
            />
          );
        })
      ) : (
        <div
          className={clsx(
            "absolute inset-0 flex flex-col bg-[#0C0303] shadow-[10px_10px_0_rgba(0,0,0,0.6)]",
            raised,
          )}
        >
          <div className="m-[3px] flex h-[40px] shrink-0 items-center justify-between bg-[#0C0303] px-[6px] ring-2 ring-[#bdbdbd]">
            <span className="truncate px-[4px] text-[22px] font-bold uppercase">
              / {title}
            </span>
            <span className="flex gap-[4px]">
              {[IconMinus, IconSquare, IconX].map((Icon, index) => (
                <span
                  key={index}
                  className="flex h-[28px] w-[28px] items-center justify-center border-2 border-b-[#262626] border-l-[#e6e6e6] border-r-[#262626] border-t-[#e6e6e6] bg-[#bdbdbd] text-black"
                >
                  <Icon size={16} stroke={3} />
                </span>
              ))}
            </span>
          </div>
          <div className="relative m-[3px] mt-0 flex-1 overflow-hidden bg-[#170d10]">
            {photoSrc ? (
              <ScreenPhoto
                src={photoSrc}
                width={photoWidth}
                height={photoHeight}
                alt={data.speaker}
                crop={{
                  zoom: data.photoZoom ?? DEFAULT_CROP.zoom,
                  x: data.photoX ?? DEFAULT_CROP.x,
                  y: data.photoY ?? DEFAULT_CROP.y,
                }}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <img
                  src="/assets/hackathon26/card-duck.svg"
                  alt=""
                  className="w-1/2"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

type LayoutProps = PostProps<WorkshopPost> & {
  kicker: string;
};

/**
 * The workshop post: the header centred on top, then the speaker's photo,
 * 4:3, in a window titled with the workshop's number, then the title and
 * who runs it, centred under it on the same axis.
 */
function Horizontal({ t, format, data, kicker }: LayoutProps) {
  const tPosts = useTranslations("Posts.workshop");
  const compact = isCompact(format);
  const tall = format.height > 1600;
  const headerBottom = compact ? 310 : 390;
  const bottom = compact ? 64 : 88;
  const gap = compact ? 28 : 40;
  // The row under the window: title, name and role.
  const textBlock = compact ? 170 : tall ? 300 : 220;
  // A 4:3 photo, as large as the space between header and text allows,
  // centred over the row.
  const photoHeight = Math.min(
    ((format.width - 104 - 12) * 3) / 4,
    format.height - bottom - textBlock - gap - (headerBottom + gap) - CHROME,
  );
  const photoWidth = (photoHeight * 4) / 3;
  // Window and text are one group, centred under the header, so the text
  // stays right under the photo even where the frame has height to spare.
  const groupHeight = photoHeight + CHROME + gap + textBlock;
  const windowTop =
    headerBottom +
    gap +
    (format.height - bottom - headerBottom - gap - groupHeight) / 2;
  const textTop = windowTop + photoHeight + CHROME + gap;
  const titleSize = compact ? 40 : tall ? 60 : 50;

  return (
    <>
      <Header t={t} format={format} align="center" still />
      <PhotoWindow
        t={t}
        data={data}
        title={kicker}
        left={(format.width - photoWidth - 12) / 2}
        top={windowTop}
        photoWidth={photoWidth}
        photoHeight={photoHeight}
      />
      {/* The site's button, smaller, pinned over the window's corner. */}
      <NotchButton
        size="sm"
        className="absolute"
        style={{
          fontSize: compact ? 20 : 24,
          padding: compact ? "10px 22px" : "12px 26px",
          right: (format.width - photoWidth - 12) / 2 - 18,
          top: windowTop + photoHeight + CHROME - 28,
        }}
      >
        {tPosts("kicker")}
      </NotchButton>
      <div
        className="absolute inset-x-[52px] flex items-start justify-center text-center"
        style={{ top: textTop, height: textBlock }}
      >
        <div
          className="flex min-w-0 flex-col items-center"
          style={{ gap: compact ? 10 : 16 }}
        >
          <h2
            className="font-extrabold leading-[1.05] tracking-[-0.02em]"
            style={{ fontSize: titleSize }}
          >
            {data.title}
          </h2>
          <div className="flex flex-col items-center gap-[6px]">
            <p
              className={clsx(instrumentSerif.className, "leading-none")}
              style={{ fontSize: compact ? 38 : tall ? 56 : 48 }}
            >
              {data.speaker}
            </p>
            {data.speakerRole && (
              <p
                className={clsx(plexMono.className, "tracking-[0.02em]")}
                style={{ fontSize: compact ? 20 : 24, color: GRAY }}
              >
                {data.speakerRole}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export function WorkshopPostView({ t, format, data }: PostProps<WorkshopPost>) {
  const tPosts = useTranslations("Posts.workshop");

  const kicker = data.number
    ? `${tPosts("kicker")} #${data.number}`
    : tPosts("kicker");

  return (
    <PostFrame t={t} format={format}>
      <Horizontal t={t} format={format} data={data} kicker={kicker} />
    </PostFrame>
  );
}
