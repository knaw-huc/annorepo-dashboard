import { PropsWithChildren, ReactNode } from "react";

export function Card(
  props: PropsWithChildren<{
    header?: ReactNode;
    footer?: ReactNode;
    className?: string;
  }>,
) {
  let className = "w-full rounded";
  if (props.className) {
    className += ` ${props.className}`;
  }
  return (
    <div className={className}>
      {props.header && <div>{props.header}</div>}
      <div className=" px-6 py-3 overflow-auto">{props.children}</div>
      {props.footer && (
        <div className="border-t-2 border-neutral-100 px-6 py-3 text-surface/75">
          {props.footer}
        </div>
      )}
    </div>
  );
}
