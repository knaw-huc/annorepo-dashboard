import {StrictMode} from 'react'
import ReactDOM from 'react-dom/client'
import {createRouter, RouterProvider} from '@tanstack/react-router'
import './main.css'

// generated route tree
import {routeTree} from './routeTree.gen'
import {QueryClientProvider} from "@tanstack/react-query";
import {OpenApiClientProvider} from "./client/OpenApiClientProvider.tsx";

import {createQueryClient} from "./client/QueryClient.tsx";

const router = createRouter({routeTree})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <OpenApiClientProvider>
        <QueryClientProvider client={createQueryClient()}>
          <RouterProvider router={router}/>
        </QueryClientProvider>
      </OpenApiClientProvider>
    </StrictMode>,
  )
}