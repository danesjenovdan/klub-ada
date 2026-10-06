import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export type Tier = "gold" | "silver" | "bronze" | "vibe" | "partner";

export type Sponsor = {
  name: string;
  type: Tier;
  link: string;
  image: SanityImageSource;
  dimensions: { width: number; height: number };
};

/**
 * One sponsor tier as a planet in the night sky of the overview. Positions and
 * sizes are fractions of the 1254x617 window body the design was drawn on, so
 * the sky keeps its arrangement at any window size.
 */
export type Planet = {
  tier: Tier;
  labelKey: string;
  /** Brand color of the tier: the glow, the label halo and the card borders. */
  color: string;
  x: number;
  y: number;
  size: number;
};

export const PLANETS: Planet[] = [
  { tier: "gold", labelKey: "gold", color: "#fbb040", x: 57, y: 78, size: 175 },
  {
    tier: "partner",
    labelKey: "media",
    color: "#8686c2",
    x: 704,
    y: 41,
    size: 105,
  },
  {
    tier: "vibe",
    labelKey: "vibe",
    color: "#ff85a5",
    x: 965,
    y: 166,
    size: 140,
  },
  {
    tier: "silver",
    labelKey: "silver",
    color: "#77a4d4",
    x: 250,
    y: 384,
    size: 161,
  },
  {
    tier: "bronze",
    labelKey: "bronze",
    color: "#ff5757",
    x: 774,
    y: 412,
    size: 147,
  },
];

export const SKY_WIDTH = 1254;
export const SKY_HEIGHT = 617;

export const pct = (value: number, total: number) =>
  `${(value / total) * 100}%`;

/**
 * Pixel title treatment shared by the sky and the tier views: the letters are
 * filled with a light tint, hugged by a one-cell ring in the window's dark
 * background, with a translucent white ring outside that. The cell `--s`
 * scales with the type; the fill is set by the caller.
 */
export const pixelTitle =
  "uppercase leading-none [--s:0.08em] [--gap:#0c0303] [--ring:rgba(255,255,255,0.7)] [text-shadow:var(--s)_0_0_var(--gap),calc(-1*var(--s))_0_0_var(--gap),0_var(--s)_0_var(--gap),0_calc(-1*var(--s))_0_var(--gap),var(--s)_var(--s)_0_var(--gap),calc(-1*var(--s))_var(--s)_0_var(--gap),var(--s)_calc(-1*var(--s))_0_var(--gap),calc(-1*var(--s))_calc(-1*var(--s))_0_var(--gap),calc(2*var(--s))_0_0_var(--ring),calc(-2*var(--s))_0_0_var(--ring),0_calc(2*var(--s))_0_var(--ring),0_calc(-2*var(--s))_0_var(--ring),calc(2*var(--s))_calc(2*var(--s))_0_var(--ring),calc(-2*var(--s))_calc(2*var(--s))_0_var(--ring),calc(2*var(--s))_calc(-2*var(--s))_0_var(--ring),calc(-2*var(--s))_calc(-2*var(--s))_0_var(--ring),calc(2*var(--s))_var(--s)_0_var(--ring),calc(-2*var(--s))_var(--s)_0_var(--ring),calc(2*var(--s))_calc(-1*var(--s))_0_var(--ring),calc(-2*var(--s))_calc(-1*var(--s))_0_var(--ring),var(--s)_calc(2*var(--s))_0_var(--ring),calc(-1*var(--s))_calc(2*var(--s))_0_var(--ring),var(--s)_calc(-2*var(--s))_0_var(--ring),calc(-1*var(--s))_calc(-2*var(--s))_0_var(--ring)]";
