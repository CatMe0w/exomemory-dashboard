'use client';

import useInspectRoom from "@/app/_data/useInspectRoom";

export default function RoomHeader({ roomId }: { roomId: number }) {
  // const pathname = usePathname();
  // const exomemoryService = useExomemoryService();
  // const room = exomemoryService.room;

  // useEffect(() => {
  //   void exomemoryService.getInspectRoom(roomId);
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const { room, error, isLoading } = useInspectRoom(roomId)

  if (error) return <>❌</>
  if (isLoading) return <>⏳</>

  if (room) {
    return <>{room.name}</>
  } else {
    return <>⏳</>
  }
}