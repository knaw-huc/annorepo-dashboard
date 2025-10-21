import { PropsWithChildren } from "react";
import { isEmpty } from "lodash";
import { CloseButton } from "../container/CloseButton.tsx";

export function Warning(
  props: PropsWithChildren<{
    className?: string;
    onClose?: () => void;
    level?: "warning" | "info";
  }>,
) {
  let className = "px-5 py-2 text-sm ";
  if (props.className) {
    className += ` ${props.className}`;
  }
  const colors =
    props.level === "info"
      ? "bg-orange-50 text-slate-700"
      : "text-red-800 rounded-lg bg-red-50";
  className += ` ${colors}`;

  if (isEmpty(props.children)) {
    return null;
  }

  return (
    <div className={className} role="alert">
      {props.onClose && <CloseButton onClick={props.onClose} />}
      {props.children}
    </div>
  );
}
