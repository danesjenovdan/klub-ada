"use client";

import {
  DATA_SCENARIOS,
  DataScenario,
  setDataScenario,
  useDataScenario,
} from "@/src/app/utils/data-scenario";

const LABELS: Record<DataScenario, string> = {
  demo: "Demo data",
  worst: "Worst case",
  empty: "Empty",
  one: "One",
  many: "Many",
};

/**
 * Dev-only segmented control that swaps the Sanity content of every window
 * for a stress-test fixture (see `fixtures.ts`). Chrome, not design: plain on
 * purpose. Rendered by the layout only while running the dev server.
 */
export function DataToggle() {
  const scenario = useDataScenario();

  return (
    <div
      role="radiogroup"
      aria-label="Data"
      className="fixed bottom-2 left-1/2 z-[200] flex -translate-x-1/2 gap-0.5 rounded-full bg-[#d4d4d4] p-0.5 font-[system-ui] text-[11px] leading-none text-[#222] shadow"
    >
      {DATA_SCENARIOS.map((value) => (
        <button
          key={value}
          type="button"
          role="radio"
          aria-checked={scenario === value}
          onClick={() => setDataScenario(value)}
          className={`whitespace-nowrap rounded-full px-2 py-1.5 ${
            scenario === value ? "bg-white shadow-sm" : ""
          }`}
        >
          {LABELS[value]}
        </button>
      ))}
    </div>
  );
}
