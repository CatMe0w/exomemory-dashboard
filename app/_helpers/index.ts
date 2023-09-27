export function intOrUndefined(s: string | null): number | undefined {
  return parseInt(s ?? '') || undefined;
}

export function assembleSearchParams(...args: [key: string, value: any][]) {
  const searchParams = new URLSearchParams();
  for (const arg of args) {
    const key = arg[0].toLowerCase();
    const value = arg[1];
    if (value) {
      searchParams.append(key, value.toString());
    }
  }
  return searchParams;
}

export async function fetcher(url: string, authorization?: string) {
  const requestOptions: any = {
    method: 'GET',
  }
  if (authorization) requestOptions.headers = {'Authorization': authorization};
  const r = await fetch(url, requestOptions);
  if (!r.ok) {
    throw new Error(r.statusText);
  }
  if (r.headers.get('content-type')?.includes('application/json')) {
    return await r.json();
  } else {
    return await r.text();
  }
}