"use client";

import { useEffect, useRef } from "react";

/*
 * A speaker's photo as if on an old monitor, drawn on a canvas from the
 * original image so any photo from Sanity takes the hackathon's look: its
 * light mapped onto the site's own colours (the ink ground, the brand red and
 * white), in scanlines.
 */

type Rgb = [number, number, number];

/** Darkest to lightest, from the site's ink through the brand red to white. */
const RAMP: Rgb[] = [
  [0x0c, 0x03, 0x03],
  [0x3a, 0x0b, 0x0b],
  [0x7a, 0x1f, 0x1f],
  [0xc8, 0x3a, 0x3a],
  [0xff, 0x57, 0x57],
  [0xff, 0xb3, 0xb3],
  [0xfa, 0xfa, 0xfa],
];

/** A colour `p` (0..1) of the way along the ramp, blended between its stops. */
const along = (p: number): Rgb => {
  const x = Math.min(0.9999, Math.max(0, p)) * (RAMP.length - 1);
  const i = Math.floor(x);
  const f = x - i;
  return [0, 1, 2].map((c) =>
    Math.round(RAMP[i][c] + (RAMP[i + 1][c] - RAMP[i][c]) * f),
  ) as Rgb;
};

/**
 * Images still being drawn. An export waits on this, so a frame is never
 * captured with an empty canvas.
 */
const pending = new Set<Promise<void>>();
export const photosReady = () => Promise.all(Array.from(pending));

/** Hold exports until `job` has drawn. */
export const trackDrawing = (job: Promise<void>) => {
  pending.add(job);
  job.finally(() => pending.delete(job));
};

const images = new Map<string, Promise<HTMLImageElement>>();
export const loadImage = (src: string) => {
  let image = images.get(src);
  if (!image) {
    image = new Promise((resolve, reject) => {
      const element = new Image();
      element.crossOrigin = "anonymous";
      element.onload = () => resolve(element);
      element.onerror = reject;
      element.src = src;
    });
    images.set(src, image);
  }
  return image;
};

/**
 * How the photo sits in its frame: `zoom` from 1 (fills the frame) upward,
 * and where the visible part is centred, 0..1 across and down the photo.
 */
export type Crop = { zoom: number; x: number; y: number };
export const DEFAULT_CROP: Crop = { zoom: 1, x: 0.5, y: 0.3 };

/**
 * The photo's luminance, 0..1, cropped to fill `width`×`height` cells the way
 * `object-fit: cover` would, framed by `crop`, with the contrast lifted.
 */
function sample(
  image: HTMLImageElement,
  width: number,
  height: number,
  crop: Crop,
) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  const scale =
    Math.max(width / image.width, height / image.height) * crop.zoom;
  const w = width / scale;
  const h = height / scale;
  ctx.drawImage(
    image,
    (image.width - w) * crop.x,
    (image.height - h) * crop.y,
    w,
    h,
    0,
    0,
    width,
    height,
  );
  const { data } = ctx.getImageData(0, 0, width, height);
  const light = new Float32Array(width * height);
  for (let i = 0; i < light.length; i++) {
    const l =
      (0.2126 * data[i * 4] +
        0.7152 * data[i * 4 + 1] +
        0.0722 * data[i * 4 + 2]) /
      255;
    light[i] = Math.min(1, Math.max(0, (l - 0.5) * 1.35 + 0.5));
  }
  return light;
}

/**
 * The monitor: the photo at half resolution, mapped along the red ramp, with
 * every third row dimmed into a scanline.
 */
function draw(
  canvas: HTMLCanvasElement,
  image: HTMLImageElement,
  width: number,
  height: number,
  crop: Crop,
) {
  const w = Math.round(width / 2);
  const h = Math.round(height / 2);
  const light = sample(image, w, h, crop);
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  const out = ctx.createImageData(w, h);
  for (let y = 0; y < h; y++) {
    const dim = y % 3 === 2 ? 0.35 : 1;
    for (let x = 0; x < w; x++) {
      const [r, g, b] = along(Math.pow(light[y * w + x], 1.2) * 0.92);
      const i = (y * w + x) * 4;
      out.data[i] = r * dim;
      out.data[i + 1] = g * dim;
      out.data[i + 2] = b * dim;
      out.data[i + 3] = 255;
    }
  }
  ctx.putImageData(out, 0, 0);
}

export function ScreenPhoto({
  src,
  width,
  height,
  alt,
  crop = DEFAULT_CROP,
}: {
  src: string;
  width: number;
  height: number;
  alt: string;
  crop?: Crop;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let cancelled = false;
    const job = loadImage(src)
      .then((image) => {
        if (!cancelled && canvasRef.current) {
          draw(canvasRef.current, image, width, height, crop);
        }
      })
      .catch(() => undefined);
    trackDrawing(job);
    return () => {
      cancelled = true;
    };
  }, [src, width, height, crop.zoom, crop.x, crop.y]);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={alt}
      className="block h-full w-full [image-rendering:pixelated]"
    />
  );
}
