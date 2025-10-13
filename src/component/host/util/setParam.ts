import { UrlParam } from "../../common/UrlParam.ts";
import { Any } from "../../../model/Any.ts";

export function setParam(key: UrlParam, update: Any) {
  if (!key) {
    return;
  }
  const params = new URLSearchParams(window.location.search);
  const currentValue = params.get(key);
  const newValue = encodeURIComponent(update);

  if (currentValue !== newValue) {
    params.set(key, newValue);
    const pathname = window.location.pathname;
    window.location.href = `${pathname}?${params.toString()}`;
  }
}
