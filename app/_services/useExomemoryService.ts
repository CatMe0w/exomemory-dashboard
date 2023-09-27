'use client';

import {create} from 'zustand';
import { useRouter } from 'next/navigation';
// import {assembleSearchParams, useFetch} from "@/app/_helpers";
// import {useAlertService} from "@/app/_services/useAlertService";

export {useExomemoryService};
export type {File, Message, Room, Overview};

const isBrowser = typeof window !== "undefined";

function clearLocalStorage() {
  if (isBrowser) {
    localStorage.removeItem('apiUrl');
    localStorage.removeItem('authorization');
  }
}

const initialState = {
  apiUrl: isBrowser ? localStorage.getItem('apiUrl') ?? undefined : undefined,
  authorization: isBrowser ? localStorage.getItem('authorization') ?? undefined : undefined,
  username: isBrowser ? localStorage.getItem('username') ?? undefined : undefined,
  password: isBrowser ? localStorage.getItem('password') ?? undefined : undefined,
  // version: undefined,
  // overview: undefined,
  // messages: undefined,
  // room: undefined,
};

const exomemoryStore = create<IExomemoryStore>(() => initialState);

function useExomemoryService(): IExomemoryService {
  // const alertService = useAlertService();
  // const fetch = useFetch();
  const router = useRouter();
  const {apiUrl, authorization, username, password} = exomemoryStore();

  // function ensureLogin() {
  //   if (!apiUrl || !authorization) {
  //     clearLocalStorage();
  //     router.push('/');
  //     return false;
  //   }
  //   return true;
  // }

  // function clearOverview() {
  //   exomemoryStore.setState({ overview: undefined });
  // }
  //
  // function clearMessages() {
  //   exomemoryStore.setState({ messages: undefined });
  // }
  //
  // function clearRoom() {
  //   exomemoryStore.setState({ room: undefined });
  // }

  return {
    apiUrl,
    authorization,
    username,
    password,
    // version,
    // overview,
    // messages,
    // room,
    login: (apiUrl: string, username: string, password: string) => {
      let authorization = 'Basic ' + btoa(username + ':' + password);
      exomemoryStore.setState({...initialState, apiUrl, authorization, username, password});
      if (isBrowser) {
        localStorage.setItem('apiUrl', apiUrl);
        localStorage.setItem('authorization', authorization);
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
      }
      router.replace('/overview');
    },
    logout: () => {
      // clearLocalStorage();
      if (isBrowser) localStorage.removeItem('authorization');
      exomemoryStore.setState({...initialState});
      router.replace('/');
    },
    // login: async (apiUrl: string, username: string, password: string) => {
    //   try {
    //     let authorization = 'Basic ' + btoa(username + ':' + password);
    //     exomemoryStore.setState({ ...initialState, apiUrl, authorization });
    //     exomemoryStore.setState({ version: await fetch.get(apiUrl + '/version', authorization) });
    //     if (isBrowser) {
    //       localStorage.setItem('apiUrl', apiUrl);
    //       localStorage.setItem('authorization', authorization);
    //     }
    //     router.push('/overview');
    //   } catch (error) {
    //     alertService.show(String(error));
    //     clearLocalStorage();
    //     exomemoryStore.setState({ ...initialState });
    //   }
    // },
    // logout: async () => {
    //   clearLocalStorage();
    //   exomemoryStore.setState({ ...initialState });
    //   router.push('/');
    // },
    // getOverview: async () => {
    //   if (!ensureLogin()) return;
    //   clearOverview();
    //
    //   try {
    //     exomemoryStore.setState({overview: await fetch.get(apiUrl + '/overview', authorization)});
    //   } catch (error) {
    //     alertService.show('服务器离线');
    //   }
    // },
    // getInspectRoom: async (roomId: number) => {
    //   if (!ensureLogin()) return;
    //   clearRoom();
    //
    //   try {
    //     exomemoryStore.setState({room: await fetch.get(apiUrl + '/inspect/room/' + roomId, authorization)});
    //   } catch (_) {
    //     // swallow this error, getInspectRoom failing is not fatal
    //   }
    // },
    // getSearchUsernames: async (keyword: string, page?: number, timeBefore?: number, timeAfter?: number, roomId?: number) => {
    //   if (!ensureLogin()) return;
    //   clearMessages();
    //
    //   const searchParams = assembleSearchParams(
    //     ['keyword', keyword],
    //     ['page', page],
    //     ['timeBefore', timeBefore],
    //     ['timeAfter', timeAfter],
    //     ['roomId', roomId],
    //   );
    //
    //   try {
    //     exomemoryStore.setState({messages: await fetch.get(apiUrl + '/search/usernames?' + searchParams, authorization)});
    //   } catch (error) {
    //     alertService.show('服务器离线');
    //   }
    // },
    // getSearchMessages: async (keyword: string, page?: number, timeBefore?: number, timeAfter?: number, roomId?: number) => {
    //   if (!ensureLogin()) return;
    //   clearMessages();
    //
    //   const searchParams = assembleSearchParams(
    //     ['keyword', keyword],
    //     ['page', page],
    //     ['timeBefore', timeBefore],
    //     ['timeAfter', timeAfter],
    //     ['roomId', roomId],
    //   );
    //
    //   try {
    //     exomemoryStore.setState({messages: await fetch.get(apiUrl + '/search/messages?' + searchParams, authorization)});
    //   } catch (error) {
    //     alertService.show('服务器离线');
    //   }
    // },
    // getLookupUser: async (id: number, page?: number, timeBefore?: number, timeAfter?: number, roomId?: number) => {
    //   if (!ensureLogin()) return;
    //   clearMessages();
    //
    //   const searchParams = assembleSearchParams(
    //     ['id', id],
    //     ['page', page],
    //     ['timeBefore', timeBefore],
    //     ['timeAfter', timeAfter],
    //     ['roomId', roomId],
    //   );
    //
    //   try {
    //     exomemoryStore.setState({messages: await fetch.get(apiUrl + '/lookup/user?' + searchParams, authorization)});
    //   } catch (error) {
    //     alertService.show('服务器离线');
    //   }
    // },
    // getLookupMessage: async (messageId: string, pagination?: string) => {
    //   if (!ensureLogin()) return;
    //   clearMessages();
    //
    //   const searchParams = assembleSearchParams(
    //     ['messageId', messageId],
    //     ['pagination', pagination],
    //   );
    //
    //   try {
    //     exomemoryStore.setState({messages: await fetch.get(apiUrl + '/lookup/message?' + searchParams, authorization)});
    //   } catch (error) {
    //     alertService.show('服务器离线');
    //   }
    // },
    // getLookupRoom: async (roomId: number, page?: number, timeBefore?: number, timeAfter?: number) => {
    //   if (!ensureLogin()) return;
    //   clearMessages();
    //
    //   const searchParams = assembleSearchParams(
    //     ['id', roomId],
    //     ['page', page],
    //     ['timeBefore', timeBefore],
    //     ['timeAfter', timeAfter],
    //   );
    //
    //   try {
    //     exomemoryStore.setState({messages: await fetch.get(apiUrl + '/lookup/room?' + searchParams, authorization)});
    //   } catch (error) {
    //     alertService.show('服务器离线');
    //   }
    // }
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