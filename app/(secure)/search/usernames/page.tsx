'use client';

import {useEffect} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {intOrUndefined} from "@/app/_helpers";
import Message from '@/app/_components/Message'
import useSearchUsernames from '@/app/_data/useSearchUsernames'

export default SearchUsernames;

function SearchUsernames() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const keyword = searchParams.get('keyword');
  const page = intOrUndefined(searchParams.get('page'));
  const timeBefore = intOrUndefined(searchParams.get('timebefore'));
  const timeAfter = intOrUndefined(searchParams.get('timeafter'));
  const roomId = intOrUndefined(searchParams.get('roomid'));

  useEffect(() => {
    if (!keyword) {
      router.back();
      return;
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const {messages, error, isLoading} = useSearchUsernames(keyword!, page, timeBefore, timeAfter, roomId);

  if (error) return <>❌</>;
  if (isLoading) return <>⏳</>;

  if (messages) {
    return (
      <>
        <h1>Search Usernames</h1>
        {messages.map((m) =>
          <Message message={m} key={m.id}></Message>
        )}
      </>
    );
  }
}