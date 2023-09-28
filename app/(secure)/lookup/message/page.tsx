"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Message from "@/app/_components/Message";
import useLookupMessage from "@/app/_data/useLookupMessage";

export default LookupMessage;

function LookupMessage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const messageId = searchParams.get("id");
  const pagination = searchParams.get("pagination") ?? undefined;

  useEffect(() => {
    if (!messageId) {
      router.back();
      return;
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const { messages, error, isLoading } = useLookupMessage(messageId!, pagination);

  if (error) return <>❌</>;
  if (isLoading) return <>⏳</>;

  if (messages) {
    return (
      <>
        <h1>Lookup Message</h1>
        {messages.map((m) =>
          <Message message={m} key={m.id}></Message>
        )}
      </>
    );
  }
}