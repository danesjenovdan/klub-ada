"use client";

import { CSSProperties, useEffect, useMemo, useRef } from "react";
import { PLANET_ART, PlanetArt } from "./planet-art";

/**
 * Ordered-dither threshold matrix. Sliding it across the planet one cell per
 * frame makes the dither crawl while the underlying shading stays put, which
 * reads as the surface turning under a fixed light. Its period of four cells
 * is also the length of the loop, so the animation never shows a seam.
 */
const BAYER = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

const RING_COLOR = "#fafafa";

type Prepared = {
  size: number;
  palette: string[];
  /** `true` where the white ring is. */
  ring: boolean[][];
  /**
   * Shading of each surface cell as a fractional palette index, from the
   * design's hand-dithered pixels averaged over their neighbours. `null`
   * outside the surface.
   */
  light: (number | null)[][];
};

function prepare(art: PlanetArt): Prepared {
  const { size, palette, rows } = art;
  const index = rows.map((row) =>
    Array.from(row, (ch) =>
      ch === "." || ch === "#" ? null : Number.parseInt(ch, 10),
    ),
  );
  const ring = rows.map((row) => Array.from(row, (ch) => ch === "#"));
  const light = index.map((row, y) =>
    row.map((value, x) => {
      if (value === null) return null;
      let sum = 0;
      let count = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const neighbour = index[y + dy]?.[x + dx];
          if (neighbour !== null && neighbour !== undefined) {
            sum += neighbour;
            count++;
          }
        }
      }
      return sum / count;
    }),
  );
  return { size, palette, ring, light };
}

function drawFrame(
  ctx: CanvasRenderingContext2D,
  { size, palette, ring, light }: Prepared,
  frame: number,
) {
  ctx.clearRect(0, 0, size, size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (ring[y][x]) {
        ctx.fillStyle = RING_COLOR;
        ctx.fillRect(x, y, 1, 1);
        continue;
      }
      const shade = light[y][x];
      if (shade === null) continue;
      // Move the pattern down and to the right: the lit side feeds the shadow.
      const threshold =
        BAYER[(((y - frame) % 4) + 4) % 4][(((x - frame) % 4) + 4) % 4];
      const dither = (threshold + 0.5) / 16 - 0.5;
      const tone = Math.min(
        palette.length - 1,
        Math.max(0, Math.round(shade + dither)),
      );
      ctx.fillStyle = palette[tone];
      ctx.fillRect(x, y, 1, 1);
    }
  }
}

export interface PixelPlanetProps {
  tier: keyof typeof PLANET_ART;
  className?: string;
  style?: CSSProperties;
  /**
   * Draw this step of the turning dither (any integer) instead of animating on
   * the planet's own timer, for something that keeps its own clock, like the
   * social posts.
   */
  frame?: number;
}

/**
 * A sponsor planet drawn pixel by pixel on a canvas the size of its grid and
 * scaled up without smoothing, so every cell stays a crisp square. The dither
 * drifts diagonally one cell at a time; smaller planets turn a little faster.
 * With reduced motion the planet holds its first frame.
 */
export function PixelPlanet({
  tier,
  className,
  style,
  frame: fixedFrame,
}: PixelPlanetProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prepared = useMemo(() => prepare(PLANET_ART[tier]), [tier]);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    if (fixedFrame !== undefined) {
      drawFrame(ctx, prepared, ((fixedFrame % 4) + 4) % 4);
      return;
    }

    let frame = 0;
    drawFrame(ctx, prepared, frame);

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) return;

    // Roughly 190 ms per step for the smallest planet, 240 ms for the largest.
    const stepMs = 115 + prepared.size * 5;
    const timer = window.setInterval(() => {
      frame = (frame + 1) % 4;
      drawFrame(ctx, prepared, frame);
    }, stepMs);
    return () => window.clearInterval(timer);
  }, [prepared, fixedFrame]);

  return (
    <canvas
      ref={canvasRef}
      width={prepared.size}
      height={prepared.size}
      aria-hidden
      className={className}
      style={{ imageRendering: "pixelated", ...style }}
    />
  );
}
