'use client';

import useSWR from "swr";
import {fetcher} from "@/app/_helpers";
import {Room, useExomemoryService} from "@/app/_services";

export {useInspectRoom}

function useInspectRoom(roomId: number) {
  const exomemoryService = useExomemoryService();
  const {apiUrl, authorization} = exomemoryService;

  const shouldFetch = Boolean(apiUrl && authorization);

  const {
    data,
    error,
    isLoading
  } = useSWR<Room, Error, [string, string?] | null>(shouldFetch ? [apiUrl + '/inspect/room/' + roomId.toString(), authorization] : null,
    ([url, authorization]) => fetcher(url, authorization));

  return {
    room: data,
    error: shouldFetch ? error : Error('Not logged in'),
    isLoading,
  }
}