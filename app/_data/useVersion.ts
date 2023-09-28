"use client";

import useSWR from "swr";
import useFetcher from "../_helpers/useFetcher";

export default function useVersion() {
  const fetcher = useFetcher();

  const { data, error, isLoading } = useSWR<string, Error, string>(
    "/version",
    fetcher
  );

  return {
    version: data,
    error,
    isLoading
  };
}
