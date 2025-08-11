import { PropsWithChildren, useContext, useEffect, useState } from "react";
import { createOpenApiClient } from "../../client/OpenApiClient.tsx";
import { OpenApiClientContext } from "../../client/OpenApiClientProvider.tsx";
import { useConfig } from "../ConfigProvider.tsx";
import { Loading } from "../common/Loading.tsx";
import { Warning } from "../common/Warning.tsx";

export function Login(props: PropsWithChildren) {
  const config = useConfig();
  const setClient = useContext(OpenApiClientContext).actions.setClient;
  const [error, setError] = useState("");
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await fetch(`${config.AUTH_HOST}/oidc/status`);

        if (response.ok) {
          setAuthenticated(true);
          response.json().then((json) => console.log("authenticated", json));
        } else if (response.status === 401) {
          window.location.href = `${config.AUTH_HOST}/oidc/login`;
        } else {
          setError(`Unexpected status: ${response.status}`);
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : "Unknown error";
        setError(`Received error: ${msg}`);
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    setClient(createOpenApiClient(config.AR_HOST, false));
    checkAuthentication();
  }, [config.AUTH_HOST, config.AR_HOST, setClient]);

  if (isLoading) {
    return <Loading />;
  } else if (error) {
    return <Warning>{error}</Warning>;
  } else if (isAuthenticated) {
    return <>{props.children}</>;
  } else {
    return (
      <div>
        <p>Please log in to continue</p>
        <a href={`${config.AUTH_HOST}/oidc/login`}>Log in</a>
      </div>
    );
  }
}
