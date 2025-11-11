import { createContext, PropsWithChildren, useContext, useState } from "react";

import { AnnoRepoOpenApiClient } from "./OpenApiClient.tsx";

type AnnoRepoClientOpenApiSetter = (client: AnnoRepoOpenApiClient) => void;

export type OpenApiClientState = {
  state: {
    client?: AnnoRepoOpenApiClient;
  };
  actions: {
    setClient: AnnoRepoClientOpenApiSetter;
  };
};

export const OpenApiClientContext = createContext<OpenApiClientState>({
  state: {
    client: {} as AnnoRepoOpenApiClient,
  },
  actions: {
    setClient: () => {
      throw new Error("client setter not provided");
    },
  },
});

export const OpenApiClientProvider = (props: PropsWithChildren<object>) => {
  const [client, setClient] = useState<AnnoRepoOpenApiClient>();

  const value: OpenApiClientState = {
    state: {
      client,
    },
    actions: {
      setClient,
    },
  };
  return (
    <OpenApiClientContext.Provider value={value}>
      {props.children}
    </OpenApiClientContext.Provider>
  );
};

export function useOpenApiClient(): AnnoRepoOpenApiClient {
  const client = useContext(OpenApiClientContext).state.client;
  if (!client) {
    throw new Error("OpenApi client not set: not logged in?");
  }
  return client;
}
export function useHasOpenApiClient(): boolean {
  return !!useContext(OpenApiClientContext).state.client;
}
