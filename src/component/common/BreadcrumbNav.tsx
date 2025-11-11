import { Link, LinkProps } from "@tanstack/react-router";
import { useContainer } from "../../client/endpoint/useContainer.tsx";
import { Fragment, PropsWithChildren, ReactNode } from "react";

export function BreadcrumbNav(props: { breadcrumbs: ReactNode[] }) {
  return (
    <div className="flex gap-2 *:no-underline">
      {props.breadcrumbs.map((breadcrumb, i) => {
        const isLast = i === props.breadcrumbs.length - 1;
        return (
          <Fragment key={i}>
            {breadcrumb}
            {!isLast && <BreadCrumbSeparator />}
          </Fragment>
        );
      })}
    </div>
  );
}

export type BreadcrumbProps = PropsWithChildren<LinkProps>;

export function Breadcrumb(props: BreadcrumbProps) {
  return (
    <Link className="" to={props.to}>
      {props.children}
    </Link>
  );
}

export const ToHome = () => <Breadcrumb to="/">Home</Breadcrumb>;

export const ToContainers = () => (
  <Breadcrumb to="/container">Containers</Breadcrumb>
);

export const ToContainer = (props: { name: string }) => {
  const { data: container } = useContainer(props.name);

  if (!container) {
    return null;
  }

  return (
    <Breadcrumb
      to="/container/$containerName"
      params={{ containerName: props.name }}
    >
      {container.label}
    </Breadcrumb>
  );
};

export const ToCustomQueryIndex = () => (
  <Breadcrumb to="/custom-query">Custom query</Breadcrumb>
);

export const BreadCrumbSeparator = () => (
  <span className="text-neutral-300"> / </span>
);
