"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useRouter } from "next/navigation";

export type { File, Message, Room, Overview };

const initialState = {
  apiUrl: undefined,
  authorization: undefined,
  username: undefined,
  password: undefined
};

const exomemoryStore = create(
  persist<IExomemoryStore>(() => initialState, {
    name: "exomemory"
  })
);

export default function useExomemoryService(): IExomemoryService {
  const router = useRouter();
  const { apiUrl, authorization, username, password } = exomemoryStore();

  return {
    apiUrl,
    authorization,
    username,
    password,
    login: (apiUrl: string, username: string, password: string) => {
      let authorization = "Basic " + Buffer.from(username + ":" + password).toString('base64');
      exomemoryStore.setState({ apiUrl, authorization, username, password });
      router.replace("/overview");
    },
    logout: () => {
      exomemoryStore.setState({ authorization: undefined });
      router.replace("/");
    }
  };
}

interface File {
  type: string;
  size: number;
  url: string;
  name: string;
  fid: string;
}

interface Message {
  id: string;
  senderId: string;
  username: string;
  content: string;
  code: string;
  role: string;
  files: File[];
  time: string;
  replyMessage: {
    id: string
    username: string
    content: string
    files: File[]
  };
  isDeleted: boolean;
  isSystemMessage: boolean;
  isSelfDestruct: boolean;
  title: string;
  roomId: number;
}

interface Room {
  roomId: number;
  name: string;
  unreadCount: number;
  lastMessageTime: number;
  lastMessage: {
    content: string
    username: string
  };
}

interface Overview {
  rooms: Room[];
  messages: Message[];
}

interface IExomemoryStore {
  apiUrl?: string;
  authorization?: string;
  username?: string;
  password?: string;
}

interface IExomemoryService extends IExomemoryStore {
  login: (apiUrl: string, username: string, password: string) => void;
  logout: () => void;
}
