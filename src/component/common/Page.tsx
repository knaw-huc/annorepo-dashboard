import { PropsWithChildren, ReactNode, useState } from "react";
import { Menu } from "./Menu.tsx";

import { BreadcrumbNav, ToHome } from "./BreadcrumbNav.tsx";
import { AuthStatus } from "../auth/AuthStatus.tsx";
import { useHasOpenApiClient } from "../../client/OpenApiClientProvider.tsx";
import { PageLayoutContext } from "./PageLayoutContext.tsx";
import { AboutStatus } from "../AboutStatus.tsx";
import { ChangeHost } from "./ChangeHost.tsx";

export function Page(
  props: PropsWithChildren<{
    breadcrumbs?: ReactNode[];
  }>,
) {
  const [secondColumn, setSecondColumn] = useState<ReactNode | null>();

  const hasClient = useHasOpenApiClient();
  return (
    <PageLayoutContext.Provider value={{ setSecondColumn }}>
      <div className="flex flex-col xl:flex-row w-full min-h-screen">
        {/* Left menu */}
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
          <ChangeHost />
        </aside>

        <main className="w-full">
          {/* Top menu */}
          <div className="flex text-sm text-neutral-500  xl:my-10">
            <div className="MAIN-menu-column w-full">
              <div className="flex justify-between">
                <div className="w-full mx-auto max-w-4xl">
                  <BreadcrumbNav
                    breadcrumbs={props.breadcrumbs || [<ToHome />]}
                  />
                </div>
              </div>
            </div>

            <div className="SECOND-column w-full lg:max-w-96  flex flex-col gap-1">
              <div className="px-8">{hasClient && <AuthStatus />}</div>
            </div>
          </div>

          {/* Body */}
          <div className="flex">
            <div className="MAIN-column w-full p-8">
              <div
                className={`w-full mx-auto ${secondColumn ? "max-w-4xl" : "max-w-7xl"}`}
              >
                {props.children}
              </div>
            </div>
            {secondColumn && (
              <div className="SECOND-column w-full lg:max-w-96  h-full lg:min-h-screen flex flex-col gap-1">
                {secondColumn}
              </div>
            )}
          </div>
        </main>
      </div>
    </PageLayoutContext.Provider>
  );
}
