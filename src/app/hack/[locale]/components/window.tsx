"use client";

import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";
import clsx from "clsx";
import { lilex } from "@/src/app/fonts";
import { useTranslations } from "next-intl";
import { IconMinus, IconSquare, IconSquares, IconX } from "@tabler/icons-react";
import { useRouter } from "@/src/i18n/navigation";
import { raised, sunken } from "./bevel";

/**
 * The 2px gray chrome around a panel. Drawn as a ring (an outset box shadow)
 * rather than as a background on the frame, so that a panel can be transparent
 * and show the desktop through instead of the frame's gray.
 */
const chrome = "ring-2 ring-gray200";

function WindowButton({
  label,
  icon: Icon,
  onClick,
  className,
}: {
  label: string;
  icon: typeof IconX;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={clsx(
        "h-6 w-6 shrink-0 flex items-center justify-center bg-gray200 text-black outline-none",
        raised,
        "active:border-t-gray900 active:border-l-gray900 active:border-r-gray100 active:border-b-gray100",
        className,
      )}
    >
      <Icon className="w-3.5 h-3.5" stroke={3} />
    </button>
  );
}

export interface WindowProps {
  /**
   * Text shown in the window's title bar
   */
  title: string;
  children: ReactNode;
  className?: string;
  /**
   * Centre the window in the desktop and size it like the design's frame
   * (capped width, tall enough to cover the title) instead of stretching it
   * to every edge. The content scrolls inside once it would overflow.
   */
  fitContent?: boolean;
}

/**
 * Wraps a hackathon subpage in a draggable-looking "desktop window" that floats
 * on top of the main page. Closing it navigates back to the desktop, minimising
 * collapses it to its title bar in the bottom-left corner and maximising fills
 * the whole desktop, the way the window always looks on a phone.
 */
export function Window({
  title,
  children,
  className,
  fitContent = false,
}: WindowProps) {
  const router = useRouter();
  const [isMinimised, setIsMinimised] = useState(false);
  const [isMaximised, setIsMaximised] = useState(false);

  return (
    <div
      className={clsx(
        "pointer-events-auto absolute flex flex-col shadow-[6px_6px_0_rgba(0,0,0,0.6)]",
        raised,
        isMinimised
          ? "left-0 bottom-0 w-[calc(100%-1rem)] max-w-[20rem]"
          : "left-2 right-2 top-3 bottom-3",
        // Desktop, stretched: pinned to every edge, clear of the shortcuts.
        !isMinimised &&
          !isMaximised &&
          !fitContent &&
          "md:left-[9rem] md:right-10 md:top-8 md:bottom-10",
        // Desktop, fit to content: centred in the desktop and hugging its
        // content, as wide as the content plus padding (within the space right
        // of the shortcuts, and never a sliver while the content is loading),
        // at least 85% of the desktop tall so it always covers the title
        // behind it, never taller than the desktop. The content scrolls inside
        // once it would be.
        !isMinimised &&
          !isMaximised &&
          fitContent &&
          "md:left-[9rem] md:right-10 md:top-1/2 md:bottom-auto md:-translate-y-1/2 md:mx-auto md:w-fit md:min-w-[40rem] md:max-w-[calc(100%-11.5rem)] md:min-h-[85%] md:max-h-[calc(100%-4.5rem)]",
        // A phone held sideways has no height to spare for the desktop around
        // the window, so it fills the desktop the way it does on a phone.
        !isMinimised &&
          "short:left-2 short:right-2 short:top-2 short:bottom-2 short:mx-0 short:w-auto short:min-w-0 short:max-w-none short:min-h-0 short:max-h-none short:translate-y-0",
        className,
      )}
    >
      <div
        onDoubleClick={() => setIsMinimised((wasMinimised) => !wasMinimised)}
        className={clsx(
          "flex items-center justify-between gap-2 h-8 shrink-0 px-1 m-0.5 bg-[#0C0303] select-none",
          chrome,
        )}
      >
        <span
          className={clsx(
            lilex.className,
            "uppercase font-bold text-sm md:text-base text-white px-1 truncate",
          )}
        >
          {`/ ${title}`}
        </span>
        <div className="flex items-center gap-1">
          <WindowButton
            label={isMinimised ? "Restore" : "Minimise"}
            icon={IconMinus}
            onClick={() => setIsMinimised((wasMinimised) => !wasMinimised)}
          />
          <WindowButton
            label={isMaximised ? "Restore" : "Maximise"}
            icon={isMaximised ? IconSquares : IconSquare}
            // A phone window already fills the screen, so there is nothing to
            // maximise there.
            className="hidden md:flex short:hidden"
            onClick={() => {
              setIsMinimised(false);
              setIsMaximised((wasMaximised) => !wasMaximised);
            }}
          />
          <WindowButton
            label="Close"
            icon={IconX}
            onClick={() => router.push("/")}
          />
        </div>
      </div>
      {!isMinimised && (
        <div
          className={clsx(
            "grow min-h-0 overflow-y-auto m-0.5 mt-0 p-4 bg-[#0C0303] md:p-6 text-white",
            sunken,
            chrome,
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}

/** How many blocks fill the progress bar before it starts over. */
const LOADING_BLOCKS = 14;
const LOADING_CYCLE_SECONDS = 2.8;

/**
 * How long a window stays empty before the progress bar appears. Most pages
 * arrive well within this, so the window just opens and fills; the bar only
 * shows up when there is really something to wait for, instead of flashing.
 */
const LOADING_DELAY_MS = 400;

/**
 * The bar is drawn entirely in CSS, so it is in the server-rendered HTML and
 * appears and animates before the page's JavaScript has run - on a phone that
 * can take seconds after a direct load. It sits hidden until the delay is up;
 * block `i` lights up `i / LOADING_BLOCKS` into each cycle and stays lit until
 * the cycle starts over.
 */
const LOADING_CSS = [
  "@keyframes hack-loading-reveal{to{visibility:visible}}",
  ...Array.from({ length: LOADING_BLOCKS }, (_, index) => {
    const litAt = ((index / LOADING_BLOCKS) * 100).toFixed(3);
    return `@keyframes hack-loading-block-${index}{0%{opacity:${index ? 0 : 1}}${litAt}%,100%{opacity:1}}`;
  }),
].join("");

/** `useLayoutEffect` without React's warning when it renders on the server. */
const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * When the current wait began. A navigation shows the route's skeleton window
 * first and then hands over to the page's own loading state; both read this
 * one clock, so the delay counts from the click, not from each handover.
 */
let waitingSince: number | null = null;
let clearWaiting: number | undefined;

/**
 * An old Windows progress bar for a window whose contents are still on their
 * way: chunky red blocks fill a sunken track one by one, then it starts over.
 * It holds back until `LOADING_DELAY_MS` after the wait began; until then the
 * window sits empty.
 */
export function WindowLoading() {
  const t = useTranslations("Hackathon");
  const ref = useRef<HTMLDivElement>(null);

  // Once hydrated, line the CSS delay up with the shared clock, so a handover
  // from the skeleton neither restarts the wait nor the blocks' cycle. Runs
  // before paint, so the bar never blinks out in between.
  useIsomorphicLayoutEffect(() => {
    window.clearTimeout(clearWaiting);
    waitingSince ??= performance.now();
    const remaining = LOADING_DELAY_MS - (performance.now() - waitingSince);
    ref.current?.style.setProperty("--loading-delay", `${remaining}ms`);
    return () => {
      // A loading state that takes over right away keeps the clock running.
      clearWaiting = window.setTimeout(() => (waitingSince = null), 50);
    };
  }, []);

  return (
    <div
      ref={ref}
      role="status"
      aria-busy="true"
      className="invisible flex h-full min-h-[12rem] flex-col items-center justify-center gap-3 [--loading-delay:400ms] [animation:hack-loading-reveal_0s_var(--loading-delay)_forwards]"
    >
      <style dangerouslySetInnerHTML={{ __html: LOADING_CSS }} />
      <p className="font-heading text-sm uppercase tracking-widest text-white">
        {t("loading")}
      </p>
      <div
        className={clsx(
          "flex w-full max-w-[18rem] gap-[3px] bg-[#0C0303] p-[3px]",
          sunken,
        )}
      >
        {Array.from({ length: LOADING_BLOCKS }, (_, index) => (
          <span
            key={index}
            className="h-4 flex-1 bg-red opacity-0"
            style={{
              animation: `hack-loading-block-${index} ${LOADING_CYCLE_SECONDS}s steps(1, end) var(--loading-delay) infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
