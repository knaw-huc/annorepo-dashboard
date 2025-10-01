import { HOST_PARAM_KEY } from "./HOST_PARAM_KEY.ts";

export function setHostParam(host: string) {
  if (!host) {
    return;
  }
  const params = new URLSearchParams(window.location.search);
  const currentHost = params.get(HOST_PARAM_KEY);
  const newHost = encodeURIComponent(host);

  if (currentHost !== newHost) {
    params.set(HOST_PARAM_KEY, newHost);
    const pathname = window.location.pathname;
    window.location.href = `${pathname}?${params.toString()}`;
  }
}
