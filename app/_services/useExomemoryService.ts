'use client';

import {create} from 'zustand';
import {persist} from "zustand/middleware";
import {useRouter} from 'next/navigation';

export {useExomemoryService};
export type {File, Message, Room, Overview};

const initialState = {
  apiUrl: undefined,
  authorization: undefined,
  username: undefined,
  password: undefined,
};

const exomemoryStore = create(
  persist<IExomemoryStore>(() => initialState, {
    name: 'exomemory',
  })
);

function useExomemoryService(): IExomemoryService {
  const router = useRouter();
  const {apiUrl, authorization, username, password} = exomemoryStore();

  return {
    apiUrl,
    authorization,
    username,
    password,
    login: (apiUrl: string, username: string, password: string) => {
      let authorization = 'Basic ' + btoa(username + ':' + password);
      exomemoryStore.setState({apiUrl, authorization, username, password});
      router.replace('/overview');
    },
    logout: () => {
      exomemoryStore.setState({authorization: undefined});
      router.replace('/');
    },
  }
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
    id: string;
    username: string;
    content: string;
    files: File[];
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
    content: string;
    username: string;
  }
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
  // version?: string;
  // overview?: Overview;
  // messages?: Message[];
  // room?: Room;
}

interface IExomemoryService extends IExomemoryStore {
  // login: (apiUrl: string, username: string, password: string) => Promise<void>;
  // logout: () => Promise<void>;
  login: (apiUrl: string, username: string, password: string) => void;
  logout: () => void;
  // getVersion: () => Promise<void>;
  // getOverview: () => Promise<void>;
  // getInspectRoom: (roomId: number) => Promise<void>;
  // getSearchUsernames: (keyword: string, page?: number, timeBefore?: number, timeAfter?: number, roomId?: number) => Promise<void>;
  // getSearchMessages: (keyword: string, page?: number, timeBefore?: number, timeAfter?: number, roomId?: number) => Promise<void>;
  // getLookupUser: (id: number, page?: number, timeBefore?: number, timeAfter?: number, roomId?: number) => Promise<void>;
  // getLookupMessage: (messageId: string, pagination?: string) => Promise<void>;
  // getLookupRoom: (roomId: number, page?: number, timeBefore?: number, timeAfter?: number) => Promise<void>;
}