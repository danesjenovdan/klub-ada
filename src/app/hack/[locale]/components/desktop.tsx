import { ReactNode } from "react";
import { DesktopShortcuts } from "./desktop-shortcuts";
import { Hero } from "./hero";
import { DesktopBackdrop } from "./desktop-backdrop";
import { Tray } from "./tray";
import { sunken } from "./bevel";
import clsx from "clsx";

/**
 * The hackathon "desktop": a full-bleed backdrop with the title in the middle
 * and the shortcuts scattered over it, and the tray with the language switch
 * in the bottom-right corner. `children` is the currently routed
 * subpage, which renders a `Window` floating on top of it.
 *
 * The backdrop is the animated soft swirl shader (see `DesktopBackdrop`),
 * drawn over `bg.svg`: the blurred red blob from the design as a CSS
 * background with `cover`, which also stands in wherever WebGPU is not
 * available.
 */
export function Desktop({ children }: { children: ReactNode }) {
  return (
    <div
      className={clsx(
        "relative max-w-full grow min-h-0 bg-[#0c0303] overflow-hidden bg-[url(/assets/hackathon26/bg.svg)] bg-cover bg-center bg-no-repeat",
        sunken,
      )}
    >
      <DesktopBackdrop />
      <Hero />
      <DesktopShortcuts />
      <div className="absolute inset-0 z-20 pointer-events-none">
        {children}
      </div>
      <Tray />
    </div>
  );
}
