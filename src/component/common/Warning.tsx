import { PropsWithChildren } from "react";
import { isEmpty } from "lodash";

export function Warning(
  props: PropsWithChildren<{
    className?: string;
  }>,
) {
  let className = "px-5 py-2 text-sm text-red-800 rounded-lg bg-red-50";
  if (props.className) {
    className += ` ${props.className}`;
  }
  if (isEmpty(props.children)) {
    return null;
  }
  return (
    <div className={className} role="alert">
      {props.children}
    </div>
  );
}
