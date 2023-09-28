'use client'

import useSWR from 'swr'
import { Room } from '@/app/_services'
import useFetcher from './useFetcher'

export default function useInspectRoom(roomId: number) {
  const fetcher = useFetcher()

  const { data, error, isLoading } = useSWR<Room, Error, string>(
    '/inspect/room/' + roomId.toString(),
    fetcher
  )

  return {
    room: data,
    error,
    isLoading,
  }
}
