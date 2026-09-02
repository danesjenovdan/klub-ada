import { ReactNode } from "react";
import Image from "next/image";
import { DesktopShortcuts } from "./desktop-shortcuts";

/**
 * The hackathon "desktop": a full-bleed backdrop with the shortcuts scattered
 * over it. `children` is the currently routed subpage, which renders a
 * `Window` floating on top of it.
 */
export function Desktop({ children }: { children: ReactNode }) {
  return (
    <div className="relative max-w-full h-[calc(100vh-66px)] bg-[#000] overflow-hidden">
      <Image
        src="/assets/hackathon26/bg.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center z-0"
      />
      <DesktopShortcuts />
      <div className="absolute inset-0 z-20 pointer-events-none">
        {children}
      </div>
    </div>
  );
}
