'use client'

import useSWR from 'swr'
import { assembleSearchParams } from '@/app/_helpers'
import { Message } from '@/app/_services'
import useFetcher from './useFetcher'

export default function useLookupRoom(
  roomId: number,
  page?: number,
  timeBefore?: number,
  timeAfter?: number
) {
  const fetcher = useFetcher()

  const searchParams = assembleSearchParams({
    id: roomId,
    page,
    timeBefore,
    timeAfter,
  })

  const { data, error, isLoading } = useSWR<Message[], Error, string>(
    '/lookup/room?' + searchParams,
    fetcher
  )

  return {
    messages: data,
    error,
    isLoading,
  }
}
