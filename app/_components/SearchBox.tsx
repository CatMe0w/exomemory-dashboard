"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { assembleSearchParams } from "@/app/_helpers";

export default function SearchBox() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [timeBefore, setTimeBefore] = useState("");
  const [timeAfter, setTimeAfter] = useState("");
  const [roomId, setRoomId] = useState("");

  return (
    <>
      <input
        type="text"
        placeholder="Search..."
        value={keyword}
        onInput={(i) => setKeyword(i.currentTarget.value)}
      />
      <br />
      <input
        type="datetime-local"
        placeholder="Time before..."
        value={timeBefore}
        onInput={(i) => setTimeBefore(i.currentTarget.value)}
      />
      <br />
      <input
        type="datetime-local"
        placeholder="Time after..."
        value={timeAfter}
        onInput={(i) => setTimeAfter(i.currentTarget.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Search in this room"
        value={roomId}
        onInput={(i) => setRoomId(i.currentTarget.value)}
      />
      <br />
      <button
        onClick={() =>
          router.push(
            "/search/messages?" +
            assembleSearchParams({
              keyword,
              timeBefore: new Date(timeBefore).getTime(),
              timeAfter: new Date(timeAfter).getTime(),
              roomId
            })
          )
        }
      >
        Search messages
      </button>
      <br />
      <button
        onClick={() =>
          router.push(
            "/search/usernames?" +
            assembleSearchParams({
              keyword,
              timeBefore: new Date(timeBefore).getTime(),
              timeAfter: new Date(timeAfter).getTime(),
              roomId
            })
          )
        }
      >
        Search usernames
      </button>
      <br />
      <button
        onClick={() =>
          router.push(
            "/lookup/user?" +
            assembleSearchParams({
              keyword,
              timeBefore: new Date(timeBefore).getTime(),
              timeAfter: new Date(timeAfter).getTime(),
              roomId
            })
          )
        }
      >
        Lookup this user
      </button>
      <br />
      <br />
    </>
  );
}
