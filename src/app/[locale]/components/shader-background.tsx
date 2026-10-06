"use client";

import { useState } from "react";
import { Shader } from "shaders/react";

/**
 * One selectable background. `render` returns the shader layers to mount
 * inside a `<Shader>` canvas, or is `null` for "no shader" (keep whatever the
 * page already draws underneath).
 */
export type ShaderBackgroundVariant = {
  id: string;
  name: string;
  description: string;
  render: (() => JSX.Element) | null;
};

type ShaderBackgroundProps = {
  variant: ShaderBackgroundVariant;
};

/**
 * Full-bleed WebGPU canvas for the given variant. Renders nothing when the
 * variant has no shader or when the browser cannot run WebGPU, so the
 * element's normal CSS background shows through.
 */
export function ShaderBackground({ variant }: ShaderBackgroundProps) {
  const [unavailable, setUnavailable] = useState(false);

  if (unavailable || !variant.render) return null;

  return (
    <Shader
      // Remount the canvas when the variant changes so layers don't bleed between variants.
      key={variant.id}
      className="absolute inset-0 h-full w-full"
      disableTelemetry
      onUnavailable={() => setUnavailable(true)}
    >
      {variant.render()}
    </Shader>
  );
}
