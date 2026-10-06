"use client";

import {
  SolidColor,
  MeshGradient,
  Voronoi,
  DotGrid,
  Stripes,
  Blob,
  Grid,
  ContourLines,
  SimplexNoise,
  Halftone,
  RadialGradient,
  Truchet,
  FloatingParticles,
} from "shaders/react";

// Brand palette (mirrors the CSS variables in globals.css)
const C = {
  beige: "#f7efe9",
  beigeDark: "#efe3d9",
  white: "#fafafa",
  black: "#231f20",
  red: "#ff5757",
  red200: "#ffdddd",
  red300: "#ffbcbc",
  blue: "#77a4d4",
  blue200: "#e4edf6",
  blue300: "#c9dbee",
  blue400: "#adc8e5",
  yellow: "#fbb040",
  yellowLight: "#fde3b8",
  pink: "#ff85a5",
  pink200: "#ffe7ed",
  pink300: "#ffcedb",
};

import type { ShaderBackgroundVariant } from "@/src/app/[locale]/components/shader-background";

export const HERO_BACKGROUNDS: ShaderBackgroundVariant[] = [
  {
    id: "mesh",
    name: "Pastel mesh",
    description:
      "Slow-moving mesh gradient in beige, pink, blue and yellow tints.",
    render: () => (
      <MeshGradient
        stops={[
          { color: C.beige, position: 0 },
          { color: C.pink200, position: 0.3 },
          { color: C.blue200, position: 0.55 },
          { color: C.yellowLight, position: 0.8 },
          { color: C.beige, position: 1 },
        ]}
        count={6}
        smoothness={3}
        variation={0.2}
        swirl={0.15}
        drift={0.4}
        speed={0.3}
        seed={7}
      />
    ),
  },
  {
    id: "mosaic",
    name: "Mosaic",
    description:
      "Slowly drifting Voronoi cells in pink with thin blue borders.",
    render: () => (
      <Voronoi
        colorA={C.beige}
        colorB={C.pink200}
        colorBorder={C.blue}
        scale={7}
        speed={0.3}
        seed={2}
        edgeIntensity={0.6}
        edgeSoftness={0.015}
      />
    ),
  },
  {
    id: "dots",
    name: "Polka dots",
    description: "Staggered blue dot grid on beige, drifting very slowly.",
    render: () => (
      <>
        <SolidColor color={C.beige} />
        <DotGrid
          color={C.blue}
          density={22}
          dotSize={0.26}
          offset={0.5}
          speed={0.04}
          speedVariance={0.2}
        />
      </>
    ),
  },
  {
    id: "stripes",
    name: "Diagonal stripes",
    description: "Tone-on-tone beige stripes with a slow crawl.",
    render: () => (
      <Stripes
        colorA={C.beige}
        colorB={C.beigeDark}
        angle={-30}
        density={14}
        balance={0.5}
        softness={0}
        speed={0.03}
      />
    ),
  },
  {
    id: "blobs",
    name: "Floating blobs",
    description: "Three soft brand-colored blobs morphing like a lava lamp.",
    render: () => (
      <>
        <SolidColor color={C.beige} />
        <Blob
          colorA={C.red}
          colorB={C.pink}
          size={0.55}
          deformation={0.6}
          softness={0.35}
          highlightIntensity={0}
          speed={0.25}
          seed={4}
          center={{ x: 0.15, y: 0.35 }}
          opacity={0.6}
        />
        <Blob
          colorA={C.blue}
          colorB={C.blue400}
          size={0.65}
          deformation={0.7}
          softness={0.35}
          highlightIntensity={0}
          speed={0.2}
          seed={11}
          center={{ x: 0.82, y: 0.7 }}
          opacity={0.6}
        />
        <Blob
          colorA={C.yellow}
          colorB={C.yellowLight}
          size={0.45}
          deformation={0.5}
          softness={0.35}
          highlightIntensity={0}
          speed={0.3}
          seed={23}
          center={{ x: 0.55, y: 0.1 }}
          opacity={0.6}
        />
      </>
    ),
  },
  {
    id: "grid",
    name: "Graph paper",
    description: "Fine blue grid lines on beige, like squared notebook paper.",
    render: () => (
      <>
        <SolidColor color={C.beige} />
        <Grid color={C.blue300} cells={16} thickness={1.2} softness={0} />
      </>
    ),
  },
  {
    id: "topo",
    name: "Topographic",
    description: "Red contour lines traced over slowly shifting noise.",
    render: () => (
      <ContourLines
        levels={5}
        lineWidth={1.2}
        softness={0.1}
        gamma={1}
        colorMode="custom"
        lineColor={C.red}
        backgroundColor={C.beige}
        opacity={0.75}
      >
        <SimplexNoise
          colorA={C.white}
          colorB={C.black}
          scale={3}
          contrast={0.5}
          speed={0.1}
          seed={5}
        />
      </ContourLines>
    ),
  },
  {
    id: "halftone",
    name: "Halftone pop",
    description: "Print-style halftone dots over a radial brand gradient.",
    render: () => (
      <Halftone
        style="classic"
        frequency={55}
        angle={30}
        paperColor={C.beige}
        cyanColor={C.blue}
        magentaColor={C.pink}
        yellowColor={C.yellow}
        blackColor={C.red}
      >
        <RadialGradient
          stops={[
            { color: C.red300, position: 0 },
            { color: C.pink300, position: 0.45 },
            { color: C.blue300, position: 1 },
          ]}
          center={{ x: 0.7, y: 0.5 }}
          radius={1.2}
          aspect={1.6}
        />
      </Halftone>
    ),
  },
  {
    id: "truchet",
    name: "Truchet maze",
    description:
      "Interlocking arc tiles in light blue, a quiet circuit-board feel.",
    render: () => (
      <Truchet
        colorA={C.beige}
        colorB={C.blue300}
        cells={12}
        thickness={2.5}
        softness={0.05}
        seed={9}
      />
    ),
  },
  {
    id: "confetti",
    name: "Confetti",
    description: "Small red and blue squares drifting upward over beige.",
    render: () => (
      <>
        <SolidColor color={C.beige} />
        <FloatingParticles
          particleColor={C.red}
          shape="square"
          count={450}
          particleSize={3}
          softness={0}
          speed={0.12}
          angle={90}
          speedVariance={0.5}
          angleVariance={40}
          randomness={0.4}
          twinkle={0.2}
          opacity={0.7}
        />
        <FloatingParticles
          particleColor={C.blue}
          shape="square"
          count={450}
          particleSize={3}
          softness={0}
          speed={0.1}
          angle={95}
          speedVariance={0.5}
          angleVariance={40}
          randomness={0.4}
          twinkle={0.2}
          opacity={0.7}
        />
      </>
    ),
  },
];
