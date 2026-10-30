"use client";

import clsx from "clsx";
import { useLocale, useTranslations } from "next-intl";
import { lilex, plexMono } from "@/src/app/fonts";
import { TimelinePostItem, dayKey, formatClock, formatDay } from "../data";
import {
  INK,
  NotchButton,
  PostFrame,
  PostProps,
  RED,
  WHITE,
  isCompact,
  materialise,
} from "../frame";
import { beat, ease, mix } from "../motion";

export const TIMELINE_DURATION = 8;
export const TIMELINE_STILL = 6.6;

/** When the token sets off, and how long it takes per tile. */
const TOKEN_START = 1.9;
const HOP = 0.3;

/**
 * Pixel icons for the items that have none in Sanity yet, picked by a word in
 * the title, in either language.
 */
const FALLBACK_ICONS: [RegExp, string][] = [
  [/kosilo|lunch/i, "11-lunch"],
  [/večerja|dinner/i, "12-dinner"],
  [/zajtrk|breakfast/i, "13-breakfast"],
  [/delavnica|workshop/i, "14-workshop"],
  [/kviz|quiz/i, "15-quiz"],
];

const iconFor = (item: TimelinePostItem) => {
  if (item.icon) return item.icon;
  const match = FALLBACK_ICONS.find(([words]) => words.test(item.title));
  return match && `/assets/hackathon26/timeline/${match[1]}.svg`;
};

/** "Delavnica #1: TBD" reads "Delavnica #1": a placeholder isn't news. */
const titleFor = (item: TimelinePostItem) =>
  item.title.replace(/\s*[:–-]?\s*TBD\s*$/i, "").trim();

/** The schedule split by the Ljubljana day each item starts on, in order. */
export const timelineDays = (items: TimelinePostItem[]) =>
  Object.values(
    items.reduce<Record<string, TimelinePostItem[]>>((groups, item) => {
      (groups[dayKey(item.time)] ??= []).push(item);
      return groups;
    }, {}),
  );

export type TimelineDay = {
  items: TimelinePostItem[];
  /** Which day of the hackathon this is, from 0, and how many there are. */
  day: number;
  days: number;
};

/**
 * One day of the schedule as the site's quest board, one post per day so the
 * two read as a carousel: tiles come up dim, then a red token hops down them
 * like a board-game piece, lighting each one as it lands, then steps off the
 * board leaving every tile lit.
 */
export function TimelinePostView({
  t,
  format,
  data: { items, day, days },
}: PostProps<TimelineDay>) {
  const tPosts = useTranslations("Posts.timeline");
  const locale = useLocale();
  const compact = isCompact(format);
  const tall = format.height > 1600;

  // Under the duck and the heading, with the same margin at the bottom.
  const top = compact ? 220 : tall ? 300 : 250;
  const bottom = compact ? 64 : 88;
  const area = format.height - top - bottom;
  // The day button, then a tile per row.
  const rowHeight = Math.min(
    tall ? 190 : 150,
    (area - 96) / Math.max(items.length, 1),
  );
  const titleSize = Math.min(tall ? 54 : 46, rowHeight * 0.42);
  const tile = Math.min(76, rowHeight * 0.72);

  const landedAt = (index: number) => TOKEN_START + (index + 1) * HOP;

  const heading = tPosts("heading");

  return (
    <PostFrame t={t} format={format}>
      {/* One row on the board's edges: the heading leads, the duck closes it,
          both centred on the same line. */}
      <div
        className="absolute inset-x-[52px] flex items-center justify-between"
        style={{ top: compact ? 48 : 64 }}
      >
        <h2
          className={clsx(
            lilex.className,
            "font-extrabold leading-none tracking-[-0.02em]",
          )}
          style={{ fontSize: compact ? 84 : 112 }}
        >
          {heading}
        </h2>
        <img
          src="/assets/hackathon26/social/duck.svg"
          alt=""
          className="h-auto shrink-0 [image-rendering:pixelated]"
          style={{ width: compact ? 104 : 136 }}
        />
      </div>

      <div className="absolute inset-x-[52px] flex flex-col" style={{ top }}>
        <div
          className="mb-[30px] flex items-center justify-between"
          style={{ opacity: materialise(t, 0.7) }}
        >
          <NotchButton
            size="sm"
            color={day === 0 ? RED : WHITE}
            style={{ color: day === 0 ? WHITE : INK }}
          >
            {formatDay(items[0].time, locale)}
          </NotchButton>
          {/* Where this post sits in the carousel. */}
          {days > 1 && (
            <span
              className={clsx(plexMono.className, "tracking-[0.12em]")}
              style={{ fontSize: 26, color: RED }}
            >
              {day + 1}/{days}
            </span>
          )}
        </div>
        <div className="relative">
          {/* The dotted path down the column, drawn ahead of the tiles. */}
          <div
            className="absolute w-0 border-l-[3px] border-dotted border-[rgba(255,87,87,0.55)]"
            style={{
              left: tile / 2 - 1,
              height:
                Math.max(0, (items.length - 1) * rowHeight) *
                ease.outCubic(beat(t, 0.9, 1.1)),
              top: rowHeight / 2,
            }}
          />
          {items.map((item, index) => {
            const appear = ease.outExpo(beat(t, 1.0 + index * 0.07, 0.5));
            const landed = beat(t, landedAt(index) - 0.05, 0.12);
            const isHere =
              t >= landedAt(index) - 0.05 && t < landedAt(index + 1) - 0.05;
            const pop = isHere
              ? Math.sin(beat(t, landedAt(index) - 0.05, 0.25) * Math.PI)
              : 0;
            return (
              <div
                key={item._id}
                className="relative flex items-center gap-[28px]"
                style={{
                  height: rowHeight,
                  opacity: appear * mix(0.38, 1, landed),
                  transform: `translateX(${(1 - appear) * -40}px)`,
                }}
              >
                <div
                  className="relative flex shrink-0 items-center justify-center border-2"
                  style={{
                    width: tile,
                    height: tile,
                    borderColor: landed ? RED : "rgba(255,87,87,0.35)",
                    background: isHere ? RED : "#150606",
                    transform: `scale(${1 + pop * 0.18})`,
                  }}
                >
                  {iconFor(item) && (
                    <img
                      src={iconFor(item)}
                      alt=""
                      width={40}
                      height={40}
                      crossOrigin="anonymous"
                      className="[image-rendering:pixelated]"
                      style={{
                        width: tile * 0.62,
                        height: tile * 0.62,
                        filter: isHere ? "brightness(0)" : undefined,
                      }}
                    />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p
                    className={clsx(plexMono.className, "tracking-[0.06em]")}
                    style={{
                      fontSize: Math.min(28, titleSize * 0.65),
                      color: RED,
                    }}
                  >
                    {formatClock(item.time, locale)}
                    {item.endTime && dayKey(item.endTime) === dayKey(item.time)
                      ? `–${formatClock(item.endTime, locale)}`
                      : ""}
                  </p>
                  <p
                    className={clsx(
                      lilex.className,
                      "font-bold leading-[1.05] tracking-[-0.01em]",
                    )}
                    style={{ fontSize: titleSize }}
                  >
                    {titleFor(item)}
                  </p>
                </div>
                {item.tag && (
                  <span
                    className={clsx(
                      plexMono.className,
                      "shrink-0 whitespace-nowrap bg-red px-[10px] py-[3px] font-semibold uppercase tracking-[0.06em] text-black",
                    )}
                    style={{
                      fontSize: 20,
                      transform: `scale(${landed ? ease.outBack(beat(t, landedAt(index), 0.35)) : 0}) rotate(3deg)`,
                    }}
                  >
                    {item.tag}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </PostFrame>
  );
}
