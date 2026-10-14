"use client";

import { CSSProperties, ReactNode } from "react";
import clsx from "clsx";
import { IconMinus, IconSquare, IconX } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { instrumentSerif, lilex, plexMono } from "@/src/app/fonts";
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
import { LockupPost } from "./save-the-date";

/*
 * Registration posts: "registration is open", then one for every batch that
 * sells out. Five layouts to choose from, each with one movement at most, all
 * pointing people to the site.
 */

export type Registration = (
  | { kind: "open" }
  | { kind: "soldout"; batch: number }
) & {
  /** Changes made on the page to the phone layout's lock screen. */
  phone?: PhoneScreen;
};

/** What the lock screen shows. An emptied notification is left off. */
export type PhoneScreen = {
  clock?: string;
  first?: string;
  firstTime?: string;
  second?: string;
  secondTime?: string;
  detail?: string;
};

export type RegistrationVariant =
  | "phone"
  | "dialog"
  | "ticket"
  | "progress"
  | "lockup";

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
  { id: "lockup", label: "Logotip", duration: 6, still: 5 },
];

export const BATCHES = 3;

/** The empty band a story keeps at the bottom for the link sticker. */
const STICKER_BAND = 360;
/**
 * The phone story turns that around: the hint and the sticker's spot sit at
 * the top, under the header, and the phone rises from the bottom edge.
 */
const HINT_TOP = 340;
const STICKER_SLOT = 300;
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

/** The lock screen as drawn: the page's changes over the default copy. */
export function usePhoneScreen(data: Registration): Required<PhoneScreen> {
  const { t, soldOut, allGone, n } = useCopy(data);
  return {
    clock: "09:41",
    first: soldOut ? t("notif_soldout_1", { n }) : t("notif_open_1"),
    firstTime: t("notif_earlier"),
    second: allGone
      ? t("all_gone")
      : soldOut
        ? t("notif_soldout_2")
        : t("notif_open_2"),
    secondTime: t("notif_now"),
    detail: URL,
    ...data.phone,
  };
}

/**
 * Telefon: a lock screen, after the Figma story. Two notifications slide in
 * from the top one after the other, the way iOS lands them.
 */
function Phone({ t, format, data, unit, top }: LayoutProps) {
  const copy = useCopy(data);
  const width = 640 * unit;
  const screen = usePhoneScreen(data);
  const notifications = [
    { text: screen.first, time: screen.firstTime },
    { text: screen.second, time: screen.secondTime },
  ].filter((notification) => notification.text);

  return (
    <div
      className="absolute left-1/2 overflow-hidden"
      style={{
        top,
        // Cut off by the bottom of the post.
        bottom: 0,
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
          {screen.clock}
        </p>
        <div className="mt-[48px] flex flex-col gap-[14px] px-[22px]">
          {notifications.map(({ text, time }, index) => {
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
                    <span className="normal-case">{time}</span>
                  </span>
                  <span className="text-[30px] font-bold leading-tight">
                    {text}
                  </span>
                  {screen.detail && (
                    <span className="text-[26px] leading-tight text-[#444]">
                      {screen.detail}
                    </span>
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/** When the pointer glides in, and when it clicks. */
const GLIDE_START = 1.4;
const GLIDE = 0.9;
const PRESS: [number, number] = [2.35, 2.55];

/**
 * A button the pointer glides in to and clicks: it eases in from below right,
 * settles on the button's trailing padding so the label stays readable, and
 * the button dips while it is pressed.
 */
export function Clickable({
  t,
  unit,
  leaves,
  children,
}: {
  t: number;
  unit: number;
  /** Glide back out after the click, for when it would cover what's below. */
  leaves?: boolean;
  children: (pressed: boolean) => ReactNode;
}) {
  const glide =
    ease.inOutCubic(beat(t, GLIDE_START, GLIDE)) -
    (leaves ? ease.inOutCubic(beat(t, PRESS[1] + 0.4, GLIDE)) : 0);
  const pressed = t > PRESS[0] && t < PRESS[1];
  return (
    <div className="relative">
      <div style={{ transform: `translateY(${pressed ? 4 : 0}px)` }}>
        {children(pressed)}
      </div>
      {t > GLIDE_START && glide > 0 && (
        <div
          className="absolute"
          style={{
            left: `calc(100% - ${mix(-300, 26 * unit, glide)}px)`,
            top: mix(420, 34 * unit, glide),
          }}
        >
          <Pointer pressed={pressed} />
        </div>
      )}
    </div>
  );
}

/**
 * Okno: a dialog box from the hackathon desktop. The pointer glides in and
 * clicks its main button.
 */
function Dialog({ t, data, unit: base, top, bottom }: LayoutProps) {
  const copy = useCopy(data);
  // The dialog is the whole post here, so it is drawn larger, sized to its
  // content and centred in the space under the header.
  const unit = base * 1.4;

  return (
    <div
      className="absolute inset-x-[52px] flex items-center"
      style={{ top, bottom }}
    >
      <div
        className={clsx(
          "flex w-full flex-col bg-[#0C0303] shadow-[12px_12px_0_rgba(0,0,0,0.6)]",
          raised,
        )}
      >
        <div className="m-[3px] flex h-[52px] items-center justify-between bg-[#0C0303] px-[10px] ring-2 ring-[#bdbdbd]">
          <span
            className={clsx(lilex.className, "text-[26px] font-bold uppercase")}
          >
            / prijave.exe
          </span>
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
          className={clsx("m-[3px] mt-0 flex flex-col", sunken)}
          style={{ padding: 56 * unit, gap: 48 * unit }}
        >
          {/* The words lead on the left, the rocket closes the row on the
              right; the action row spans both, so the URL shares the text's
              edge and the button the rocket's. */}
          <div
            className="grid items-start"
            style={{
              gridTemplateColumns: `minmax(0, 1fr) ${120 * unit}px`,
              columnGap: 40 * unit,
              rowGap: 52 * unit,
            }}
          >
            <div className="flex flex-col" style={{ gap: 18 * unit }}>
              <p
                className={clsx(
                  lilex.className,
                  "font-extrabold leading-[1.02] tracking-[-0.02em] [text-wrap:balance]",
                )}
                style={{ fontSize: 64 * base }}
              >
                {copy.title}!
              </p>
              <p
                className={clsx(
                  lilex.className,
                  "leading-snug [text-wrap:pretty]",
                )}
                style={{ fontSize: 40 * base, color: GRAY }}
              >
                {copy.sub}
              </p>
            </div>
            <img
              src="/assets/hackathon26/social/rocket.svg"
              alt=""
              className="col-start-2 row-start-1 h-auto w-full [image-rendering:pixelated]"
            />
            {/* The address goes with the action it leads to; the row wraps
                rather than squeezing either. */}
            <div
              className="col-span-2 flex flex-wrap items-center justify-between"
              style={{ gap: 24 * unit }}
            >
              <span
                className={clsx(
                  lilex.className,
                  "whitespace-nowrap tracking-[0.02em] text-red",
                )}
                style={{ fontSize: 28 * base }}
              >
                {URL}
              </span>
              <Clickable t={t} unit={unit}>
                {(pressed) => (
                  <NotchButton
                    size="sm"
                    font={lilex.className}
                    style={{
                      fontSize: 26 * unit,
                      padding: `${14 * unit}px ${30 * unit}px`,
                      filter: pressed ? "brightness(0.85)" : undefined,
                    }}
                  >
                    {copy.soldOut ? copy.t("ok") : copy.t("apply")}
                  </NotchButton>
                )}
              </Clickable>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** How finely the ticket is sliced to bend it round the roll, and the roll's size. */
const ROLL_STRIPS = 64;
const ROLL_RADIUS = 46;
/** Each turn of paper sits this much inside the last, so the layers stack. */
const ROLL_LAYER = 5;
const ROLL_PERSPECTIVE = 1400;
/**
 * The roll travels down and to the right at this angle, so its edge crosses
 * the ticket diagonally; about the slope of the ticket's own diagonal.
 */
const ROLL_TILT = (20 * Math.PI) / 180;

/**
 * Where a slice of the ticket is while it unrolls: flat behind the roll's
 * contact point `front`, wound round the roll beyond it. `s` is how far along
 * the paper the slice is from the contact point; the angle round the roll is
 * that over the radius, and the radius shrinks a little each turn.
 */
function rollSlice(x: number, front: number, unit: number) {
  const s = x - front;
  if (s <= 0) return { x, z: 0, angle: 0 };
  const r0 = ROLL_RADIUS * unit;
  const layer = ROLL_LAYER * unit;
  // Arc length to angle on a slowly tightening spiral.
  const angle = s / r0;
  const r = Math.max(layer, r0 - (layer * angle) / (2 * Math.PI));
  return {
    x: front + r * Math.sin(angle),
    z: r * (1 - Math.cos(angle)),
    angle,
  };
}

/** The face of the ticket, at full width; the roll slices it into strips. */
function TicketFace({
  copy,
  unit,
  height,
}: {
  copy: ReturnType<typeof useCopy>;
  unit: number;
  height: number;
}) {
  const tHero = useTranslations("Hackathon.hero");
  // Half-circle bites out of both edges at the tear line.
  const bite = (side: string) =>
    `radial-gradient(circle at ${side} 50%, transparent ${28 * unit}px, #000 ${29 * unit}px)`;
  const notch: CSSProperties = {
    WebkitMaskImage: `${bite("0")}, ${bite("100%")}`,
    WebkitMaskComposite: "source-in",
    maskImage: `${bite("0")}, ${bite("100%")}`,
    maskComposite: "intersect",
  };
  return (
    <div
      className="relative flex w-full overflow-hidden bg-red text-[#0c0303]"
      style={{ height, ...notch }}
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
  );
}

/**
 * Vstopnica: a ticket with its stub, under the title. It arrives rolled up
 * at its top-left corner and unrolls diagonally across the post, towards the
 * bottom right, like a strip off a ticket roll,
 * then lies flat with a little thickness and a shadow under it. A sold-out
 * batch gets a "sold out" stamp, slammed on in hard steps.
 */
function Ticket({ t, format, data, unit, top, bottom }: LayoutProps) {
  const copy = useCopy(data);
  const unroll = ease.inOutCubic(beat(t, 0.3, 1.1));
  const shine = beat(t, 1.45, 0.7);
  const stamp = beat(t, 1.5, 0.3);
  const height = 380 * unit;
  // The ticket spans the post between its side margins.
  const width = format.width - 104;
  // The roll works in its own frame, turned by the tilt: `u` along the way
  // it travels, `v` along its axis. The ticket spans `u` from 0 to `span`
  // and `v` from `-rise` to `depth - rise`.
  const sin = Math.sin(ROLL_TILT);
  const cos = Math.cos(ROLL_TILT);
  const span = width * cos + height * sin;
  const depth = width * sin + height * cos;
  const rise = width * sin;
  // The roll's contact line, from the top-left corner to past the
  // bottom-right one so the last turn lies down too.
  const front = mix(0, span, unroll);
  const rolling = unroll < 1;
  // Paper thickness and the shadow it casts, following the notches.
  const solid = `drop-shadow(0 ${6 * unit}px 0 #8f2f2f) drop-shadow(0 ${26 * unit}px ${22 * unit}px rgba(0,0,0,0.55))`;

  const strip = span / ROLL_STRIPS;
  const slices = rolling
    ? Array.from({ length: ROLL_STRIPS }, (_, index) => {
        const left = index * strip;
        const place = rollSlice(left, front, unit);
        // Facing the viewer while the paper's normal points out of the post.
        const facing = Math.cos(place.angle);
        return { index, left, ...place, facing };
      })
        // Nearer slices paint over farther ones.
        .sort((a, b) => a.z - b.z)
    : [];

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
      <div className="relative w-full" style={{ height }}>
        {rolling ? (
          <div className="absolute inset-0" style={{ filter: solid }}>
            {/* Turned into the roll's frame; the slices run across it. */}
            <div
              className="absolute left-0 top-0"
              style={{
                transform: `rotate(${ROLL_TILT}rad)`,
                transformOrigin: "0 0",
              }}
            >
              {slices.map(({ index, left, x, z, angle, facing }) => (
                <div
                  key={index}
                  className="absolute overflow-hidden"
                  style={{
                    left,
                    top: -rise,
                    // A hair wider so no seam shows between slices.
                    width: strip + 1,
                    height: depth,
                    // Light from the front: the roll darkens as it turns away.
                    filter: `brightness(${1 - 0.55 * (1 - Math.abs(facing)) ** 0.8})`,
                    // Each slice is projected on its own (no preserve-3d,
                    // which the exporter flattens), so the origin sits at the
                    // ticket's centre to share one vanishing point. The slice
                    // still turns about its own left edge: the shift by
                    // `-origin` before the rotation moves the pivot back there.
                    transformOrigin: `${span / 2 - left}px 50%`,
                    transform: `perspective(${ROLL_PERSPECTIVE}px) translate3d(${x - left}px, 0, ${z}px) translateX(${-(span / 2 - left)}px) rotateY(${-angle}rad) translateX(${span / 2 - left}px)`,
                  }}
                >
                  {/* The ticket, turned back level, at its place in the post. */}
                  <div
                    className="absolute"
                    style={{
                      left: -left,
                      top: rise,
                      width,
                      transform: `rotate(${-ROLL_TILT}rad)`,
                      transformOrigin: "0 0",
                    }}
                  >
                    {facing >= 0 ? (
                      <TicketFace copy={copy} unit={unit} height={height} />
                    ) : (
                      // The back of the paper: plain, a shade darker.
                      <div className="bg-[#c94c4c]" style={{ height }} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div
            className="relative"
            style={{
              filter: solid,
              opacity: copy.soldOut && stamp >= 1 ? 0.55 : 1,
            }}
          >
            <TicketFace copy={copy} unit={unit} height={height} />
            {shine > 0 && shine < 1 && (
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 overflow-hidden"
              >
                <span
                  className="absolute -inset-y-1/2 w-1/4"
                  style={{
                    left: `${mix(-30, 120, ease.inOutCubic(shine))}%`,
                    transform: "rotate(18deg)",
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)",
                  }}
                />
              </div>
            )}
          </div>
        )}
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

/**
 * Logotip: the save-the-date lockup, with the news in its button. A sold-out
 * batch says so in the button and says what's next under it.
 */
function Lockup({ t, format, data }: PostProps<Registration>) {
  const copy = useCopy(data);
  const story = format.id === "story";
  return (
    <LockupPost
      t={t}
      format={format}
      overlay={
        // A story keeps the bottom free for the link sticker, as the others.
        story && (
          <p
            className={clsx(
              plexMono.className,
              "absolute inset-x-0 text-center uppercase tracking-[0.2em] text-red",
            )}
            style={{ bottom: STICKER_BAND + 20, fontSize: 30 }}
          >
            {copy.t("link_hint")} ↓
          </p>
        )
      }
    >
      <Clickable t={t} unit={1} leaves>
        {(pressed) => (
          <NotchButton
            size="sm"
            style={{ filter: pressed ? "brightness(0.85)" : undefined }}
          >
            {copy.title}!
          </NotchButton>
        )}
      </Clickable>
      {/* Just the address under the button, on every post. */}
      <p
        className={clsx(plexMono.className, "tracking-[0.04em] text-red")}
        style={{ fontSize: 26 }}
      >
        {URL}
      </p>
    </LockupPost>
  );
}

const LAYOUTS: Record<
  Exclude<RegistrationVariant, "lockup">,
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
  if (variant === "lockup") return <Lockup t={t} format={format} data={data} />;
  const Layout = LAYOUTS[variant];
  const hintOnTop = story && variant === "phone";
  return (
    <PostFrame t={t} format={format}>
      <Header t={t} format={format} align="center" still />
      <Layout
        t={t}
        format={format}
        data={data}
        unit={unitFor(format)}
        top={hintOnTop ? HINT_TOP + STICKER_SLOT : compact ? 330 : 420}
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
          style={{
            ...(hintOnTop ? { top: HINT_TOP } : { bottom: STICKER_BAND + 20 }),
            fontSize: 30,
          }}
        >
          {tPosts("link_hint")} ↓
        </p>
      )}
    </PostFrame>
  );
}
