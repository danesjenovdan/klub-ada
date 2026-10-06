import { Anaheim, IBM_Plex_Mono, Instrument_Serif } from "next/font/google";
import localFont from "next/font/local";

export const anaheim = Anaheim({ subsets: ["latin"] });

export const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
});

/**
 * Closest Google-hosted match for Lilex, the monospace used by the hackathon
 * design (Lilex is derived from IBM Plex Mono).
 */
export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

/**
 * Pixel display face for the hackathon's big headings: Google Fonts' build of
 * Geist Pixel (OFL), loaded locally because Next's Google font list predates
 * it. One weight, 400; the pixel shape is a variable axis, `ELSH` (0 to 100),
 * with the solid square at 0.
 */
export const geistPixel = localFont({
  src: "./fonts/geist-pixel.woff2",
  weight: "400",
  display: "swap",
  fallback: ["Geist Mono", "ui-monospace", "Menlo", "monospace"],
});
