import type { Room as R } from "@/app/_services/useExomemoryService";
import Link from "next/link";

export default function Room({ room }: { room: R }) {
  return (
    <Link
      href={{
        pathname: "/lookup/room",
        query: { id: room.roomId }
      }}
    >
      {room.name} ({room.roomId})
      <br />
      {room.lastMessage.username}: {room.lastMessage.content}
      <br />
      {new Date(room.lastMessageTime).toLocaleString()}
      <br />
      <br />
    </Link>
  );
}
