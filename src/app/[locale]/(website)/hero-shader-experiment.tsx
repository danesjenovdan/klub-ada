"use client";

import { ShaderBackground } from "@/src/app/[locale]/components/shader-background";
import { ShaderBackgroundToggle } from "@/src/app/[locale]/components/shader-background-toggle";
import { useShaderBackground } from "@/src/app/[locale]/components/use-shader-background";
import { HERO_BACKGROUNDS } from "./hero-backgrounds";

const STORAGE_KEY = "klub-ada:hero-background";

type HeroShaderExperimentProps = {
  children: React.ReactNode;
};

/**
 * Experimental wrapper that paints a shader behind the hero and exposes a
 * floating toggle to flip between the variants in `HERO_BACKGROUNDS`.
 * The chosen variant is remembered in localStorage and can be forced with `?bg=<id>`.
 */
export function HeroShaderExperiment({ children }: HeroShaderExperimentProps) {
  const { index, variant, select } = useShaderBackground(
    HERO_BACKGROUNDS,
    STORAGE_KEY,
  );

  return (
    <>
      {/*
        Pull the section up behind the sticky navbar so the shader fills the
        whole header, then pad the same amount so content stays in place.
      */}
      <div className="relative -mt-16 md:-mt-20 pt-16 md:pt-20 pb-6 md:pb-10 overflow-hidden rounded-b-3xl">
        <div className="absolute inset-0" aria-hidden>
          <ShaderBackground variant={variant} />
        </div>
        <div className="relative">{children}</div>
      </div>
      <ShaderBackgroundToggle
        variants={HERO_BACKGROUNDS}
        index={index}
        onChange={select}
        label="Header"
      />
    </>
  );
}
