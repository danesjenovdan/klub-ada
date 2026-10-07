"use client";

import { useEffect, useState } from "react";

/*
 * Logos cropped to their visible pixels. Several sponsors uploaded their logo
 * on a wide canvas with lots of empty space around the mark, which made them
 * render small; trimming lets every mark be sized by what is actually drawn.
 */

export type Trimmed = { src: string; ratio: number };

const trimmed = new Map<string, Promise<Trimmed>>();

const load = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });

/** `src` cropped to its non-transparent pixels, as a data URL; cached. */
export function trimLogo(src: string) {
  let job = trimmed.get(src);
  if (!job) {
    job = load(src).then((image) => {
      const canvas = document.createElement("canvas");
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(image, 0, 0);
      const { data, width, height } = ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height,
      );
      let left = width;
      let right = -1;
      let top = height;
      let bottom = -1;
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          if (data[(y * width + x) * 4 + 3] > 16) {
            if (x < left) left = x;
            if (x > right) right = x;
            if (y < top) top = y;
            if (y > bottom) bottom = y;
          }
        }
      }
      // Nothing transparent to trim: keep the image as it is.
      if (right < 0) return { src, ratio: width / height };
      const w = right - left + 1;
      const h = bottom - top + 1;
      const crop = document.createElement("canvas");
      crop.width = w;
      crop.height = h;
      crop.getContext("2d")!.drawImage(canvas, left, top, w, h, 0, 0, w, h);
      return { src: crop.toDataURL("image/png"), ratio: w / h };
    });
    trimmed.set(src, job);
  }
  return job;
}

/**
 * The trimmed logo once it is ready; until then (or if trimming fails, e.g.
 * on a CORS error) the untrimmed image with its uploaded proportions.
 */
export function useTrimmedLogo(src: string, fallbackRatio: number): Trimmed {
  const [logo, setLogo] = useState<Trimmed | null>(null);
  useEffect(() => {
    let cancelled = false;
    trimLogo(src)
      .then((result) => !cancelled && setLogo(result))
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [src]);
  return logo ?? { src, ratio: fallbackRatio };
}

/**
 * A logo's size when sized by area, so a long wordmark and a compact mark
 * carry about the same visual weight, within a width and height cap.
 */
export function logoSize(
  ratio: number,
  area: number,
  maxWidth: number,
  maxHeight: number,
) {
  const height = Math.min(Math.sqrt(area / ratio), maxHeight, maxWidth / ratio);
  return { width: height * ratio, height };
}
