'use client';

import useSWR from "swr";
import {assembleSearchParams, fetcher} from "@/app/_helpers";
import {Message, useExomemoryService} from "@/app/_services";

export {useLookupUser}

function useLookupUser(id: number, page?: number, timeBefore?: number, timeAfter?: number, roomId?: number) {
  const exomemoryService = useExomemoryService();
  const {apiUrl, authorization} = exomemoryService;

  const shouldFetch = Boolean(apiUrl && authorization);

  const searchParams = assembleSearchParams(
    ['id', id],
    ['page', page],
    ['timeBefore', timeBefore],
    ['timeAfter', timeAfter],
    ['roomId', roomId]
  );

  const {
    data,
    error,
    isLoading
  } = useSWR<Message[], Error, [string, string?] | null>(shouldFetch ? [apiUrl + '/lookup/user?' + searchParams, authorization] : null,
    ([url, authorization]) => fetcher(url, authorization));

  return {
    messages: data,
    error: shouldFetch ? error : Error('Not logged in'),
    isLoading,
  }
}