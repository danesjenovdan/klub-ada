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
 * The schedule as the site's quest board, one column per day: tiles come up
 * dim, then a red token hops down them like a board-game piece, lighting each
 * one as it lands, then steps off the board leaving every tile lit.
 */
export function TimelinePostView({
  t,
  format,
  data,
}: PostProps<TimelinePostItem[]>) {
  const tPosts = useTranslations("Posts.timeline");
  const locale = useLocale();
  const compact = isCompact(format);
  const tall = format.height > 1600;

  const days = Object.values(
    data.reduce<Record<string, TimelinePostItem[]>>((groups, item) => {
      (groups[dayKey(item.time)] ??= []).push(item);
      return groups;
    }, {}),
  );
  const rows = Math.max(...days.map((day) => day.length), 1);

  // Under the duck and the heading, with the same margin at the bottom.
  const top = compact ? 220 : tall ? 300 : 250;
  const bottom = compact ? 64 : 88;
  const area = format.height - top - bottom;
  // The day button, then a tile per row.
  const rowHeight = Math.min(tall ? 190 : 140, (area - 72) / rows);
  const titleSize = Math.min(tall ? 50 : 40, rowHeight * 0.4);

  // Tiles in board order across both days, for the token's walk.
  let boardIndex = 0;
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

      <div
        className="absolute inset-x-[52px] grid gap-[32px]"
        style={{
          top,
          gridTemplateColumns: `repeat(${Math.max(days.length, 1)}, minmax(0, 1fr))`,
        }}
      >
        {days.map((items, dayIndex) => (
          <div key={dayIndex} className="flex flex-col">
            <div
              className="mb-[22px]"
              style={{ opacity: materialise(t, 0.7 + dayIndex * 0.15) }}
            >
              <NotchButton
                size="sm"
                color={dayIndex === 0 ? RED : WHITE}
                style={{ color: dayIndex === 0 ? WHITE : INK }}
              >
                {formatDay(items[0].time, locale)}
              </NotchButton>
            </div>
            <div className="relative">
              {/* The dotted path down the column, drawn ahead of the tiles. */}
              <div
                className="absolute left-[31px] top-[10px] w-0 border-l-[3px] border-dotted border-[rgba(255,87,87,0.55)]"
                style={{
                  height:
                    Math.max(0, (items.length - 1) * rowHeight) *
                    ease.outCubic(beat(t, 0.9 + dayIndex * 0.3, 1.1)),
                  top: rowHeight / 2,
                }}
              />
              {items.map((item) => {
                const index = boardIndex++;
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
                    className="relative flex items-center gap-[22px]"
                    style={{
                      height: rowHeight,
                      opacity: appear * mix(0.38, 1, landed),
                      transform: `translateX(${(1 - appear) * -40}px)`,
                    }}
                  >
                    <div
                      className="relative flex shrink-0 items-center justify-center border-2"
                      style={{
                        width: 64,
                        height: 64,
                        borderColor: landed ? RED : "rgba(255,87,87,0.35)",
                        background: isHere ? RED : "#150606",
                        transform: `scale(${1 + pop * 0.18})`,
                      }}
                    >
                      {item.icon && (
                        <img
                          src={item.icon}
                          alt=""
                          width={40}
                          height={40}
                          crossOrigin="anonymous"
                          className="h-[40px] w-[40px] [image-rendering:pixelated]"
                          style={{
                            filter: isHere ? "brightness(0)" : undefined,
                          }}
                        />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p
                        className={clsx(
                          plexMono.className,
                          "tracking-[0.06em]",
                        )}
                        style={{
                          fontSize: Math.min(26, titleSize * 0.8),
                          color: RED,
                        }}
                      >
                        {formatClock(item.time, locale)}
                        {item.endTime &&
                        dayKey(item.endTime) === dayKey(item.time)
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
                        {item.title}
                      </p>
                    </div>
                    {item.tag && (
                      <span
                        className={clsx(
                          plexMono.className,
                          "absolute right-0 top-[8px] whitespace-nowrap bg-red px-[8px] py-[2px] font-semibold uppercase tracking-[0.06em] text-black",
                        )}
                        style={{
                          fontSize: 16,
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
        ))}
      </div>
    </PostFrame>
  );
}
