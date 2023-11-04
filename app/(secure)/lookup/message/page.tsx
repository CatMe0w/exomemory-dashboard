"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Message from "@/app/_components/Message";
import useLookupMessage from "@/app/_data/useLookupMessage";

export default LookupMessage;

function LookupMessage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const messageId = searchParams.get("id");

  const { messages, error, isLoading } = useLookupMessage(messageId!);

  const currentMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!messageId) {
      router.back();
      return;
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    currentMessageRef.current?.scrollIntoView({ block: "center" });
  }, [messages]);

  if (error) return <>❌</>;
  if (isLoading) return <>⏳</>;

  if (messages) {
    return (
      <>
        <h1>Lookup Message</h1>
        {messages.map((m) =>
          m.id === messageId
            ? <div ref={currentMessageRef} key={m.id}><Message message={m} showLink={false} highlight={true}></Message></div>
            : <Message message={m} showLink={false} key={m.id}></Message>
        )}
      </>
    );
  }
}