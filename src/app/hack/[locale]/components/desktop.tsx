import { ReactNode } from "react";
import { DesktopShortcuts } from "./desktop-shortcuts";

/**
 * The hackathon "desktop": a full-bleed backdrop with the shortcuts scattered
 * over it. `children` is the currently routed subpage, which renders a
 * `Window` floating on top of it.
 *
 * The backdrop is a CSS background rather than an `Image` so that the phone and
 * the desktop crop can be swapped at `md` without downloading both.
 */
export function Desktop({ children }: { children: ReactNode }) {
  return (
    <div className="relative max-w-full grow min-h-0 bg-[#000] overflow-hidden bg-[url(/assets/hackathon26/bg-mobile.png)] md:bg-[url(/assets/hackathon26/bg.png)] bg-cover bg-center bg-no-repeat">
      <DesktopShortcuts />
      <div className="absolute inset-0 z-20 pointer-events-none">
        {children}
      </div>
    </div>
  );
}
