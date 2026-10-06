"use client";

import { RadialGradient, Swirl, Twirl, Blur } from "shaders/react";
import type { ShaderBackgroundVariant } from "@/src/app/[locale]/components/shader-background";

// Hackathon palette: the near-black of `bg.svg` plus the brand accents.
const C = {
  bg: "#0c0303",
  redDeep: "#3a0b0b",
  redDark: "#7a1f1f",
  red: "#ff5757",
};

/**
 * The hackathon desktop's backdrop: an animated shader take on the blurred
 * red blob in `bg.svg`. A deep-red glow fading to near-black edges, with a
 * quiet, heavily blurred circular swirl in darker reds turning on top of it.
 * Only shades of the brand red, no hard edges.
 */
export const DESKTOP_BACKGROUND: ShaderBackgroundVariant = {
  id: "swirl-soft",
  name: "Soft swirl",
  description:
    "A quiet, heavily blurred circular swirl in darker reds over a deep-red glow.",
  render: () => (
    <>
      <RadialGradient
        stops={[
          { color: C.redDeep, position: 0 },
          { color: "#1e0707", position: 0.55 },
          { color: C.bg, position: 1 },
        ]}
        center={{ x: 0.5, y: 0.5 }}
        radius={1.1}
        aspect={1.6}
      />
      <Blur intensity={90} opacity={0.55}>
        <Twirl intensity={3.5} center={{ x: 0.5, y: 0.5 }} edges="mirror">
          <Swirl
            stops={[
              { color: C.bg, position: 0 },
              { color: C.redDeep, position: 0.6 },
              { color: C.redDark, position: 0.85 },
              { color: C.red, position: 1 },
            ]}
            speed={0.3}
            detail={1.5}
            blend={25}
          />
        </Twirl>
      </Blur>
    </>
  ),
};
