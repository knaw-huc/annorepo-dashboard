import { PropsWithChildren } from "react";

export function H5(props: PropsWithChildren<object>) {
  return (
    <h5 className="font-medium text-center text-anrep-blue-900 p-4">
      {props.children}
    </h5>
  );
}
