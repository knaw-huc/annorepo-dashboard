import {Link, LinkProps} from "@tanstack/react-router";
import {useContainer} from "../../client/endpoint/useContainer.tsx";
import {PropsWithChildren, ReactNode} from "react";

export function BreadcrumbNav(props: { breadcrumbs: ReactNode[] }) {
  return <span className="hover:text-gray-950 font-mono text-[0.8125rem]/6 font-medium tracking-widest text-pretty uppercase text-gray-600">
    {props.breadcrumbs.map(breadcrumb => <>{breadcrumb} &gt; </>)}
  </span>
}
export type BreadcrumbProps = PropsWithChildren<LinkProps>;

export function Breadcrumb(props: BreadcrumbProps) {
  return <Link className="hover:text-gray-950 font-medium text-pretty uppercase text-gray-600" to={props.to}>{props.children}</Link>
}

export const ToHome = () => <Breadcrumb to='/'>Home</Breadcrumb>

export const ToContainers = () => <Breadcrumb to='/container'>Containers</Breadcrumb>;

export const ToContainer = (props: { name: string }
) => {
  const {data: container} = useContainer(props.name)

  if (!container) {
    return null;
  }

  return <Breadcrumb
    to='/container/$containerName'
    params={{containerName: props.name}}
  >
    {container.label}
  </Breadcrumb>;
};