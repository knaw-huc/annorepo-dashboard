import { HOST_PARAM_KEY } from "./HOST_PARAM_KEY.ts";

export function getHostParam(): string | undefined {
  const params = new URLSearchParams(window.location.search);
  const encoded = params.get(HOST_PARAM_KEY);
  if (encoded) {
    try {
      return decodeURIComponent(encoded);
    } catch (cause) {
      throw new Error(`Could not decode: ${encoded}`, { cause });
    }
  }
}
