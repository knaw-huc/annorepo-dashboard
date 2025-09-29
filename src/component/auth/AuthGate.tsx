import { PropsWithChildren, useContext, useEffect, useState } from "react";
import { OpenApiClientContext } from "../../client/OpenApiClientProvider.tsx";
import { useConfig } from "../ConfigProvider.tsx";
import { Loading } from "../common/Loading.tsx";
import { Warning } from "../common/Warning.tsx";
import {
  AuthMethod,
  isAuthenticated,
  OidcUser,
} from "../../model/user/User.ts";
import { useStore } from "../../store/useStore.ts";
import { Page } from "../common/Page.tsx";
import { ArAboutData } from "../../model/ArModel.ts";
import { fetchValidated } from "./fetchValidated.tsx";
import { PleaseLogInPage } from "./PleaseLogInPage.tsx";
import { createOpenApiClient } from "../../client/OpenApiClient.tsx";
import { toErrorMessage } from "../common/toErrorMessage.ts";

/**
 * What to show based on auth state
 */
export function AuthGate(props: PropsWithChildren) {
  const { AR_HOSTS, AUTH_HOST } = useConfig();
  const {
    state: { client },
    actions: { setClient },
  } = useContext(OpenApiClientContext);

  const {
    user,
    setAuthState,
    selectedHost,
    authMethods,
    selectedAuthMethod,
    isAuthenticating,
  } = useStore();

  const [error, setError] = useState("");
  const [isLoadingAbout, setLoadingAbout] = useState(false);

  useEffect(() => {
    console.log("Using host", selectedHost);
    if (client) {
      return;
    }
    const hostPath = AR_HOSTS[selectedHost];
    console.log("Creating host", hostPath);
    setClient(createOpenApiClient(hostPath));
  }, [selectedHost, client]);

  useEffect(() => {
    if (!selectedHost || isLoadingAbout || isAuthenticated(user)) {
      return;
    }
    setLoadingAbout(true);
    const checkAbout = async () => {
      let about: ArAboutData;
      try {
        const aboutResponse = await fetchValidated(
          `${AR_HOSTS[selectedHost]}/about`,
        );
        about = await aboutResponse.json();
      } catch (error) {
        setError(`Could not get /about: ${toErrorMessage(error)}`);
        return;
      }
      const withAuthentication = about.withAuthentication;
      const authMethodsUpdate: AuthMethod[] = [];
      if (!withAuthentication) {
        setAuthState({
          withAuthentication,
          user: { method: "anonymous", authenticated: false },
        });
        return;
      }
      const isOidcEnabled = about.authentication.oidc?.some(
        (s) => s.serverUrl === AUTH_HOST.providerUrl,
      );
      const isBearerTokenEnabled =
        withAuthentication && about.authentication.internal === "api-keys";
      if (isOidcEnabled) {
        authMethodsUpdate.push("oidc");
        await getStatus();
      }
      if (isBearerTokenEnabled) {
        authMethodsUpdate.push("token");
        setAuthState({ withAuthentication });
      }
      setLoadingAbout(false);
      setAuthState({ authMethods: authMethodsUpdate });
    };

    checkAbout();
  }, [AUTH_HOST, selectedHost, setClient]);

  async function getStatus() {
    try {
      const response = await fetch(`${AUTH_HOST.proxyUrl}/oidc/status`);
      if (response.ok) {
        const update: Omit<OidcUser, "method"> = await response.json();
        setAuthState({
          withAuthentication: true,
          user: { method: "oidc", ...update },
        });
        setAuthState({ selectedAuthMethod: "oidc" });
      } else if (response.status === 401) {
        setAuthState({ user: { method: "anonymous", authenticated: false } });
      } else {
        setError(`Unexpected status: ${response.status}`);
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Unknown error";
      setError(`Status check resulted in error: ${msg}`);
      setAuthState({ user: { method: "anonymous", authenticated: false } });
      setAuthState({ isAuthenticating: false });
    }
  }

  useEffect(() => {
    if (
      isAuthenticated(user) ||
      selectedAuthMethod !== "oidc" ||
      isAuthenticating
    ) {
      return;
    }
    setAuthState({ isAuthenticating: true });
    getStatus();
  }, [selectedAuthMethod, isAuthenticating]);

  if (error) {
    return (
      <Page>
        <Warning>{error}</Warning>
      </Page>
    );
  } else if (isLoadingAbout) {
    return (
      <Page>
        <Loading name="login status" />
      </Page>
    );
  } else if (!client) {
    return (
      <Page>
        <Loading name="client" />
      </Page>
    );
  } else if (isAuthenticating && selectedAuthMethod === "oidc") {
    return <PleaseLogInPage />;
  } else if (isAuthenticating && selectedAuthMethod === "token") {
    /**
     * See {@link AuthStatus}
     */
    return <>{props.children}</>;
  } else if (!selectedAuthMethod && authMethods) {
    /**
     * See {@link AuthStatus}
     */
    return <>{props.children}</>;
  } else if (selectedAuthMethod === "anonymous") {
    return <>{props.children}</>;
  } else if (isAuthenticated(user)) {
    return <>{props.children}</>;
  } else {
    return <Warning>Unknown authentication state</Warning>;
  }
}
