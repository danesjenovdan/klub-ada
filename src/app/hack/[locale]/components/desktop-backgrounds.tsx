"use client";

import { RadialGradient, Swirl, Twirl, Blur, Blob } from "shaders/react";
import type { ShaderBackgroundVariant } from "@/src/app/[locale]/components/shader-background";

// Hackathon palette: the near-black of `bg.svg` plus the brand accents.
const C = {
  bg: "#0c0303",
  redDeep: "#3a0b0b",
  redDark: "#7a1f1f",
  red: "#ff5757",
  redLight: "#ff8f8f",
};

/**
 * Shared gradient base: a deep-red glow fading to the near-black edges, the
 * same idea as the blurred blob in `bg.svg`. Every variant sits on top of it.
 */
function GradientBase() {
  return (
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
  );
}

/**
 * Backgrounds for the hackathon desktop: animated shader takes on the blurred
 * red blob in `bg.svg`, using only shades of the brand red. All of them are
 * soft gradients with no hard edges.
 */
export const DESKTOP_BACKGROUNDS: ShaderBackgroundVariant[] = [
  {
    id: "swirl",
    name: "Swirl",
    description:
      "Light-red ribbons spinning in a circular vortex around the center.",
    render: () => (
      <Twirl intensity={3.5} center={{ x: 0.5, y: 0.5 }} edges="mirror">
        <Swirl
          stops={[
            { color: C.bg, position: 0 },
            { color: C.redDeep, position: 0.55 },
            { color: C.redDark, position: 0.8 },
            { color: C.redLight, position: 1 },
          ]}
          speed={0.4}
          detail={2}
          blend={30}
        />
      </Twirl>
    ),
  },
  {
    id: "blobs",
    name: "Living blob",
    description: "The red blob from the design, morphing and drifting.",
    render: () => (
      <>
        <GradientBase />
        <Blob
          colorA={C.redDark}
          colorB={C.redDeep}
          size={0.7}
          deformation={1}
          softness={0.6}
          highlightIntensity={0}
          speed={0.9}
          seed={4}
          center={{ x: 0.5, y: 0.5 }}
          opacity={0.85}
        />
      </>
    ),
  },
  {
    id: "swirl-soft",
    name: "Soft swirl",
    description:
      "A quieter, heavily blurred version of the circular swirl in darker reds.",
    render: () => (
      <>
        <GradientBase />
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
  },
];
