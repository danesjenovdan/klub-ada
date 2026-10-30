"use client";

import { useEffect, useRef } from "react";
import { PLANET_ART } from "./planet-art";

/** How long the pixels fly, in milliseconds. */
export const BURST_DURATION = 1100;

const RING_COLOR = "#fafafa";

type Particle = {
  x: number;
  y: number;
  dx: number;
  dy: number;
  color: string;
};

/** Where the planet sat inside the sky, in CSS pixels. */
export type BurstOrigin = { left: number; top: number; size: number };

export interface PixelBurstProps {
  tier: keyof typeof PLANET_ART;
  origin: BurstOrigin;
  onDone: () => void;
}

/**
 * The clicked planet comes apart into its own pixels, which fly outward from
 * its centre across the whole window and fade as they go. Outer pixels get
 * away faster than inner ones, like a shell blown off a core. Everything is
 * drawn on one canvas, snapped to the planet's pixel grid, so the debris stays
 * as blocky as the planet it came from.
 */
export function PixelBurst({ tier, origin, onDone }: PixelBurstProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const scale = window.devicePixelRatio || 1;
    canvas.width = width * scale;
    canvas.height = height * scale;
    ctx.scale(scale, scale);

    const art = PLANET_ART[tier];
    const cell = origin.size / art.size;
    const centreX = origin.left + origin.size / 2;
    const centreY = origin.top + origin.size / 2;
    // Far enough for the fastest pixels to leave through the window edges.
    const reach = Math.hypot(width, height) * 0.6;

    const particles: Particle[] = [];
    art.rows.forEach((row, gy) => {
      Array.from(row).forEach((ch, gx) => {
        if (ch === ".") return;
        const x = origin.left + gx * cell;
        const y = origin.top + gy * cell;
        const offX = x + cell / 2 - centreX;
        const offY = y + cell / 2 - centreY;
        const distance = Math.hypot(offX, offY) / (origin.size / 2);
        let angle = Math.atan2(offY, offX);
        if (!Number.isFinite(angle) || distance === 0) {
          angle = Math.random() * Math.PI * 2;
        }
        angle += (Math.random() - 0.5) * 0.5;
        const speed = (0.35 + distance * 0.9 + Math.random() * 0.4) * reach;
        particles.push({
          x,
          y,
          dx: Math.cos(angle) * speed,
          dy: Math.sin(angle) * speed,
          color: ch === "#" ? RING_COLOR : art.palette[Number.parseInt(ch, 10)],
        });
      });
    });

    let raf = 0;
    const start = performance.now();

    const frame = (now: number) => {
      const t = Math.min(1, (now - start) / BURST_DURATION);
      // A hard fling that coasts: most of the travel happens up front.
      const eased = 1 - Math.pow(1 - t, 3);
      // Hold full brightness, then the debris burns out.
      const alpha = t < 0.5 ? 1 : 1 - (t - 0.5) / 0.5;
      // Pixels shrink in two steps as they cool, never to a fraction of a cell.
      const size = t < 0.6 ? cell : Math.max(2, Math.round(cell / 2));

      ctx.clearRect(0, 0, width, height);
      ctx.globalAlpha = alpha;
      for (const p of particles) {
        const px = Math.round((p.x + p.dx * eased) / cell) * cell;
        const py = Math.round((p.y + p.dy * eased) / cell) * cell;
        ctx.fillStyle = p.color;
        ctx.fillRect(px, py, size, size);
      }

      if (t < 1) {
        raf = requestAnimationFrame(frame);
      } else {
        onDoneRef.current();
      }
    };
    raf = requestAnimationFrame(frame);

    return () => cancelAnimationFrame(raf);
  }, [tier, origin]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-20 h-full w-full"
    />
  );
}
