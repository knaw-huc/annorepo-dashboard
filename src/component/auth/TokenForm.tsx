import { useState } from "react";
import { useStore } from "../../store/useStore.ts";
import { useOpenApiClient } from "../../client/OpenApiClientProvider.tsx";
import { useQueryClient } from "@tanstack/react-query";
import { Middleware } from "openapi-fetch";
import { InputWithLabel } from "../common/form/InputWithLabel.tsx";
import { Button } from "../common/Button.tsx";
import { LinkButton } from "./LoginStatusBadge.tsx";

export function TokenForm() {
  const [isOpen, setOpen] = useState(false);
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const { setUserState, user } = useStore();
  const client = useOpenApiClient();
  const queryClient = useQueryClient();

  async function handleSettingApiKey() {
    try {
      await client.GET("/my/containers", {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {
      setError("Invalid key");
      setUserState({ user: { method: "anonymous", authenticated: false } });
      return;
    }
    setUserState({
      user: { ...user, authenticated: true, method: "token", token },
    });

    const addTokenTokenHeader: Middleware = {
      async onRequest(params) {
        params.request.headers.set("Authorization", `Bearer ${token}`);
      },
    };
    console.log("addTokenTokenHeader", token);
    client.use(addTokenTokenHeader);
    await queryClient.invalidateQueries({
      predicate: () => true,
    });
  }

  return (
    <>
      {!isOpen && (
        <LinkButton onClick={() => setOpen(true)}>Add token</LinkButton>
      )}
      {isOpen && (
        <>
          <InputWithLabel
            value={token}
            label="Token"
            onChange={setToken}
            errorLabel={error}
            type="password"
          />
          <Button onClick={handleSettingApiKey}>Set</Button>
        </>
      )}
    </>
  );
}
