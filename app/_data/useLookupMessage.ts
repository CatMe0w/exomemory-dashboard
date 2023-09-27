'use client';

import useSWR from "swr";
import {assembleSearchParams, fetcher} from "@/app/_helpers";
import {Message, useExomemoryService} from "@/app/_services";

export {useLookupMessage}

function useLookupMessage(messageId: string, pagination?: string) {
  const exomemoryService = useExomemoryService();
  const {apiUrl, authorization} = exomemoryService;

  const shouldFetch = Boolean(apiUrl && authorization);

  const searchParams = assembleSearchParams(
    ['id', messageId],
    ['pagination', pagination],
  );

  const {
    data,
    error,
    isLoading
  } = useSWR<Message[], Error, [string, string?] | null>(shouldFetch ? [apiUrl + '/lookup/message?' + searchParams, authorization] : null,
    ([url, authorization]) => fetcher(url, authorization));

  return {
    messages: data,
    error: shouldFetch ? error : Error('Not logged in'),
    isLoading,
  }
}