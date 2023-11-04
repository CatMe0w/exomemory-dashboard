"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { intOrUndefined } from "@/app/_helpers";
import Message from "@/app/_components/Message";
import RoomHeader from "@/app/_components/RoomHeader";
import useLookupRoom from "@/app/_data/useLookupRoom";

export default LookupRoom;

function LookupRoom() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const roomId = intOrUndefined(searchParams.get("id"));
  const page = intOrUndefined(searchParams.get("page"));
  const timeBefore = intOrUndefined(searchParams.get("timebefore"));
  const timeAfter = intOrUndefined(searchParams.get("timeafter"));

  useEffect(() => {
    if (!roomId) {
      router.back();
      return;
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const { messages, error, isLoading } = useLookupRoom(
    roomId!,
    page,
    timeBefore,
    timeAfter
  );

  if (error) return <>❌</>;
  if (isLoading) return <>⏳</>;

  if (messages) {
    return (
      <>
        <h1>Lookup Room</h1>
        <RoomHeader roomId={roomId!} />
        <br />
        <br />
        {messages.map((m) => (
          <Message message={m} showLink={false} key={m.id}></Message>
        ))}
      </>
    );
  }
}
