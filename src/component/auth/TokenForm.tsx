import { useState } from "react";
import { useStore } from "../../store/useStore.ts";
import { useOpenApiClient } from "../../client/OpenApiClientProvider.tsx";
import { useQueryClient } from "@tanstack/react-query";
import { Middleware } from "openapi-fetch";
import { InputWithLabel } from "../common/form/InputWithLabel.tsx";
import { DeprecatedButton } from "../common/DeprecatedButton.tsx";

export function TokenForm() {
  const { setAuthState, user } = useStore();

  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const client = useOpenApiClient();
  const queryClient = useQueryClient();

  async function handleSettingApiKey() {
    try {
      await client.GET("/my/containers", {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {
      setError("Invalid key");
      setAuthState({ user: { method: "anonymous", authenticated: false } });
      return;
    }
    setAuthState({
      isAuthenticating: false,
      user: { ...user, authenticated: true, method: "token", token },
    });

    const addTokenTokenHeader: Middleware = {
      async onRequest(params) {
        params.request.headers.set("Authorization", `Bearer ${token}`);
      },
    };
    client.use(addTokenTokenHeader);
    await queryClient.invalidateQueries({
      predicate: () => true,
    });
  }

  return (
    <div>
      <InputWithLabel
        value={token}
        label="Token"
        onChange={setToken}
        errorLabel={error}
        type="password"
      />
      <DeprecatedButton onClick={handleSettingApiKey}>Set</DeprecatedButton>
    </div>
  );
}
