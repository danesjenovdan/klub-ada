import { useSyncExternalStore } from "react";

/**
 * Dev-only switch between the real Sanity content and stress-test fixtures,
 * kept in the `?data=` URL param so a reload keeps it. In production it is
 * always "demo" (the real data) and the URL is never read.
 */
export const DATA_SCENARIOS = ["demo", "worst", "empty", "one", "many"] as const;
export type DataScenario = (typeof DATA_SCENARIOS)[number];

const EVENT = "data-scenario-change";
const isDev = process.env.NODE_ENV === "development";

function read(): DataScenario {
  if (!isDev) return "demo";
  const value = new URLSearchParams(window.location.search).get("data");
  return DATA_SCENARIOS.includes(value as DataScenario)
    ? (value as DataScenario)
    : "demo";
}

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  window.addEventListener("popstate", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("popstate", onChange);
  };
}

export function setDataScenario(scenario: DataScenario) {
  const url = new URL(window.location.href);
  if (scenario === "demo") url.searchParams.delete("data");
  else url.searchParams.set("data", scenario);
  window.history.replaceState(window.history.state, "", url);
  window.dispatchEvent(new Event(EVENT));
}

export function useDataScenario(): DataScenario {
  return useSyncExternalStore(subscribe, read, () => "demo");
}
