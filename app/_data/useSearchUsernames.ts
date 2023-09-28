'use client'

import useSWR from 'swr'
import { assembleSearchParams } from '@/app/_helpers'
import useFetcher from './useFetcher'
import { Message } from '@/app/_services'

export default function useSearchUsernames(
  keyword: string,
  page?: number,
  timeBefore?: number,
  timeAfter?: number,
  roomId?: number
) {
  const fetcher = useFetcher()

  const searchParams = assembleSearchParams({
    keyword,
    page,
    timeBefore,
    timeAfter,
    roomId,
  })

  const { data, error, isLoading } = useSWR<Message[], Error, string>(
    '/search/usernames?' + searchParams,
    fetcher
  )

  return {
    messages: data,
    error,
    isLoading,
  }
}
