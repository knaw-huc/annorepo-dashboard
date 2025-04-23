import {createContext, PropsWithChildren, useContext} from 'react';

import {AnnoRepoOpenApiClient} from "./createOpenApiClient.tsx";

export type OpenApiClientState = {
  state: {
    client: AnnoRepoOpenApiClient
  },
  actions: {}
}

export const OpenApiClientContext = createContext<OpenApiClientState>({
  state: {
    client: {} as AnnoRepoOpenApiClient,
  },
  actions: {}
});

export const OpenApiClientProvider = (props: PropsWithChildren<{
  client: AnnoRepoOpenApiClient;
}>) => {
  const value: OpenApiClientState = {
    state: {
      client: props.client
    },
    actions: {},
  };
  return (
    <OpenApiClientContext.Provider value={value}>
      {props.children}
    </OpenApiClientContext.Provider>
  )
}

export function useOpenApiClient(): OpenApiClientState {
  return useContext(OpenApiClientContext);
}