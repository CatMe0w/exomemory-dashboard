"use client";

import useSWRImmutable from "swr/immutable";
import useFetcher from "../_helpers/useFetcher";

export default function useVersion() {
  const fetcher = useFetcher();

  const { data, error, isLoading } = useSWRImmutable<string, Error, string>(
    "/version",
    fetcher
  );

  return {
    version: data,
    error,
    isLoading
  };
}
