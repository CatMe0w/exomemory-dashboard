'use client';

import {useEffect} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {intOrUndefined} from "@/app/_helpers";
import Message from "@/app/_components/Message";
import useLookupUser from '@/app/_data/useLookupUser'

export default LookupUser;

function LookupUser() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const id = intOrUndefined(searchParams.get('id'));
  const page = intOrUndefined(searchParams.get('page'));
  const timeBefore = intOrUndefined(searchParams.get('timebefore'));
  const timeAfter = intOrUndefined(searchParams.get('timeafter'));
  const roomId = intOrUndefined(searchParams.get('roomid'));

  useEffect(() => {
    if (!id) {
      router.back();
      return;
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const {messages, error, isLoading} = useLookupUser(id!, page, timeBefore, timeAfter, roomId);

  if (error) return <>❌</>;
  if (isLoading) return <>⏳</>;

  if (messages) {
    return (
      <>
        <h1>Lookup User</h1>
        {messages.map((m) =>
          <Message message={m} key={m.id}></Message>
        )}
      </>
    );
  }
}