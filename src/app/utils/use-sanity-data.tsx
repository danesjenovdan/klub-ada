import { client } from "@/sanity/lib/client";
import { useEffect, useState, useMemo } from "react";

type SanityError = {
  description?: string;
};
type UseSanityDataParams = {
  query: string;
  params?: any;
};
export function useSanityData({ query, params }: UseSanityDataParams) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const memoizedParams = useMemo(() => params, [JSON.stringify(params)]);

  useEffect(() => {
    client
      .fetch(query, { ...memoizedParams })
      .then((data) => {
        setData(data);
      })
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  }, [query, memoizedParams]);

  return {
    data,
    isLoading,
    error: error as SanityError | null,
  };
}
