import { ReactNode } from "react";
import { DesktopNav } from "./desktop-nav";

/**
 * The hackathon "desktop": a full-bleed backdrop with the window launcher down
 * the left side. `children` is the currently routed subpage, which renders a
 * `Window` floating on top of it.
 */
export function Desktop({ children }: { children: ReactNode }) {
  return (
    <div className="relative max-w-full h-[calc(100vh-66px)] bg-[#000] overflow-hidden">
      <DesktopNav />
      <div className="absolute inset-0 z-20 pointer-events-none">
        {children}
      </div>
    </div>
  );
}
