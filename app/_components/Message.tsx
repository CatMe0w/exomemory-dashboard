import type { Message as M } from '@/app/_services/useExomemoryService'

export default function Message({ message }: { message: M }) {
  return (
    <>
      {message.username}
      <br />
      {message.content}
      <br />
      {new Date(message.time).toLocaleString()}
      <br />
      <br />
    </>
  )
}
