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
import { Button } from "../common/Button.tsx";
import { createOpenApiClient } from "../../client/OpenApiClient.tsx";
import { TokenForm } from "./TokenForm.tsx";

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
  const { user, setUserState, selectedHost } = useStore();

  const [error, setError] = useState("");
  const [isLoadingAbout, setLoadingAbout] = useState(false);
  const [authMethods, setAuthMethods] = useState<AuthMethod[]>();
  const [selectedAuthMethod, setSelectedAuthMethod] = useState<AuthMethod>();
  const [isAuthenticating, setAuthenticating] = useState(false);

  useEffect(() => {
    if (client) {
      return;
    }
    setClient(createOpenApiClient(selectedHost, false));
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
        setUserState({
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
        setUserState({ withAuthentication });
      }
      setLoadingAbout(false);
      setAuthMethods(authMethodsUpdate);
    };

    checkAbout();
  }, [config.AUTH_HOST, selectedHost, setClient]);

  useEffect(() => {
    console.log("user changed", user);
  }, [user]);

  useEffect(() => {
    if (user.authenticated) {
      setAuthenticating(false);
    }
  }, [user.authenticated]);

  async function getStatus() {
    const response = await fetch(`${config.AUTH_HOST.proxyUrl}/oidc/status`);
    if (response.ok) {
      const update: Omit<OidcUser, "method"> = await response.json();
      setUserState({
        withAuthentication: true,
        user: { method: "oidc", ...update },
      });
      setClient(createOpenApiClient(selectedHost, false));
      setSelectedAuthMethod("oidc");
    } else if (response.status === 401) {
      setUserState({ user: { method: "anonymous", authenticated: false } });
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
    setAuthenticating(true);

    getStatus().catch((error) => {
      const msg = error instanceof Error ? error.message : "Unknown error";
      setError(`Received error: ${msg}`);
      setUserState({ user: { method: "anonymous", authenticated: false } });
      setAuthenticating(false);
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
  } else if (!selectedAuthMethod && authMethods) {
    return (
      <div>
        {authMethods.includes("oidc") && (
          <Button
            onClick={() => {
              setAuthenticating(true);
              setSelectedAuthMethod("oidc");
            }}
          >
            Oidc
          </Button>
        )}
        {authMethods.includes("token") && (
          <Button
            onClick={() => {
              setAuthenticating(true);
              setSelectedAuthMethod("token");
            }}
          >
            Token
          </Button>
        )}
        <Button onClick={() => setSelectedAuthMethod("anonymous")}>
          Anonymous
        </Button>
      </div>
    );
  } else if (isAuthenticating && selectedAuthMethod === "oidc") {
    return <PleaseLogInPage />;
  } else if (isAuthenticating && selectedAuthMethod === "token") {
    return <TokenForm />;
  } else if (selectedAuthMethod === "anonymous") {
    return <>{props.children}</>;
  } else if (isAuthenticated(user)) {
    return <>{props.children}</>;
  } else {
    return <Warning>Unknown authentication state</Warning>;
  }
}
