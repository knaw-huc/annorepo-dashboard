import { UrlParam } from "../../common/UrlParam.ts";

export function getParam(param: UrlParam): string | undefined {
  const params = new URLSearchParams(window.location.search);
  const encoded = params.get(param);
  if (encoded) {
    try {
      return decodeURIComponent(encoded);
    } catch (cause) {
      throw new Error(`Could not decode: ${encoded}`, { cause });
    }
  }
}
