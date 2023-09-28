'use client'

import SearchBox from '@/app/_components/SearchBox'
import React from 'react'
import useVersion from '@/app/_data/useVersion'
import useAlertService from '@/app/_services/useAlertService'
import useExomemoryService from '@/app/_services/useExomemoryService'
import { usePathname, useRouter } from 'next/navigation'

export default function Layout({ children }: { children: React.ReactNode }) {
  // the useVersion hook is used here to check if the API is reachable/authenticated
  const { version, error, isLoading } = useVersion()
  const exomemoryService = useExomemoryService()
  const alertService = useAlertService()
  const router = useRouter()
  const pathname = usePathname()

  if (error) {
    alertService.show(error.message)
    exomemoryService.logout()
  }

  return (
    <>
      Version: {isLoading ? '⏳' : error ? '❌' : version}
      <br />
      {pathname !== '/overview' && (
        <>
          <button onClick={router.back}>Back</button>
          <br />
        </>
      )}
      <button onClick={exomemoryService.logout}>Logout</button>
      <br />
      <br />
      <SearchBox />
      {children}
    </>
  )
}
