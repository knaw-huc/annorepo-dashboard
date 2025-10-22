import { useState } from "react";
import { useStore } from "../../store/useStore.ts";
import { useOpenApiClient } from "../../client/OpenApiClientProvider.tsx";
import { useQueryClient } from "@tanstack/react-query";
import { Middleware } from "openapi-fetch";
import { Input } from "../common/form/Input.tsx";
import { Warning } from "../common/Warning.tsx";
import { SquareButton } from "../Modal.tsx";

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

    const addTokenToHeaders: Middleware = {
      async onRequest(params) {
        params.request.headers.set("Authorization", `Bearer ${token}`);
      },
    };
    client.use(addTokenToHeaders);
    await queryClient.invalidateQueries({
      predicate: () => true,
    });
  }

  return (
    <div className="flex gap-2">
      {error && <Warning>{error}</Warning>}
      <Input value={token} onChange={setToken} type="password" />
      <div className="flex justify-end items-end">
        <SquareButton className="ml-3 font-mono" onClick={handleSettingApiKey}>
          ✔
        </SquareButton>
      </div>
    </div>
  );
}
