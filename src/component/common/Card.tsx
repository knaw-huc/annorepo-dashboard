import {PropsWithChildren, ReactNode} from "react";

export function Card(props: PropsWithChildren<{
  title: ReactNode
  footer?: ReactNode
}>) {
  return <div
    className="mt-3 block rounded-lg bg-slate-50 text-center text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white">
    <div
      className="border-b-2 border-neutral-100 px-6 py-3 dark:border-white/10"
    >
      <h5 className="mt-2 text-xl font-medium leading-tight ">
        {props.title}
      </h5>
    </div>
    <div className="p-6">
      <p className="mb-4 text-base ">
        {props.children}
      </p>
    </div>
    {props.footer && <div
      className="border-t-2 border-neutral-100 px-6 py-3 text-surface/75 dark:border-white/10 dark:text-neutral-300"
    >
      {props.footer}
    </div>}
  </div>
}