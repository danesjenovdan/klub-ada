import { ReactNode } from "react";
import Image from "next/image";
import { DesktopNav } from "./desktop-nav";

/**
 * The hackathon "desktop": a full-bleed backdrop with the window launcher down
 * the left side. `children` is the currently routed subpage, which renders a
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
      <DesktopNav />
      <div className="absolute inset-0 z-20 pointer-events-none">
        {children}
      </div>
    </div>
  );
}
