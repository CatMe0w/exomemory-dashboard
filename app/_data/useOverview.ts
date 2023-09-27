'use client';

import useSWR from "swr";
import {fetcher} from "@/app/_helpers";
import {Overview, useExomemoryService} from "@/app/_services";

export {useOverview}

function useOverview() {
  const exomemoryService = useExomemoryService();
  const {apiUrl, authorization} = exomemoryService;

  const shouldFetch = Boolean(apiUrl && authorization);

  const {
    data,
    error,
    isLoading
  } = useSWR<Overview, Error, [string, string?] | null>(shouldFetch ? [apiUrl + '/overview', authorization] : null,
    ([url, authorization]) => fetcher(url, authorization));

  return {
    overview: data,
    error: shouldFetch ? error : Error('Not logged in:overview'),
    isLoading,
  }
}