import Image from "next/image";
import { useTranslations } from "next-intl";
import { instrumentSerif, plexMono } from "@/src/app/fonts";

/**
 * The hackathon title that sits in the middle of the desktop: the pixel duck,
 * "AdaHack / Code for change" and the date. It is real text (not baked into
 * the backdrop) so it stays sharp at any viewport size and pixel density.
 *
 * The duck and the title are 1.8x their size in the 1596px-wide Figma frame
 * (duck 380px, title 180px; the date stays at 24px) and scale down with the
 * viewport via `clamp()`, following whichever of the viewport's width or
 * height is tighter (a laptop is wide but short), and bottoming out at a size
 * that still fits a phone.
 * The whole block is at 80% opacity like in the design, and ignores the
 * pointer so the shortcuts and windows above it stay clickable.
 */
export function Hero() {
  const t = useTranslations("Hackathon.hero");

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-4 opacity-80 pointer-events-none select-none">
      <Image
        src="/assets/hackathon26/duck.svg"
        alt=""
        width={211}
        height={145}
        priority
        className="w-[clamp(106px,min(23.8vw,27.4vh),380px)] h-auto"
      />
      <h1
        className={`${instrumentSerif.className} -mt-[0.3em] text-[clamp(50px,min(11.25vw,13vh),180px)] leading-[0.9] tracking-[-0.02em] text-center text-[#fafafa] text-balance`}
      >
        {t("title_line1")}
        <br />
        {t("title_line2")}
      </h1>
      <p
        className={`${plexMono.className} mt-[clamp(10px,1vw,16px)] text-[clamp(16px,1.5vw,24px)] leading-[0.9] tracking-[-0.02em] text-center text-[#fafafa]`}
      >
        {t("date")}
      </p>
    </div>
  );
}
