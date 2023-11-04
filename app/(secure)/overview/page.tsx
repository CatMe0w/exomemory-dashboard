"use client";

import useOverview from "@/app/_data/useOverview";
import { useState } from "react";
import Room from "@/app/_components/Room";

export default Overview;

function Overview() {
  const { overview, error, isLoading } = useOverview();
  const [filter, setFilter] = useState("");

  if (error) return <>❌{error.message}</>;
  if (isLoading) return <>⏳</>;

  if (overview) {
    return (
      <>
        <h1>Overview</h1>
        <input
          type="text"
          placeholder="Filter room..."
          value={filter}
          onInput={(i) => setFilter(i.currentTarget.value)}
        /><br/>
        {overview.rooms.map((r) => {
          if (filter && !r.name.toLowerCase().includes(filter) && !r.roomId.toString().includes(filter))
            return null;
          return <Room room={r} key={r.roomId}></Room>;
        })}
      </>
    );
  }
}
