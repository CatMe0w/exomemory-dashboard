import type { Message as M } from "@/app/_services/useExomemoryService";
import Link from "next/link";

export default function Message({ message, showLink = true, highlight = false }: {
  message: M,
  showLink?: boolean,
  highlight?: boolean
}) {
  const content = (
    <div className={highlight ? "bg-amber-100" : ""}>
      {message.username} ({message.senderId})
      <br />
      {message.content}
      <br />
      {new Date(message.time).toLocaleString()}
      <br />
      <br />
    </div>
  );

  if (showLink) {
    return (
      <Link
        href={{
          pathname: "/lookup/message",
          query: { id: message.id }
        }}
      >
        {content}
      </Link>
    );
  } else {
    return content;
  }
}
