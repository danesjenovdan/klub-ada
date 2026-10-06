"use client";

import { ShaderBackground } from "@/src/app/[locale]/components/shader-background";
import { ShaderBackgroundToggle } from "@/src/app/[locale]/components/shader-background-toggle";
import { useShaderBackground } from "@/src/app/[locale]/components/use-shader-background";
import { DESKTOP_BACKGROUNDS } from "./desktop-backgrounds";

const STORAGE_KEY = "klub-ada:hack-background";

/**
 * Experimental shader backdrop for the hackathon desktop plus the floating
 * toggle to flip through `DESKTOP_BACKGROUNDS`. Mount it as the first child
 * of the desktop so it sits under the title, shortcuts and windows. Until the
 * WebGPU canvas is up (or if it is unavailable) the CSS `bg.svg` shows.
 * The choice is remembered in localStorage and can be forced with `?bg=<id>`.
 */
export function DesktopShaderExperiment() {
  const { index, variant, select } = useShaderBackground(
    DESKTOP_BACKGROUNDS,
    STORAGE_KEY,
  );

  return (
    <>
      <div className="absolute inset-0" aria-hidden>
        <ShaderBackground variant={variant} />
      </div>
      <ShaderBackgroundToggle
        variants={DESKTOP_BACKGROUNDS}
        index={index}
        onChange={select}
        label="Backdrop"
        theme="dark"
      />
    </>
  );
}
