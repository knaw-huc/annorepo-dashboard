import { PropsWithChildren, useEffect } from "react";
import { useStore } from "../../store/useStore.ts";
import { useConfig } from "../ConfigProvider.tsx";
import { keys } from "lodash";
import { orThrow } from "../../util/orThrow.ts";
import { getParam } from "./util/getParam.ts";
import { HOST } from "../common/UrlParam.ts";

export function HostParam(props: PropsWithChildren<object>) {
  const { selectedHost, setHostState } = useStore();
  const { AR_HOSTS } = useConfig();

  useEffect(() => {
    if (selectedHost) {
      return;
    }
    const hostKeyFromUrl = getParam(HOST);
    const hosts = keys(AR_HOSTS);
    const selectedHostKey = hostKeyFromUrl ?? hosts[0] ?? orThrow("No hosts");
    console.log("useEffect", {
      AR_HOSTS,
      hostKeyFromUrl,
      hosts,
      selectedHostKey,
    });
    setHostState({ selectedHost: selectedHostKey });
  }, [AR_HOSTS]);

  return <>{props.children}</>;
}
