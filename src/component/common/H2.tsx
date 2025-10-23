import { PropsWithChildren } from "react";

export function H2(props: PropsWithChildren) {
  return <h2 className="text-xl">{props.children}</h2>;
}
