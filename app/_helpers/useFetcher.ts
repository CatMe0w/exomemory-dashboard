import { useCallback } from "react";
import useExomemoryService from "../_services/useExomemoryService";

async function fetcher(url: string, authorization?: string): Promise<any> {
  const requestOptions: any = {
    method: "GET"
  };
  if (authorization) requestOptions.headers = { Authorization: authorization };
  const r = await fetch(url, requestOptions);
  if (!r.ok) {
    throw new Error(r.statusText);
  }
  if (r.headers.get("content-type")?.includes("application/json")) {
    return await r.json();
  } else {
    return await r.text();
  }
}

export default function useFetcher(): (path: string) => Promise<any> {
  const { apiUrl, authorization } = useExomemoryService();

  return useCallback(
    (path: string) => {
      const shouldFetch = Boolean(apiUrl && authorization);
      if (!shouldFetch) {
        return Promise.reject(
          new Error(`Request ${path} failed, user not logged in.`)
        );
      } else {
        const url = `${apiUrl}${path}`;
        return fetcher(url, authorization);
      }
    },
    [apiUrl, authorization]
  );
}
