"use client";

import clsx from "clsx";
import { IconMinus, IconSquare, IconX } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { lilex, plexMono } from "@/src/app/fonts";
import { FaqItem } from "../data";
import { Format } from "../formats";
import { Header, PostFrame, PostProps, isCompact } from "../frame";

/*
 * The FAQ as an Instagram carousel, in the website's FAQ window: the desktop
 * chrome around an accordion in Plex Mono. The cover lists the questions
 * closed under the header; each post after it opens one question, red-framed,
 * with the next ones closed below. They hold still; motion would only fight
 * the reading.
 */

export const FAQ_DURATION = 3;
export const FAQ_STILL = 1;

/** The old Windows bevels of the hackathon site's windows. */
const raised =
  "border-[3px] border-t-[#e6e6e6] border-l-[#e6e6e6] border-r-[#262626] border-b-[#262626]";
const sunken =
  "border-[3px] border-t-[#262626] border-l-[#262626] border-r-[#e6e6e6] border-b-[#e6e6e6]";

/** Type sizes relative to a 4:5 post. */
const unitFor = (format: Format) =>
  isCompact(format) ? 0.82 : format.height > 1600 ? 1.12 : 1;

/** The site's window: a title bar with its three buttons over a sunken body. */
function FaqWindow({
  title,
  counter,
  className,
  style,
  children,
}: {
  title: string;
  counter?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <div
      className={clsx(
        "absolute flex flex-col bg-[#0C0303] shadow-[10px_10px_0_rgba(0,0,0,0.6)]",
        raised,
        className,
      )}
      style={style}
    >
      <div className="m-[3px] flex h-[52px] shrink-0 items-center justify-between gap-[12px] bg-[#0C0303] px-[10px] ring-2 ring-[#bdbdbd]">
        <span
          className={clsx(
            lilex.className,
            "truncate px-[4px] text-[26px] font-bold uppercase",
          )}
        >
          / {title}
        </span>
        <span className="flex items-center gap-[6px]">
          {counter && (
            <span
              className={clsx(
                plexMono.className,
                "mr-[10px] text-[22px] tracking-[0.08em] text-[#9d9d9d]",
              )}
            >
              {counter}
            </span>
          )}
          {[IconMinus, IconSquare, IconX].map((Icon, index) => (
            <span
              key={index}
              className="flex h-[34px] w-[34px] items-center justify-center border-2 border-b-[#262626] border-l-[#e6e6e6] border-r-[#262626] border-t-[#e6e6e6] bg-[#bdbdbd] text-black"
            >
              <Icon size={20} stroke={3} />
            </span>
          ))}
        </span>
      </div>
      <div
        className={clsx(
          "m-[3px] mt-0 flex flex-1 flex-col justify-center overflow-hidden bg-[#0C0303]",
          sunken,
        )}
      >
        {children}
      </div>
    </div>
  );
}

/** The site's plus/minus: two square-capped strokes in red. */
function Toggle({ open, size }: { open: boolean; size: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className="shrink-0 text-red"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="square"
      style={{ marginTop: size * 0.08 }}
    >
      <path d="M5 12H19" />
      {!open && <path d="M12 5V19" />}
    </svg>
  );
}

/** One accordion item: a 2px frame, red and filled while open. */
function Item({
  question,
  answer,
  unit,
}: {
  question: string;
  /** Shown when given: the item is open. */
  answer?: string;
  unit: number;
}) {
  const open = answer !== undefined;
  const pad = 34 * unit;
  const length = answer?.length ?? 0;
  const answerSize = (length > 220 ? 30 : length > 150 ? 33 : 36) * unit;
  return (
    <div
      className={clsx(
        "border-2",
        open ? "border-red bg-[#0c0303]" : "border-[#2c2424]",
      )}
    >
      <div
        className="flex items-start"
        style={{ gap: 22 * unit, padding: pad }}
      >
        <Toggle open={open} size={40 * unit} />
        <span
          className="font-semibold leading-[1.2] tracking-[-0.02em] text-[#fafafa]"
          style={{ fontSize: (open ? 42 : 32) * unit }}
        >
          {question}
        </span>
      </div>
      {open && (
        <p
          className="whitespace-pre-line font-light leading-[1.45] tracking-[-0.02em] text-[#9d9d9d]"
          style={{
            fontSize: answerSize,
            padding: `0 ${pad}px ${pad}px`,
          }}
        >
          {answer}
        </p>
      )}
    </div>
  );
}

/**
 * The cover: the header, centred, and under it the window with the first
 * questions closed.
 */
export function FaqCoverView({ t, format, data }: PostProps<FaqItem[]>) {
  const tFaq = useTranslations("Hackathon.faq");
  const compact = isCompact(format);
  const tall = format.height > 1600;
  const unit = unitFor(format);
  const shown = data.slice(0, compact ? 4 : tall ? 9 : 6);

  return (
    <PostFrame t={t} format={format}>
      <Header t={t} format={format} align="center" still />
      <FaqWindow
        title={tFaq("title")}
        className="inset-x-[52px]"
        style={{ top: compact ? 300 : 390, bottom: compact ? 64 : 88 }}
      >
        <div
          className={clsx(plexMono.className, "flex flex-col")}
          style={{ gap: 4, padding: 28 * unit }}
        >
          {shown.map((item) => (
            <Item key={item._id} question={item.question} unit={unit} />
          ))}
        </div>
      </FaqWindow>
    </PostFrame>
  );
}

/**
 * One question open in the window, the next ones closed under it so the post
 * reads as a page of the site's FAQ. No header: only the cover carries it.
 */
export function FaqItemView({
  t,
  format,
  data,
}: PostProps<{ items: FaqItem[]; index: number }>) {
  const tFaq = useTranslations("Hackathon.faq");
  const compact = isCompact(format);
  const tall = format.height > 1600;
  const unit = unitFor(format);
  const { items, index } = data;
  const item = items[index];
  const next = items.slice(index + 1, index + 1 + (compact ? 1 : tall ? 3 : 2));
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <PostFrame t={t} format={format}>
      <FaqWindow
        title={tFaq("title")}
        counter={`${pad(index + 1)}/${pad(items.length)}`}
        className="inset-x-[52px]"
        style={{ top: compact ? 64 : 88, bottom: compact ? 64 : 88 }}
      >
        <div
          className={clsx(plexMono.className, "flex flex-col")}
          style={{ gap: 4, padding: 32 * unit }}
        >
          <Item question={item.question} answer={item.answer} unit={unit} />
          {next.map((other) => (
            <div key={other._id} className="opacity-60">
              <Item question={other.question} unit={unit} />
            </div>
          ))}
        </div>
      </FaqWindow>
    </PostFrame>
  );
}
