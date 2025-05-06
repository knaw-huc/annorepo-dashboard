import {Link, LinkProps} from "@tanstack/react-router";

export type Breadcrumb = LinkProps & { name: string };

export function BreadcrumbNav(props: { breadcrumbs: Breadcrumb[] }) {
  return <>
    {props.breadcrumbs.map(((b, i) => <span key={i}><Link
      to={b.to}
      params={b.params}
    >
        {b.name}
      </Link> &gt; </span>))}
  </>
}

export const toHome = {
  to: '/',
  name: 'Home'
} as const satisfies Breadcrumb;

export const toContainers = {
  to: '/container',
  name: 'Containers'
} as const satisfies Breadcrumb;

export const toContainer = (
  name: string,
  params: {
    containerName: string
  }
) => ({
  name,
  to: '/container/$containerName',
  params
} as const satisfies Breadcrumb);
