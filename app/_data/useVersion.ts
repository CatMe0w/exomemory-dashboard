'use client';

import useSWR from "swr";
import {fetcher} from "@/app/_helpers";
import {useExomemoryService} from "@/app/_services";

export {useVersion}

function useVersion() {
  const exomemoryService = useExomemoryService();
  const {apiUrl, authorization} = exomemoryService;

  const shouldFetch = Boolean(apiUrl && authorization);

  const {
    data,
    error,
    isLoading
  } = useSWR<string, Error, [string, string?] | null>(shouldFetch ? [apiUrl + '/version', authorization] : null,
    ([url, authorization]) => fetcher(url, authorization));

  return {
    version: data,
    error: shouldFetch ? error : Error('Not logged in:version'),
    isLoading,
  }
}