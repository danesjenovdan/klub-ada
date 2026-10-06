"use client";

import { useEffect, useState } from "react";
import type { ShaderBackgroundVariant } from "./shader-background";

/**
 * Selected-variant state for a background experiment. The choice is read from
 * `?bg=<id>` first (handy for sharing a specific variant), then from
 * localStorage under `storageKey`, and every change is written back.
 */
export function useShaderBackground(
  variants: ShaderBackgroundVariant[],
  storageKey: string,
) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("bg");
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(storageKey);
    } catch {
      // localStorage unavailable; keep the default
    }
    const found = variants.findIndex((v) => v.id === (fromUrl ?? stored));
    if (found >= 0) setIndex(found);
  }, [variants, storageKey]);

  const select = (next: number) => {
    setIndex(next);
    try {
      window.localStorage.setItem(storageKey, variants[next].id);
    } catch {
      // ignore
    }
  };

  return { index, variant: variants[index], select };
}
