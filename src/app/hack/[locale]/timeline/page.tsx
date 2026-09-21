"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import { isSameDay, parseISO } from "date-fns";
import { useLocale, useTranslations } from "next-intl";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { formatTime } from "@/src/app/utils/date";
import imageLoader from "@/src/app/utils/image-loader";
import { useSanityData } from "@/src/app/utils/use-sanity-data";
import { Window } from "../components/window";

const GET_TIMELINE_ITEMS = `*[
  _type == "hack26TimelineItem"
] | order(time) {
  'title': coalesce(label[$language], label.sl),
  time,
  endTime,
  icon,
  'description': coalesce(description[$language], description.sl),
  'tag': coalesce(tag[$language], tag.sl)
}`;

type TimelineItem = {
  title: string;
  time: string;
  endTime?: string;
  icon?: SanityImageSource;
  description?: string;
  tag?: string;
};

/** Tiles per row on the board, once it is wide enough to lay one out. */
const COLUMNS = 4;

const chunk = <T,>(list: T[], size: number) =>
  Array.from({ length: Math.ceil(list.length / size) }, (_, row) =>
    list.slice(row * size, row * size + size),
  );

/** Whether `now` falls inside the slot starting at `time` and ending at `end`. */
const isNow = (time: string, end?: string) => {
  const now = new Date();
  const start = parseISO(time);
  if (end) return now >= start && now <= parseISO(end);
  return now >= start && isSameDay(now, start);
};

/** The "FRI · 16.00" line under a tile's title. */
const formatSlot = (locale: string, { time, endTime }: TimelineItem) =>
  [
    new Date(time).toLocaleDateString(locale, { weekday: "short" }),
    `${formatTime(time)}${endTime ? `-${formatTime(endTime)}` : ""}`,
  ].join(" · ");

/**
 * The dotted path drawn from a tile to the one after it - along the row while
 * the row lasts, then down into the turn. Stacked on a phone, every tile just
 * connects downwards.
 */
function Connector({ index }: { index: number }) {
  const turnsDown = (index + 1) % COLUMNS === 0;
  const runsLeft = Math.floor(index / COLUMNS) % 2 === 1;

  return (
    <span
      aria-hidden
      className={clsx(
        "absolute border-dotted border-[rgba(255,87,87,0.5)] pointer-events-none",
        "left-1/2 top-full h-4 border-l",
        !turnsDown && [
          "md:top-1/2 md:h-0 md:w-4 md:border-t md:border-l-0",
          runsLeft ? "md:left-auto md:right-full" : "md:left-full",
        ],
      )}
    />
  );
}

/** The shared face of a tile: number, icon, title and time slot. */
function TileFace({
  item,
  number,
  isCurrent,
  size = "sm",
}: {
  item: TimelineItem;
  number: number;
  isCurrent: boolean;
  size?: "sm" | "lg";
}) {
  const locale = useLocale();

  return (
    <>
      <span
        className={clsx(
          "absolute left-3 top-2 font-heading text-xs tracking-widest",
          isCurrent ? "bg-red px-1 text-black" : "text-red",
        )}
      >
        {`[${String(number).padStart(2, "0")}]`}
      </span>
      {item.icon && (
        <Image
          src={imageLoader(item.icon, 128)}
          alt=""
          width={size === "lg" ? 48 : 40}
          height={size === "lg" ? 48 : 40}
          className="object-contain [image-rendering:pixelated]"
        />
      )}
      <span className="font-heading font-bold uppercase tracking-widest text-white text-sm md:text-base">
        {item.title}
      </span>
      <span className="font-heading uppercase tracking-widest text-gray400 text-xs">
        {formatSlot(locale, item)}
      </span>
    </>
  );
}

/** A game-style badge pinned over the bottom edge of a tile, e.g. "+10 HP". */
const Tag = ({ children }: { children: string }) => (
  <span className="absolute -bottom-2 right-2 max-w-[calc(100%-1rem)] truncate bg-red px-1.5 font-heading text-[10px] font-bold uppercase tracking-wider text-black">
    {children}
  </span>
);

/**
 * The popup behind a tile, with the description the board itself has no room
 * for. A native dialog so that Escape, the backdrop and the focus trap all
 * come for free.
 */
function TileDialog({
  item,
  number,
  isCurrent,
  onClose,
}: {
  item: TimelineItem;
  number: number;
  isCurrent: boolean;
  onClose: () => void;
}) {
  const t = useTranslations("Hackathon");
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      // Clicks land on the dialog itself only when they miss its contents,
      // which is the backdrop.
      onClick={(event) => event.target === dialogRef.current && onClose()}
      aria-label={item.title}
      className="fixed inset-0 m-0 hidden h-full max-h-none w-full max-w-none items-center justify-center bg-transparent p-4 open:flex backdrop:bg-[rgba(0,0,0,0.7)]"
    >
      <div className="relative flex w-[min(22rem,100%)] flex-col items-center gap-2 border border-red bg-[#150606] px-6 pb-8 pt-10 text-center shadow-shineStrongRed">
        <TileFace item={item} number={number} isCurrent={isCurrent} size="lg" />
        {item.description && (
          <p className="mt-2 font-heading text-sm leading-relaxed text-gray400">
            {item.description}
          </p>
        )}
        {item.tag && <Tag>{item.tag}</Tag>}
        <button
          type="button"
          onClick={onClose}
          aria-label={t("quest.close")}
          className="absolute right-2 top-1 font-heading text-lg leading-none text-gray400 outline-none hover:text-white focus-visible:text-white focus-visible:underline"
        >
          ×
        </button>
      </div>
    </dialog>
  );
}

/** The solid red START and the dark FINISH tiles that bookend the board. */
const EndTile = ({
  label,
  hint,
  isStart,
}: {
  label: string;
  hint: string;
  isStart?: boolean;
}) => (
  <div
    className={clsx(
      "flex grow flex-col items-center justify-center gap-1 border p-4 min-h-[8.5rem]",
      isStart
        ? "border-red bg-red text-black"
        : "border-red bg-[rgba(255,87,87,0.15)] text-white shadow-shineRed",
    )}
  >
    <span className="font-heading text-xl font-bold uppercase tracking-widest">
      {label}
    </span>
    <span className="font-heading text-xs uppercase tracking-widest opacity-70">
      {hint}
    </span>
  </div>
);

export default function Page() {
  const t = useTranslations("Hackathon");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const locale = useLocale();
  const { data } = useSanityData({
    query: GET_TIMELINE_ITEMS,
    params: { language: locale },
  });

  const items = (data || []) as TimelineItem[];
  const currentIndex = items.findIndex(({ time, endTime }, index) =>
    isNow(time, endTime || items[index + 1]?.time),
  );

  if (!items.length) {
    return (
      <Window title={t("pages.timeline")}>
        <p className="font-paragraph text-base">{t("main_cta")}</p>
      </Window>
    );
  }

  // START and FINISH are tiles on the board too, so they take a slot each.
  const tiles = [
    <>
      <EndTile label={t("quest.start")} hint={t("quest.start_hint")} isStart />
      <Connector index={0} />
    </>,
    ...items.map((item, index) => {
      const tileIndex = index + 1;
      const isCurrent = index === currentIndex;

      return (
        <>
          <button
            type="button"
            onClick={() => setOpenIndex(index)}
            aria-label={
              isCurrent ? `${item.title} - ${t("quest.now")}` : item.title
            }
            className={clsx(
              "flex h-full w-full flex-col items-center justify-center gap-1.5 border bg-[#150606] p-4 pt-8 text-center outline-none transition-shadow min-h-[8.5rem]",
              isCurrent
                ? "border-red bg-[rgba(255,87,87,0.1)] shadow-shineStrongRed"
                : "border-[rgba(255,87,87,0.3)] hover:border-red hover:shadow-shineRed",
            )}
          >
            <TileFace item={item} number={tileIndex} isCurrent={isCurrent} />
          </button>
          {item.tag && <Tag>{item.tag}</Tag>}
          <Connector index={tileIndex} />
        </>
      );
    }),
    <EndTile label={t("quest.finish")} hint={t("quest.finish_hint")} />,
  ];

  return (
    <Window title={t("pages.timeline")}>
      <div className="mx-auto flex max-w-[1000px] flex-col gap-2">
        <h1 className="font-heading text-2xl font-bold uppercase tracking-widest text-white md:text-3xl">
          {t("quest.heading")}
        </h1>
        <p className="font-heading text-sm text-gray400">
          {t("quest.subtitle")}
        </p>

        <div className="mt-4 flex flex-col gap-4">
          {chunk(tiles, COLUMNS).map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={clsx(
                "flex flex-col gap-4 md:grid md:grid-cols-4",
                // Every other row runs the other way, so the board reads as one
                // continuous path. A right-to-left row also fills from the right
                // when it is the last one and short of tiles, which is where the
                // path ends up.
                rowIndex % 2 === 1 && "md:[direction:rtl]",
              )}
            >
              {row.map((tile, columnIndex) => (
                <div
                  key={columnIndex}
                  className="relative flex flex-col md:[direction:ltr]"
                >
                  {tile}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {openIndex !== null && (
        <TileDialog
          item={items[openIndex]}
          number={openIndex + 1}
          isCurrent={openIndex === currentIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </Window>
  );
}
