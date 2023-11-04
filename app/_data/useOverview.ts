"use client";

import useSWR from "swr";
import { Overview } from "@/app/_services/useExomemoryService";
import useFetcher from "../_helpers/useFetcher";

export default function useOverview() {
  const fetcher = useFetcher();

  const { data, error, isLoading, isValidating } = useSWR<Overview, Error, string>(
    "/overview",
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  );

  return {
    overview: data,
    error,
    isLoading: isLoading || isValidating
  };
}
