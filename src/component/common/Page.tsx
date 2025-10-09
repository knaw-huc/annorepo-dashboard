import { PropsWithChildren, ReactNode } from "react";
import { Menu } from "./Menu.tsx";

import { BreadcrumbNav, ToHome } from "./BreadcrumbNav.tsx";
import { AuthStatus } from "../auth/AuthStatus.tsx";
import { useAbout } from "../../client/endpoint/useAbout.tsx";
import { Loading } from "./Loading.tsx";
import { useHasOpenApiClient } from "../../client/OpenApiClientProvider.tsx";

export function Page(
  props: PropsWithChildren<{
    breadcrumbs?: ReactNode[];
  }>,
) {
  const hasClient = useHasOpenApiClient();
  return (
    <div className="flex flex-col xl:flex-row w-full min-h-screen">
      <aside className="bg-stone-100 w-full xl:max-w-80 p-8 flex flex-row xl:flex-col gap-8 justify-between xl:justify-start">
        <div className="order-2 xl:order-none">
          <img
            src="/images/logo-knaw-humanities-cluster.png"
            alt=""
            className="h-16"
          />
        </div>
        <div className="order-1 xl:order-none grow">
          <div className="font-bold text-2xl px-0 xl:py-8">
            Annorepo Dashboard
          </div>
          <Menu />
        </div>
        {hasClient && <AboutStatus />}
      </aside>
      <main className="w-full">
        <div className="flex">
          <div className="w-full p-8">
            <div className="w-full mx-auto max-w-7xl">
              <div className="flex justify-between text-sm text-neutral-500">
                <BreadcrumbNav
                  breadcrumbs={props.breadcrumbs || [<ToHome />]}
                />
                <div className="flex gap-2 items-center">
                  {hasClient && <AuthStatus />}
                </div>
              </div>
              {props.children}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export function AboutStatus() {
  const about = useAbout();
  if (!about.data) {
    return <Loading name="about" />;
  }
  return (
    <div className="hidden xl:flex flex-col gap-4 text-xs text-stone-500 border-t border-stone-200 pt-8">
      <div>
        AnnoRepo Version: <strong>{about.data.version}</strong>
      </div>
      <div>
        Running since
        <br />
        {new Date(about.data.startedAt).toLocaleDateString()}
        <br />
        {new Date(about.data.startedAt).toLocaleTimeString()}
      </div>
      <div>
        Running at
        <br />
        {about.data.baseURI}
      </div>
    </div>
  );
}
