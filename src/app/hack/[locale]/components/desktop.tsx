import { ReactNode } from "react";
import { DesktopShortcuts } from "./desktop-shortcuts";
import { Hero } from "./hero";

/**
 * The hackathon "desktop": a full-bleed backdrop with the title in the middle
 * and the shortcuts scattered over it. `children` is the currently routed
 * subpage, which renders a `Window` floating on top of it.
 *
 * The backdrop is a vector (the blurred red blob from the design, see
 * `bg.svg`) drawn as a CSS background with `cover`, so it stays crisp on any
 * viewport and pixel density and a single file serves phones and desktops.
 */
export function Desktop({ children }: { children: ReactNode }) {
  return (
    <div className="relative max-w-full grow min-h-0 bg-[#0c0303] overflow-hidden bg-[url(/assets/hackathon26/bg.svg)] bg-cover bg-center bg-no-repeat">
      <Hero />
      <DesktopShortcuts />
      <div className="absolute inset-0 z-20 pointer-events-none">
        {children}
      </div>
    </div>
  );
}
