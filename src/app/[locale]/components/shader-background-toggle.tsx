"use client";

import clsx from "clsx";
import type { ShaderBackgroundVariant } from "./shader-background";

type ShaderBackgroundToggleProps = {
  variants: ShaderBackgroundVariant[];
  index: number;
  onChange: (index: number) => void;
  /** Short label shown before the dropdown. */
  label?: string;
  /** `light` matches the main site, `dark` matches the hackathon desktop. */
  theme?: "light" | "dark";
};

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {direction === "left" ? (
        <path d="M15 6l-6 6 6 6" />
      ) : (
        <path d="M9 6l6 6-6 6" />
      )}
    </svg>
  );
}

/**
 * Floating prev/next + dropdown control for flipping through background
 * variants. Fixed to the bottom-right so it doesn't collide with the Next.js
 * dev badge in the bottom-left.
 */
export function ShaderBackgroundToggle({
  variants,
  index,
  onChange,
  label = "Background",
  theme = "light",
}: ShaderBackgroundToggleProps) {
  const total = variants.length;
  const current = variants[index];
  const dark = theme === "dark";

  const buttonClass = clsx(
    "flex h-8 w-8 shrink-0 items-center justify-center transition-all duration-200",
    dark
      ? "border-2 border-red text-red hover:bg-red hover:text-black"
      : "rounded-full border border-black bg-white text-black hover:-translate-y-0.5 hover:shadow-button",
  );

  return (
    <div
      className={clsx(
        "fixed bottom-4 right-4 z-30 flex items-center gap-2 py-1.5 pl-2 pr-3 text-sm",
        dark
          ? "border-2 border-red bg-[#0c0303] font-heading uppercase text-white"
          : "rounded-full border border-black bg-white font-paragraph text-black shadow-button",
      )}
    >
      <button
        type="button"
        aria-label={`Previous ${label.toLowerCase()}`}
        className={buttonClass}
        onClick={() => onChange((index - 1 + total) % total)}
      >
        <Chevron direction="left" />
      </button>
      <label className="flex items-center gap-2">
        <span
          className={clsx(
            "hidden sm:inline",
            dark ? "text-red" : "text-gray600",
          )}
        >
          {label}
        </span>
        <select
          aria-label={`${label} variant`}
          className="max-w-[11rem] cursor-pointer bg-transparent font-medium outline-none"
          value={current.id}
          onChange={(e) =>
            onChange(variants.findIndex((v) => v.id === e.target.value))
          }
        >
          {variants.map((v, i) => (
            <option
              key={v.id}
              value={v.id}
              className={dark ? "bg-[#0c0303] text-white" : undefined}
            >
              {i + 1}. {v.name}
            </option>
          ))}
        </select>
      </label>
      <span
        className={clsx("tabular-nums", dark ? "text-red" : "text-gray600")}
      >
        {index + 1}/{total}
      </span>
      <button
        type="button"
        aria-label={`Next ${label.toLowerCase()}`}
        className={buttonClass}
        onClick={() => onChange((index + 1) % total)}
      >
        <Chevron direction="right" />
      </button>
    </div>
  );
}
