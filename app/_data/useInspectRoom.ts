"use client";

import useSWRImmutable from "swr/immutable";
import { Room } from "@/app/_services/useExomemoryService";
import useFetcher from "../_helpers/useFetcher";

export default function useInspectRoom(roomId: number) {
  const fetcher = useFetcher();

  const { data, error, isLoading } = useSWRImmutable<Room, Error, string>(
    "/inspect/room/" + roomId.toString(),
    fetcher
  );

  return {
    room: data,
    error,
    isLoading
  };
}
