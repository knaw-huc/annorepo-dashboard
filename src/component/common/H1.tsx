import { PropsWithChildren } from "react";

export function H1(props: PropsWithChildren) {
  return <h1 className="text-2xl">{props.children}</h1>;
}
