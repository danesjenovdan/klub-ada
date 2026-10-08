import { client } from "@/sanity/lib/client";
import { useEffect, useState, useMemo } from "react";
import { DataScenario, useDataScenario } from "./data-scenario";

type SanityError = {
  description?: string;
};
/**
 * Stand-in results for the dev-only data scenarios (see `data-scenario.ts`),
 * either a value or a function of the query params. A scenario without one
 * falls through to the real query.
 */
export type SanityFixtures = Partial<
  Record<Exclude<DataScenario, "demo">, unknown | ((params: any) => unknown)>
>;
type UseSanityDataParams = {
  query: string;
  params?: any;
  fixtures?: SanityFixtures;
};
export function useSanityData({ query, params, fixtures }: UseSanityDataParams) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const scenario = useDataScenario();

  const memoizedParams = useMemo(() => params, [JSON.stringify(params)]);

  useEffect(() => {
    let isCancelled = false;
    setIsLoading(true);

    const fixture = scenario === "demo" ? undefined : fixtures?.[scenario];
    if (fixture !== undefined) {
      // Async like a fetch, so the page goes through its loading state.
      const timer = window.setTimeout(() => {
        setData(
          typeof fixture === "function" ? fixture(memoizedParams) : fixture,
        );
        setIsLoading(false);
      });
      return () => window.clearTimeout(timer);
    }

    client
      .fetch(query, { ...memoizedParams })
      .then((data) => {
        if (!isCancelled) setData(data);
      })
      .catch((error) => {
        if (!isCancelled) setError(error);
      })
      .finally(() => {
        if (!isCancelled) setIsLoading(false);
      });
    return () => {
      isCancelled = true;
    };
    // `fixtures` is a module-level constant wherever it is passed.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, memoizedParams, scenario]);

  return {
    data,
    isLoading,
    error: error as SanityError | null,
  };
}
