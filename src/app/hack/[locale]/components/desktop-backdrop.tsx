"use client";

import { ShaderBackground } from "@/src/app/[locale]/components/shader-background";
import { DESKTOP_BACKGROUND } from "./desktop-backgrounds";

/**
 * The animated backdrop of the hackathon desktop. Mounted as the first child
 * of the desktop so it sits under the title, shortcuts and windows. Until the
 * WebGPU canvas is up (or if it is unavailable) the CSS `bg.svg` shows.
 */
export function DesktopBackdrop() {
  return (
    <div className="absolute inset-0" aria-hidden>
      <ShaderBackground variant={DESKTOP_BACKGROUND} />
    </div>
  );
}
