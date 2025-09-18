import { PropsWithChildren, useEffect } from "react";
import { useStore } from "./store/useStore.ts";
import { useConfig } from "./component/ConfigProvider.tsx";
import { keys } from "lodash";
import { orThrow } from "./util/orThrow.ts";

const HOST_PARAM_KEY = "host";

export function InitHost(props: PropsWithChildren<object>) {
  const { setHostState } = useStore();
  const { AR_HOSTS } = useConfig();

  useEffect(() => {
    const selectedHostKey =
      getHostFromUrl() ?? keys(AR_HOSTS)[0] ?? orThrow("No hosts configured");
    const selectedHost = AR_HOSTS[selectedHostKey];
    console.log(`Using host:`, { selectedHostKey, selectedHost });
    setHostState({ selectedHost });
    setHostInUrl(selectedHostKey);
  }, [AR_HOSTS]);

  return <>{props.children}</>;
}

function getHostFromUrl(): string | undefined {
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

function setHostInUrl(host: string) {
  const params = new URLSearchParams(window.location.search);
  params.set(HOST_PARAM_KEY, encodeURIComponent(host));
  const pathname = window.location.pathname;
  const newUrl = `${pathname}?${params.toString()}`;
  window.history.replaceState({}, "", newUrl);
}
