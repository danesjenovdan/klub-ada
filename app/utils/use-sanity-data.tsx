import { client } from "@/sanity/lib/client";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    client
      .fetch(query, { ...params })
      .then((data) => {
        setData(data);
      })
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  }, [params]);

  return {
    data,
    isLoading,
    error: error as SanityError | null,
  };
}
