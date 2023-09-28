'use client'

import useSWR from 'swr'
import { Overview } from '@/app/_services'
import useFetcher from './useFetcher'

export default function useOverview() {
  const fetcher = useFetcher()

  const { data, error, isLoading } = useSWR<Overview, Error, string>(
    '/overview',
    fetcher
  )

  return {
    overview: data,
    error,
    isLoading,
  }
}
