import { Anaheim, IBM_Plex_Mono, Instrument_Serif } from "next/font/google";

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
