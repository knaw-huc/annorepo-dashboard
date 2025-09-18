import { PropsWithChildren, useContext, useEffect, useState } from "react";
import { createOpenApiClient } from "../../client/OpenApiClient.tsx";
import { OpenApiClientContext } from "../../client/OpenApiClientProvider.tsx";
import { useConfig } from "../ConfigProvider.tsx";
import { Loading } from "../common/Loading.tsx";
import { Warning } from "../common/Warning.tsx";
import { isAuthenticated, UserStatus } from "../../model/user/User.ts";
import { useStore } from "../../store/useStore.ts";
import { LogInPage } from "./LogInPage.tsx";
import { Page } from "../common/Page.tsx";
import { ArAboutData } from "../../model/ArModel.ts";
import { fetchValidated } from "./fetchValidated.tsx";

export function Auth(props: PropsWithChildren) {
  const config = useConfig();
  const setClient = useContext(OpenApiClientContext).actions.setClient;
  const { user, setUserState, selectedHost } = useStore();
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const auth = async () => {
      if (!selectedHost) {
        return;
      }

      const aboutResponse = await fetchValidated(`${selectedHost}/about`);
      const aboutJson: ArAboutData = await aboutResponse.json();
      const withAuthentication = aboutJson.withAuthentication;

      if (withAuthentication) {
        const response = await fetch(`${config.AUTH_HOST}/oidc/status`);
        if (response.ok) {
          const update: UserStatus = await response.json();
          setUserState({ user: update });
        } else if (response.status === 401) {
          setUserState({ user: { authenticated: false } });
        } else {
          setError(`Unexpected status: ${response.status}`);
        }
      }

      setClient(createOpenApiClient(selectedHost, false));
      setLoading(false);
    };

    auth().catch((error) => {
      const msg = error instanceof Error ? error.message : "Unknown error";
      setError(`Received error: ${msg}`);
      setUserState({ user: { authenticated: false } });
      setLoading(false);
    });
  }, [config.AUTH_HOST, selectedHost, setClient]);

  if (isLoading) {
    return (
      <Page>
        <Loading name="login status" />
      </Page>
    );
  } else if (error) {
    return (
      <Page>
        <Warning>{error}</Warning>
      </Page>
    );
  } else if (isAuthenticated(user)) {
    return <>{props.children}</>;
  } else {
    return <LogInPage />;
  }
}
