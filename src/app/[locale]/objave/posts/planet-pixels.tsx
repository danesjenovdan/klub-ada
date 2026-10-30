"use client";

import { useEffect, useMemo, useRef } from "react";
import { PLANET_ART } from "@/src/app/hack/[locale]/sponsors/planet-art";
import { Tier } from "@/src/app/hack/[locale]/sponsors/model";
import { hash } from "../motion";

const RING_COLOR = "#fafafa";

type Particle = { x: number; y: number; dx: number; dy: number; color: string };

/**
 * The site's `PixelBurst` on the post clock: a planet's own pixels, flung out
 * from its centre (`burst`) or flying in to make it (`assemble`, the same
 * flight run backwards). Outer pixels travel furthest, everything snaps to the
 * planet's grid, and the pixels shrink in two steps as they cool, so the
 * debris stays as blocky as the planet. Spread is seeded, not random, so every
 * frame of an export agrees.
 */
export function PlanetPixels({
  tier,
  width,
  height,
  left,
  top,
  size,
  progress,
  mode,
}: {
  tier: Tier;
  /** The canvas covers the whole post. */
  width: number;
  height: number;
  /** Where the planet sits, in post pixels. */
  left: number;
  top: number;
  size: number;
  /** 0..1 through the flight. */
  progress: number;
  mode: "burst" | "assemble";
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const art = PLANET_ART[tier];
  const cell = size / art.size;

  const particles = useMemo(() => {
    const centreX = left + size / 2;
    const centreY = top + size / 2;
    // Far enough for the fastest pixels to leave through the frame's edges.
    const reach = Math.hypot(width, height) * 0.6;
    const list: Particle[] = [];
    art.rows.forEach((row, gy) => {
      Array.from(row).forEach((ch, gx) => {
        if (ch === ".") return;
        const x = left + gx * cell;
        const y = top + gy * cell;
        const offX = x + cell / 2 - centreX;
        const offY = y + cell / 2 - centreY;
        const distance = Math.hypot(offX, offY) / (size / 2);
        const seed = gy * art.size + gx;
        let angle = Math.atan2(offY, offX);
        if (distance === 0) angle = hash(seed) * Math.PI * 2;
        angle += (hash(seed * 3.1) - 0.5) * 0.5;
        const speed = (0.35 + distance * 0.9 + hash(seed * 7.7) * 0.4) * reach;
        list.push({
          x,
          y,
          dx: Math.cos(angle) * speed,
          dy: Math.sin(angle) * speed,
          color: ch === "#" ? RING_COLOR : art.palette[Number.parseInt(ch, 10)],
        });
      });
    });
    return list;
  }, [art, cell, height, left, size, top, width]);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);
    if (progress <= 0 && mode === "burst") return;
    if (progress >= 1 && mode === "assemble") return;

    // The burst's time, whichever way it runs.
    const p = mode === "burst" ? progress : 1 - progress;
    // A hard fling that coasts: most of the travel happens up front.
    const flight = 1 - Math.pow(1 - p, 3);
    const alpha = p < 0.5 ? 1 : 1 - (p - 0.5) / 0.5;
    const pixel = p < 0.6 ? cell : Math.max(2, Math.round(cell / 2));

    ctx.globalAlpha = alpha;
    for (const particle of particles) {
      const x = Math.round((particle.x + particle.dx * flight) / cell) * cell;
      const y = Math.round((particle.y + particle.dy * flight) / cell) * cell;
      ctx.fillStyle = particle.color;
      ctx.fillRect(x, y, pixel, pixel);
    }
    ctx.globalAlpha = 1;
  }, [cell, height, mode, particles, progress, width]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      aria-hidden
      className="pointer-events-none absolute left-0 top-0"
      style={{ width, height }}
    />
  );
}
