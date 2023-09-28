'use client'

import Link from 'next/link'
import useOverview from '@/app/_data/useOverview'
import { useState } from 'react'

export default Overview

function Overview() {
  const { overview, error, isLoading } = useOverview()
  const [filter, setFilter] = useState('')

  if (error) return <>❌{error.message}</>
  if (isLoading) return <>⏳</>

  if (overview) {
    return (
      <>
        <h1>Overview</h1>
        <input
          type='text'
          placeholder='Filter room...'
          value={filter}
          onInput={(i) => setFilter(i.currentTarget.value)}
        />
        {overview.rooms.map((r) => {
          if (filter && !r.name.toLowerCase().includes(filter)) return null
          return (
            <div key={r.roomId}>
              <Link
                href={{
                  pathname: '/lookup/room',
                  query: { id: r.roomId },
                }}
              >
                {r.name}
              </Link>
              <br />
              {r.roomId}
              <br />
              {r.lastMessage.username}
              <br />
              {r.lastMessage.content}
              <br />
              {r.lastMessageTime}
              <br />
              {r.unreadCount}
              <br />
              <br />
            </div>
          )
        })}
      </>
    )
  }
}
