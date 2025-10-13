export const HOST = "host" as const;
export const NEXT = "n" as const;

export const params = [HOST, NEXT] as const;
export type UrlParam = (typeof params)[number];
