"use client";

import dynamic from "next/dynamic";

/**
 * The shader library is over half a megabyte of JavaScript. Loading it
 * separately, after the page is interactive, keeps it off the critical path:
 * the desktop and its shortcuts respond straight away while the CSS `bg.svg`
 * stands in, and the animated swirl fades in once its code has arrived.
 */
const AnimatedBackdrop = dynamic(
  () =>
    Promise.all([
      import("@/src/app/[locale]/components/shader-background"),
      import("./desktop-backgrounds"),
    ]).then(([{ ShaderBackground }, { DESKTOP_BACKGROUND }]) => {
      function Backdrop() {
        return <ShaderBackground variant={DESKTOP_BACKGROUND} />;
      }
      return Backdrop;
    }),
  { ssr: false },
);

/**
 * The animated backdrop of the hackathon desktop. Mounted as the first child
 * of the desktop so it sits under the title, shortcuts and windows. Until the
 * WebGPU canvas is up (or if it is unavailable) the CSS `bg.svg` shows.
 */
export function DesktopBackdrop() {
  return (
    <div className="absolute inset-0" aria-hidden>
      <AnimatedBackdrop />
    </div>
  );
}
