import {PropsWithChildren, ReactNode} from "react";
import {Menu} from "./Menu.tsx";
import {Link} from "@tanstack/react-router";

import {BreadcrumbNav, ToHome} from "./BreadcrumbNav.tsx";

export function Page(props: PropsWithChildren<{
  breadcrumbs?: ReactNode[]
}>) {
  return <div className="flex flex-col min-h-screen">

    {/* Header */}
    <div>
      <div className="flex flex-col md:flex-row">
        <aside
          className="w-full md:w-64 p-4 order-1 md:order-1 bg-gray-100 flex-none"
        >
          <p className="text-xl font-bold text-gray-900">
            <Link to='/'>AnnoRepo Dashboard</Link>
          </p>
        </aside>
        <main className="flex-grow p-4 order-2 md:order-2 flex-initial">
          <BreadcrumbNav breadcrumbs={props.breadcrumbs || [<ToHome/>]}/>
        </main>
      </div>
    </div>

    {/* Body */}
    <div className="flex flex-col md:flex-row flex-grow w-full">
      <aside
        className="w-full md:w-64 p-4 order-1 md:order-1 bg-gray-100 flex-none"
      >
        <Menu/>
      </aside>
      <main className="p-4 order-2 md:order-2 flex-grow">
        {props.children}
      </main>
    </div>

  </div>
}