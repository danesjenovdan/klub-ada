"use client";

import { CSSProperties } from "react";
import clsx from "clsx";
import { IconMinus, IconSquare, IconX } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { instrumentSerif, plexMono } from "@/src/app/fonts";
import { Format } from "../formats";
import {
  GRAY,
  Header,
  INK,
  NotchButton,
  PostFrame,
  PostProps,
  RED,
  isCompact,
} from "../frame";
import { beat, caretVisible, ease, mix, steps, typed } from "../motion";
import { Pointer } from "./pointer";

/*
 * Registration posts: "registration is open", then one for every batch that
 * sells out. Five layouts to choose from, each with one movement at most, all
 * pointing people to the site.
 */

export type Registration =
  | { kind: "open" }
  | { kind: "soldout"; batch: number };

export type RegistrationVariant = "phone" | "dialog" | "ticket" | "progress";

export const REGISTRATION_VARIANTS: {
  id: RegistrationVariant;
  label: string;
  duration: number;
  still: number;
}[] = [
  { id: "phone", label: "Telefon", duration: 4.5, still: 4 },
  { id: "dialog", label: "Okno", duration: 4.5, still: 4 },
  { id: "ticket", label: "Vstopnica", duration: 4, still: 3.6 },
  { id: "progress", label: "Napredek", duration: 4.5, still: 4 },
];

export const BATCHES = 3;

/** The empty band a story keeps at the bottom for the link sticker. */
const STICKER_BAND = 360;
const URL = "hack.klub-ada.si";

const raised =
  "border-[3px] border-t-[#e6e6e6] border-l-[#e6e6e6] border-r-[#262626] border-b-[#262626]";
const sunken =
  "border-[3px] border-t-[#262626] border-l-[#262626] border-r-[#e6e6e6] border-b-[#e6e6e6]";

type LayoutProps = PostProps<Registration> & {
  /** Sizes relative to a 4:5 post. */
  unit: number;
  /** The space under the header the layout fills. */
  top: number;
  bottom: number;
};

const useCopy = (data: Registration) => {
  const t = useTranslations("Posts.registration");
  const soldOut = data.kind === "soldout";
  const n = soldOut ? data.batch : 1;
  // The last batch gone means every ticket is: no next batch, nothing to
  // register for.
  const allGone = soldOut && n === BATCHES;
  return {
    t,
    soldOut,
    allGone,
    n,
    title: soldOut ? t("soldout_title", { n }) : t("open_title"),
    sub: allGone ? t("all_gone") : soldOut ? t("soldout_sub") : t("open_sub"),
  };
};

/**
 * Telefon: a lock screen, after the Figma story. Two notifications slide in
 * from the top one after the other, the way iOS lands them.
 */
function Phone({ t, format, data, unit, top, bottom }: LayoutProps) {
  const copy = useCopy(data);
  const width = 640 * unit;
  const notifications = copy.soldOut
    ? [
        copy.t("notif_soldout_1", { n: copy.n }),
        copy.allGone ? copy.t("all_gone") : copy.t("notif_soldout_2"),
      ]
    : [copy.t("notif_open_1"), copy.t("notif_open_2")];

  return (
    <div
      className="absolute left-1/2 overflow-hidden"
      style={{
        top,
        // Cut off at the bottom margin; a story keeps its sticker band free.
        bottom: format.id === "story" ? bottom : 0,
        width,
        transform: "translateX(-50%)",
      }}
    >
      {/* The phone, cut off by the bottom of the post. */}
      <div
        className="absolute inset-x-0 top-0 rounded-t-[64px] border-[10px] border-b-0 border-[#1d1414] bg-gradient-to-b from-[#3a0b0b] to-[#120404]"
        style={{ height: format.height }}
      >
        <div className="mx-auto mt-[22px] h-[30px] w-[150px] rounded-full bg-black" />
        <p
          className="mt-[44px] text-center font-semibold leading-none tracking-[-0.02em]"
          style={{ fontSize: 150 * unit }}
        >
          09:41
        </p>
        <div className="mt-[48px] flex flex-col gap-[14px] px-[22px]">
          {notifications.map((text, index) => {
            const p = ease.outBack(beat(t, 0.5 + index * 0.6, 0.55));
            return (
              <div
                key={index}
                className="flex items-start gap-[18px] rounded-[30px] bg-[rgba(245,240,240,0.88)] p-[22px] text-[#111]"
                style={{
                  opacity: p > 0 ? Math.min(1, p * 2) : 0,
                  transform: `translateY(${(1 - p) * -60}px) scale(${mix(0.92, 1, p)})`,
                }}
              >
                <span className="flex h-[64px] w-[64px] shrink-0 items-center justify-center rounded-[16px] bg-[#0c0303]">
                  <img
                    src="/assets/hackathon26/social/duck.svg"
                    alt=""
                    className="w-[48px] [image-rendering:pixelated]"
                  />
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-[4px]">
                  <span className="flex justify-between text-[22px] uppercase tracking-[0.04em] text-[#666]">
                    <span>{copy.t("notif_app")}</span>
                    <span className="normal-case">
                      {index === 0
                        ? copy.t("notif_earlier")
                        : copy.t("notif_now")}
                    </span>
                  </span>
                  <span className="text-[30px] font-bold leading-tight">
                    {text}
                  </span>
                  <span className="text-[26px] leading-tight text-[#444]">
                    {URL}
                  </span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/** A pixel badge: "i" for news, "!" for a sold-out batch. */
function Badge({ mark, size }: { mark: string; size: number }) {
  return (
    <span
      className="flex shrink-0 items-center justify-center bg-red font-extrabold text-[#0c0303]"
      style={{ width: size, height: size, fontSize: size * 0.7 }}
    >
      {mark}
    </span>
  );
}

/**
 * Okno: a dialog box from the hackathon desktop. The pointer glides in and
 * clicks its main button.
 */
function Dialog({ t, data, unit: base, top, bottom }: LayoutProps) {
  const copy = useCopy(data);
  // The dialog is the whole post here, so it is drawn larger and runs from
  // under the header to the bottom margin.
  const unit = base * 1.4;
  const glide = ease.inOutCubic(beat(t, 1.4, 0.9));
  const pressed = t > 2.35 && t < 2.55;

  return (
    <div className="absolute inset-x-[52px] flex" style={{ top, bottom }}>
      <div
        className={clsx(
          "flex w-full flex-col bg-[#0C0303] shadow-[12px_12px_0_rgba(0,0,0,0.6)]",
          raised,
        )}
      >
        <div className="m-[3px] flex h-[52px] items-center justify-between bg-[#0C0303] px-[10px] ring-2 ring-[#bdbdbd]">
          <span className="text-[26px] font-bold uppercase">/ prijave.exe</span>
          <span className="flex gap-[6px]">
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
            "m-[3px] mt-0 flex flex-1 flex-col justify-between",
            sunken,
          )}
          style={{ padding: 56 * unit, gap: 48 * unit }}
        >
          <div className="flex items-start" style={{ gap: 36 * unit }}>
            <Badge mark={copy.soldOut ? "!" : "i"} size={96 * unit} />
            <div className="flex flex-col" style={{ gap: 16 * unit }}>
              <p
                className="font-extrabold leading-[1.02] tracking-[-0.02em]"
                style={{ fontSize: 64 * unit }}
              >
                {copy.title}
              </p>
              <p
                className={clsx(plexMono.className, "leading-snug")}
                style={{ fontSize: 28 * unit, color: GRAY }}
              >
                {copy.sub} {URL}
              </p>
            </div>
          </div>
          <div className="flex justify-end" style={{ gap: 20 * unit }}>
            {!copy.soldOut && (
              <span
                className={clsx(
                  plexMono.className,
                  "flex items-center bg-[#bdbdbd] px-[28px] uppercase tracking-[0.06em] text-black",
                  raised,
                )}
                style={{ fontSize: 26 * unit, padding: `0 ${30 * unit}px` }}
              >
                {copy.t("cancel")}
              </span>
            )}
            <div className="relative">
              <div style={{ transform: `translateY(${pressed ? 4 : 0}px)` }}>
                <NotchButton
                  size="sm"
                  style={{
                    fontSize: 26 * unit,
                    padding: `${14 * unit}px ${30 * unit}px`,
                    filter: pressed ? "brightness(0.85)" : undefined,
                  }}
                >
                  {copy.soldOut ? copy.t("ok") : copy.t("apply")}
                </NotchButton>
              </div>
              {t > 1.4 && (
                <div
                  className="absolute"
                  style={{
                    left: `calc(100% - ${mix(-300, 40, glide)}px)`,
                    top: mix(420, 30, glide),
                  }}
                >
                  <Pointer pressed={pressed} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Vstopnica: a ticket with its stub, under the title. A sold-out batch gets
 * a "sold out" stamp, slammed on in hard steps.
 */
function Ticket({ t, data, unit, top, bottom }: LayoutProps) {
  const copy = useCopy(data);
  const tHero = useTranslations("Hackathon.hero");
  // The ticket prints out left to right in hard steps, like a ticket
  // machine, then a light sweep runs across it; a sold-out one is stamped.
  const print = steps(beat(t, 0.3, 1.0), 12);
  const shine = beat(t, 1.45, 0.7);
  const stamp = beat(t, 1.5, 0.3);
  const height = 380 * unit;
  // Half-circle bites out of both edges at the tear line.
  const notch: CSSProperties = {
    WebkitMaskImage: `radial-gradient(circle at 0 50%, transparent ${28 * unit}px, #000 ${29 * unit}px), radial-gradient(circle at 100% 50%, transparent ${28 * unit}px, #000 ${29 * unit}px)`,
    WebkitMaskComposite: "source-in",
    maskImage: `radial-gradient(circle at 0 50%, transparent ${28 * unit}px, #000 ${29 * unit}px), radial-gradient(circle at 100% 50%, transparent ${28 * unit}px, #000 ${29 * unit}px)`,
    maskComposite: "intersect",
  };

  return (
    <div
      className="absolute inset-x-[52px] flex flex-col items-center justify-center text-center"
      style={{ top, bottom, gap: 56 * unit }}
    >
      <p
        className={clsx(
          instrumentSerif.className,
          "leading-[0.95] tracking-[-0.02em]",
        )}
        style={{ fontSize: 110 * unit }}
      >
        {copy.title}
      </p>
      <div
        className="relative w-full"
        style={{ clipPath: `inset(-40% ${(1 - print) * 100}% -40% 0)` }}
      >
        <div
          className="relative flex w-full overflow-hidden bg-red text-[#0c0303]"
          style={{
            height,
            opacity: copy.soldOut && stamp >= 1 ? 0.55 : 1,
            ...notch,
          }}
        >
          <div
            className="flex flex-1 flex-col items-start justify-between text-left"
            style={{ padding: `${40 * unit}px ${64 * unit}px` }}
          >
            <span
              className={clsx(plexMono.className, "uppercase tracking-[0.2em]")}
              style={{ fontSize: 24 * unit }}
            >
              {copy.t("ticket")} · {copy.t("batch", { n: copy.n })}
            </span>
            <span
              className={clsx(instrumentSerif.className, "leading-[0.9]")}
              style={{ fontSize: 96 * unit }}
            >
              {tHero("title_line1")}
              <br />
              {tHero("title_line2")}
            </span>
            <span
              className={clsx(plexMono.className, "tracking-[0.06em]")}
              style={{ fontSize: 26 * unit }}
            >
              {tHero("date")} · {URL}
            </span>
          </div>
          {shine > 0 && shine < 1 && (
            <span
              aria-hidden
              className="pointer-events-none absolute -inset-y-1/2 w-1/4"
              style={{
                left: `${mix(-30, 120, ease.inOutCubic(shine))}%`,
                transform: "rotate(18deg)",
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)",
              }}
            />
          )}
          {/* The stub, behind a perforated line. */}
          <div
            className="flex shrink-0 items-center justify-center border-l-[4px] border-dashed border-[#0c0303]"
            style={{ width: 170 * unit }}
          >
            <span
              className={clsx(
                plexMono.className,
                "whitespace-nowrap uppercase tracking-[0.2em]",
              )}
              style={{ fontSize: 24 * unit, transform: "rotate(-90deg)" }}
            >
              {copy.t("admit")}
            </span>
          </div>
        </div>
        {copy.soldOut && stamp > 0 && (
          <div
            className={clsx(
              plexMono.className,
              "absolute left-1/2 top-1/2 whitespace-nowrap border-[8px] border-[#fafafa] font-semibold uppercase tracking-[0.12em] text-[#fafafa]",
            )}
            style={{
              fontSize: 72 * unit,
              padding: `${12 * unit}px ${36 * unit}px`,
              transform: `translate(-50%, -50%) rotate(-12deg) scale(${mix(1.6, 1, steps(stamp, 3))})`,
              background: "rgba(12,3,3,0.75)",
            }}
          >
            {copy.t("stamp")}
          </div>
        )}
      </div>
      {!copy.soldOut && <Link unit={unit} />}
    </div>
  );
}

/** The site's address, outlined in red: the call to action, unshouted. */
function Link({ unit }: { unit: number }) {
  return (
    <span
      className={clsx(
        plexMono.className,
        "border-2 border-red px-[0.9em] py-[0.45em] tracking-[0.06em] text-red",
      )}
      style={{ fontSize: 30 * unit }}
    >
      {URL}
    </span>
  );
}

/** The site's loading bar: chunky red blocks in a sunken track. */
function Bar({ fill, unit }: { fill: number; unit: number }) {
  const blocks = 16;
  return (
    <div
      className={clsx("flex w-full bg-[#0C0303]", sunken)}
      style={{ gap: 4 * unit, padding: 5 * unit }}
    >
      {Array.from({ length: blocks }, (_, index) => (
        <span
          key={index}
          className="flex-1"
          style={{
            height: 34 * unit,
            background: index < Math.round(fill * blocks) ? RED : "transparent",
          }}
        />
      ))}
    </div>
  );
}

/**
 * Napredek: one progress bar per batch, in the site's loading style. Sold-out
 * batches are full; the open one fills block by block to where it stands.
 */
function Progress({ t, format, data, unit: base, top, bottom }: LayoutProps) {
  const copy = useCopy(data);
  // A story says it with the bars alone, drawn larger, and "Prijava".
  const story = format.id === "story";
  const unit = story ? base * 1.35 : base;
  const soldUpTo = copy.soldOut ? copy.n : 0;
  const filling = beat(t, 0.4, 1.6);

  return (
    <div
      className="absolute inset-x-[52px] flex flex-col justify-center"
      style={{ top, bottom, gap: 48 * unit }}
    >
      {!story && (
        <div className="flex flex-col" style={{ gap: 12 * unit }}>
          <p
            className={clsx(
              instrumentSerif.className,
              "leading-[0.95] tracking-[-0.02em]",
            )}
            style={{ fontSize: 110 * unit }}
          >
            {copy.title}
          </p>
          <p
            className={clsx(plexMono.className)}
            style={{ fontSize: 28 * unit, color: GRAY }}
          >
            {copy.sub}
          </p>
        </div>
      )}
      <div className="flex flex-col" style={{ gap: 30 * unit }}>
        {Array.from({ length: BATCHES }, (_, index) => {
          const batch = index + 1;
          const sold = batch <= soldUpTo;
          const open = batch === soldUpTo + 1;
          // The open batch shows as about half gone.
          const fill = sold ? 1 : open ? 0.55 * steps(filling, 9) : 0;
          return (
            <div
              key={batch}
              className="flex flex-col"
              style={{ gap: 10 * unit }}
            >
              <div
                className={clsx(
                  plexMono.className,
                  "flex items-center justify-between uppercase tracking-[0.12em]",
                )}
                style={{ fontSize: 26 * unit }}
              >
                <span>{copy.t("batch", { n: batch })}</span>
                <span
                  className="px-[10px] py-[2px] font-semibold"
                  style={{
                    background: sold ? RED : open ? "#fafafa" : "transparent",
                    color: sold || open ? INK : "#9d9d9d",
                  }}
                >
                  {sold
                    ? copy.t("soldout_short")
                    : open
                      ? copy.t("open_tag")
                      : copy.t("soon_tag")}
                </span>
              </div>
              <Bar fill={fill} unit={unit} />
            </div>
          );
        })}
      </div>
      {!copy.allGone && !story && (
        <div className="flex">
          <Link unit={unit} />
        </div>
      )}
    </div>
  );
}

const LAYOUTS: Record<
  RegistrationVariant,
  (props: LayoutProps) => JSX.Element
> = {
  phone: Phone,
  dialog: Dialog,
  ticket: Ticket,
  progress: Progress,
};

const unitFor = (format: Format) =>
  isCompact(format) ? 0.78 : format.height > 1600 ? 1.12 : 1;

export function RegistrationPostView({
  t,
  format,
  data,
  variant,
}: PostProps<Registration> & { variant: RegistrationVariant }) {
  const tPosts = useTranslations("Posts.registration");
  const compact = isCompact(format);
  const story = format.id === "story";
  const Layout = LAYOUTS[variant];
  return (
    <PostFrame t={t} format={format}>
      <Header t={t} format={format} align="center" still />
      <Layout
        t={t}
        format={format}
        data={data}
        unit={unitFor(format)}
        top={compact ? 330 : 420}
        // A story keeps a band free at the bottom for Instagram's link
        // sticker, pointing to the application on Luma.
        bottom={story ? STICKER_BAND + 88 : compact ? 64 : 88}
      />
      {story && (
        <p
          className={clsx(
            plexMono.className,
            "absolute inset-x-0 text-center uppercase tracking-[0.2em] text-red",
          )}
          style={{ bottom: STICKER_BAND + 20, fontSize: 30 }}
        >
          {tPosts("link_hint")} ↓
        </p>
      )}
    </PostFrame>
  );
}
