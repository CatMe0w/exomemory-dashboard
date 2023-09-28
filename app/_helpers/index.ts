export function intOrUndefined(s: string | null): number | undefined {
  return parseInt(s ?? "") || undefined;
}

export function assembleSearchParams(params: Record<string, any>) {
  const searchParams = new URLSearchParams();
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const value = params[key];
      if (value) {
        searchParams.append(key.toLowerCase(), value.toString());
      }
    }
  }
  return searchParams;
}
