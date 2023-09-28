"use client";

import useSWR from "swr";
import { assembleSearchParams } from "@/app/_helpers";
import useFetcher from "../_helpers/useFetcher";
import { Message } from "@/app/_services/useExomemoryService";

export default function useLookupMessage(
  messageId: string,
  pagination?: string
) {
  const fetcher = useFetcher();

  const searchParams = assembleSearchParams({
    id: messageId,
    pagination
  });

  const { data, error, isLoading } = useSWR<Message[], Error, string>(
    "/lookup/message?" + searchParams,
    fetcher
  );

  return {
    messages: data,
    error,
    isLoading
  };
}
