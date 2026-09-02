"use client";

import { ReactNode, useState } from "react";
import clsx from "clsx";
import { IconMinus, IconX } from "@tabler/icons-react";
import { useRouter } from "@/src/i18n/navigation";

/**
 * Classic 3D bevel of an old Windows UI element: light on the top/left edges,
 * dark on the bottom/right ones. `sunken` is the same trick, inverted.
 */
const raised =
  "border-2 border-t-gray100 border-l-gray100 border-r-gray900 border-b-gray900";
const sunken =
  "border-2 border-t-gray900 border-l-gray900 border-r-gray100 border-b-gray100";

function WindowButton({
  label,
  icon: Icon,
  onClick,
}: {
  label: string;
  icon: typeof IconX;
  onClick: () => void;
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
}

/**
 * Wraps a hackathon subpage in a draggable-looking "desktop window" that floats
 * on top of the main page. Closing it navigates back to the desktop, minimising
 * collapses it to its title bar in the bottom-left corner.
 */
export function Window({ title, children, className }: WindowProps) {
  const router = useRouter();
  const [isMinimised, setIsMinimised] = useState(false);

  return (
    <div
      className={clsx(
        "pointer-events-auto absolute flex flex-col bg-gray200 shadow-[6px_6px_0_rgba(0,0,0,0.6)]",
        raised,
        isMinimised
          ? "left-0 bottom-0 w-[calc(100%-1rem)] max-w-[20rem]"
          : "left-2 right-2 top-3 bottom-3 md:left-[19rem] md:right-10 md:top-8 md:bottom-10",
        className,
      )}
    >
      <div
        onDoubleClick={() => setIsMinimised((wasMinimised) => !wasMinimised)}
        className="flex items-center justify-between gap-2 h-8 shrink-0 px-1 m-0.5 bg-[#0C0303] select-none"
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
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}
