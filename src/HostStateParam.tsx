import { PropsWithChildren, useEffect } from "react";
import { useStore } from "./store/useStore.ts";
import { useConfig } from "./component/ConfigProvider.tsx";
import { keys } from "lodash";
import { orThrow } from "./util/orThrow.ts";

const HOST_PARAM_KEY = "host";

export function HostStateParam(props: PropsWithChildren<object>) {
  const { setHostState, selectedHost } = useStore();
  const { AR_HOSTS } = useConfig();

  useEffect(() => {
    if (selectedHost) {
      return;
    }
    const selectedHostKey =
      getHostKeyFromUrl() ??
      keys(AR_HOSTS)[0] ??
      orThrow("No hosts configured");
    setHostState({ selectedHost: selectedHostKey });
  }, [AR_HOSTS]);

  useEffect(() => {
    setHostInUrl(selectedHost);
  }, [selectedHost]);

  function getHostKeyFromUrl(): string | undefined {
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

  return <>{props.children}</>;
}

function setHostInUrl(host: string) {
  console.log("setHostInUrl", host);
  if (!host) {
    return;
  }
  const params = new URLSearchParams(window.location.search);
  const currentHost = params.get(HOST_PARAM_KEY);
  const newHost = encodeURIComponent(host);

  // Only update if the value has changed
  if (currentHost !== newHost) {
    params.set(HOST_PARAM_KEY, newHost);
    const pathname = window.location.pathname;
    window.location.href = `${pathname}?${params.toString()}`;
  }
}
