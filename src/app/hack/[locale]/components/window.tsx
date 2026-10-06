"use client";

import { ReactNode, useState } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { IconMinus, IconSquare, IconSquares, IconX } from "@tabler/icons-react";
import { useRouter } from "@/src/i18n/navigation";

/**
 * Classic 3D bevel of an old Windows UI element: light on the top/left edges,
 * dark on the bottom/right ones. `sunken` is the same trick, inverted.
 */
const raised =
  "border-2 border-t-gray100 border-l-gray100 border-r-gray900 border-b-gray900";
const sunken =
  "border-2 border-t-gray900 border-l-gray900 border-r-gray100 border-b-gray100";
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
        <span className="uppercase font-bold text-sm md:text-base text-white px-1 truncate">
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
            className="hidden md:flex"
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
 * An old Windows progress bar for a window whose contents are still on their
 * way: chunky red blocks fill a sunken track one by one, then it starts over.
 */
export function WindowLoading() {
  const t = useTranslations("Hackathon");

  return (
    <div
      role="status"
      className="flex h-full min-h-[12rem] flex-col items-center justify-center gap-3"
    >
      <p className="font-heading text-sm uppercase tracking-widest text-white">
        {t("loading")}
      </p>
      <div
        className={clsx(
          "flex w-full max-w-[18rem] gap-[3px] bg-[#0C0303] p-[3px]",
          sunken,
        )}
      >
        {Array.from({ length: LOADING_BLOCKS }, (_, index) => {
          const shownAt = index / LOADING_BLOCKS;
          return (
            <motion.span
              key={index}
              className="h-4 flex-1 bg-red"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0, 1, 1] }}
              transition={{
                duration: LOADING_CYCLE_SECONDS,
                times: [0, shownAt, shownAt, 1],
                ease: "linear",
                repeat: Infinity,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
