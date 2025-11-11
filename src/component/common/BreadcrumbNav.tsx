import { Link, LinkProps } from "@tanstack/react-router";
import { useContainer } from "../../client/endpoint/useContainer.tsx";
import { Fragment, PropsWithChildren, ReactNode } from "react";
import { useContainerAnnotation } from "../../client/endpoint/useContainerAnnotation.tsx";
import { toAnnotationGroups } from "../../util/toAnnotationGroups.ts";
import { orThrow } from "../../util/orThrow.ts";

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

export const ToContainer = (props: { containerName: string }) => {
  const { data: container } = useContainer(props.containerName);

  if (!container) {
    return null;
  }

  return (
    <Breadcrumb
      to="/container/$containerName"
      params={{ containerName: props.containerName }}
    >
      {container.label}
    </Breadcrumb>
  );
};

export const ToAnnotation = (props: {
  containerName: string;
  annotationName: string;
}) => {
  const { data } = useContainerAnnotation(
    props.containerName,
    props.annotationName,
  );
  if (!data) {
    return null;
  }

  const parsed =
    toAnnotationGroups(data?.annotation.id) ??
    orThrow("Could not parse:" + data.annotation.id);

  return (
    <Breadcrumb
      to="/container/$containerName/annotation/$annotationName"
      params={{
        containerName: props.containerName,
        annotationName: props.annotationName,
      }}
    >
      {parsed.annotationName}
    </Breadcrumb>
  );
};

export const ToCustomQueryIndex = () => (
  <Breadcrumb to="/custom-query">Custom query</Breadcrumb>
);

export const BreadCrumbSeparator = () => (
  <span className="text-neutral-300"> / </span>
);
