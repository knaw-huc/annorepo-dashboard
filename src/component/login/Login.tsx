import { PropsWithChildren, useContext, useEffect, useState } from "react";
import { createOpenApiClient } from "../../client/OpenApiClient.tsx";
import { OpenApiClientContext } from "../../client/OpenApiClientProvider.tsx";
import { useConfig } from "../ConfigProvider.tsx";
import { Loading } from "../common/Loading.tsx";
import { Warning } from "../common/Warning.tsx";
import { isAuthenticatedUser, UserStatus } from "../../model/User.ts";
import { useStore } from "../../store/useStore.ts";

export function Login(props: PropsWithChildren) {
  const config = useConfig();
  const setClient = useContext(OpenApiClientContext).actions.setClient;
  const { user, setUserState } = useStore();
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserOrLogIn = async () => {
      try {
        const response = await fetch(`${config.AUTH_HOST}/oidc/status`);

        if (response.ok) {
          const update: UserStatus = await response.json();
          setUserState({ user: update });
        } else if (response.status === 401) {
          window.location.href = `${config.AUTH_HOST}/oidc/login`;
        } else {
          setError(`Unexpected status: ${response.status}`);
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : "Unknown error";
        setError(`Received error: ${msg}`);
        setUserState({ user: { authenticated: false } });
      } finally {
        setLoading(false);
      }
    };

    setClient(createOpenApiClient(config.AR_HOST, false));
    fetchUserOrLogIn();
  }, [config.AUTH_HOST, config.AR_HOST, setClient]);

  if (isLoading) {
    return <Loading />;
  } else if (error) {
    return <Warning>{error}</Warning>;
  } else if (isAuthenticatedUser(user)) {
    return <>{props.children}</>;
  } else {
    return <p>Redirecting...</p>;
  }
}
