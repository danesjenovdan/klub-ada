/**
 * The sizes a post can be exported in. Every post is laid out 1080px wide, as
 * in the Figma `mkt` file; `exportScale` stretches the export when a network
 * wants more pixels (LinkedIn recommends 1200×1200 for a square).
 */
export type Format = {
  id: "instagram" | "story" | "linkedin";
  label: string;
  width: number;
  height: number;
  exportScale: number;
};

export const FORMATS: Format[] = [
  {
    id: "instagram",
    label: "4:5",
    width: 1080,
    height: 1350,
    exportScale: 1,
  },
  {
    id: "story",
    label: "Story · 9:16",
    width: 1080,
    height: 1920,
    exportScale: 1,
  },
  {
    id: "linkedin",
    label: "1:1",
    width: 1080,
    height: 1080,
    exportScale: 1200 / 1080,
  },
];

/** Frame rate of exported videos. */
export const FPS = 30;
