import ReactDOM from "react-dom/client";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import "./main.css";

import { routeTree } from "./routeTree.gen";
import { QueryClientProvider } from "@tanstack/react-query";
import { OpenApiClientProvider } from "./client/OpenApiClientProvider.tsx";

import { createQueryClient } from "./client/QueryClient.tsx";
import { ConfigProvider } from "./component/ConfigProvider.tsx";
import { orThrow } from "./util/orThrow.ts";
import { Config } from "./component/Config.ts";
import { StrictMode } from "react";
import { HostParam } from "./component/host/HostParam.tsx";

// Generate routes from ./src/routes/
const router = createRouter({ routeTree });

// Register generated route types
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

main();

async function main() {
  const config: Config = await requestConfig();
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    console.error("No root element found");
    return;
  }
  if (rootElement.innerHTML) {
    console.error("Root element already populated");
    return;
  }
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <ConfigProvider config={config}>
        <OpenApiClientProvider>
          <QueryClientProvider client={createQueryClient()}>
            <HostParam>
              <RouterProvider router={router} />
            </HostParam>
          </QueryClientProvider>
        </OpenApiClientProvider>
      </ConfigProvider>
    </StrictMode>,
  );
}

async function requestConfig() {
  const configUrlEnvVar = "VITE_CONFIG_URL";
  const configUrl =
    import.meta.env[configUrlEnvVar] ?? orThrow(`${configUrlEnvVar} not set`);

  return fetch(configUrl)
    .then((r) => r.json())
    .catch((cause) => {
      const errorMessage =
        cause instanceof Error ? cause.message : "Unknown error";
      const configErrorMessage = `Error while fetching config: ${errorMessage}`;
      throw new Error(configErrorMessage, { cause });
    });
}
