"use client";

import useSWR from "swr";
import { assembleSearchParams } from "@/app/_helpers";
import { Message } from "@/app/_services/useExomemoryService";
import useFetcher from "../_helpers/useFetcher";

export default function useLookupUser(
  id: number,
  page?: number,
  timeBefore?: number,
  timeAfter?: number,
  roomId?: number
) {
  const fetcher = useFetcher();

  const searchParams = assembleSearchParams({
    id,
    page,
    timeBefore,
    timeAfter,
    roomId
  });

  const { data, error, isLoading } = useSWR<Message[], Error, string>(
    "/lookup/user?" + searchParams,
    fetcher
  );

  return {
    messages: data,
    error,
    isLoading
  };
}
