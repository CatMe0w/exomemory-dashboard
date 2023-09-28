'use client'

import useSWR from 'swr'
import { assembleSearchParams } from '@/app/_helpers'
import { Message } from '@/app/_services'
import useFetcher from './useFetcher'

export default function useSearchMessages(
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
    '/search/messages?' + searchParams,
    fetcher
  )

  return {
    messages: data,
    error,
    isLoading,
  }
}
