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

// TODO: set available auth methods
// TODO: allow user to pick one
// TODO: perform action accordingly
// TODO: create client suitable for auth method
// TODO: start anonymously, replace login screen with optional login modal

export function Auth(props: PropsWithChildren) {
  const config = useConfig();
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
    if (client) {
      return;
    }
    console.log("createOpenApiClient, selectedHost:", selectedHost);
    setClient(createOpenApiClient(selectedHost));
  }, [selectedHost, client]);

  useEffect(() => {
    if (!selectedHost || isLoadingAbout) {
      return;
    }
    setLoadingAbout(true);
    const checkAbout = async () => {
      const aboutResponse = await fetchValidated(`${selectedHost}/about`);
      const about: ArAboutData = await aboutResponse.json();
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
        (s) => s.serverUrl === config.AUTH_HOST.providerUrl,
      );
      const isBearerTokenEnabled =
        withAuthentication && about.authentication.internal === "api-keys";
      console.log("checkAbout", { about, isOidcEnabled, isBearerTokenEnabled });
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
  }, [config.AUTH_HOST, selectedHost, setClient]);

  useEffect(() => {
    console.log("user changed", user);
  }, [user]);

  useEffect(() => {
    if (user.authenticated) {
      setAuthState({ isAuthenticating: false });
    }
  }, [user.authenticated]);

  async function getStatus() {
    const response = await fetch(`${config.AUTH_HOST.proxyUrl}/oidc/status`);
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

    getStatus().catch((error) => {
      const msg = error instanceof Error ? error.message : "Unknown error";
      setError(`Received error: ${msg}`);
      setAuthState({ user: { method: "anonymous", authenticated: false } });
      setAuthState({ isAuthenticating: false });
    });
  }, [selectedAuthMethod, isAuthenticating]);

  if (isLoadingAbout) {
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
  } else if (isAuthenticating && selectedAuthMethod === "oidc") {
    return <PleaseLogInPage />;
  } else if (isAuthenticating && selectedAuthMethod === "token") {
    /**
     * See {@link AuthStatusBadge}
     */
    return <>{props.children}</>;
  } else if (!selectedAuthMethod && authMethods && client) {
    /**
     * See {@link AuthStatusBadge}
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
