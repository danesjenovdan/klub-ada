import clsx from "clsx";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import imageLoader from "@/src/app/utils/image-loader";
import { plexMono } from "@/src/app/fonts";

/**
 * The hackathon's playing cards, shared by the prize deck and the numbers
 * page: a #170d10 face with a 1px red frame, tracked red mono labels, pixel
 * diamonds in the corners and the crowned duck on the back.
 *
 * A card takes its width from `--card-w`, which the page sets on a container
 * so that a row of cards fits the space (see the pages for the formula), and
 * everything drawn on a card is sized in `em` against `cardFontSize`, so it
 * scales with the card.
 */

/** The felt of the table and the back of every card share one colour. */
export const felt = "bg-[#170d10]";

/** A card is 7:10, 147×210 in the design. */
export const cardSize = "w-[var(--card-w)] aspect-[7/10]";

/** 21px labels on a 220px card, and everything else in step with them. */
export const cardFontSize = "calc(var(--card-w) / 10.5)";

export const cardFace = clsx(
  "absolute inset-0 flex flex-col justify-between border border-red p-[0.65em] [backface-visibility:hidden]",
  felt,
);

/** Top and bottom edge of a card: corner art and a label on one line. */
export const cardRow = clsx(
  "flex items-center justify-between text-[1em] uppercase tracking-[0.125em] text-red",
  plexMono.className,
);

/**
 * Corner art: a Sanity icon if one is given, the design's pixel diamond
 * otherwise.
 */
export function Corner({
  icon,
  className,
}: {
  icon?: SanityImageSource;
  /** Extra classes for the diamond, e.g. a filter to recolour it. */
  className?: string;
}) {
  return icon ? (
    <img
      src={imageLoader(icon)}
      alt=""
      className="h-[2.3em] w-auto max-w-[50%] object-contain"
    />
  ) : (
    <img
      src="/assets/hackathon26/card-corner.svg"
      alt=""
      className={clsx("w-[0.57em] shrink-0", className)}
    />
  );
}

/** The back of a card: "AdaHack", the crowned duck, "2026". */
export function CardBack() {
  return (
    <div className={cardFace}>
      <div className={cardRow}>
        <Corner />
        <span>AdaHack</span>
        <Corner />
      </div>
      <img
        src="/assets/hackathon26/card-duck.svg"
        alt=""
        className="mx-auto w-1/2"
      />
      <div className={cardRow}>
        <Corner />
        <span>2026</span>
        <Corner />
      </div>
    </div>
  );
}

/**
 * The table the cards lie on: felt with a faint red rail inset around the
 * edge. Lay the cards (or their slots) out inside with flex.
 */
export const table = clsx(
  "relative flex flex-wrap content-center items-center justify-center",
  "before:pointer-events-none before:absolute before:inset-2 before:border before:border-[rgba(255,87,87,0.2)]",
  felt,
);
