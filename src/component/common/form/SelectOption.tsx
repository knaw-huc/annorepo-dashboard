import { ReactNode } from "react";

export type SelectOption<T = string> = {
  label: string | ReactNode;
  value: T;
};

export function toOption<T>(t: T): SelectOption<T> {
  return { label: `${t}`, value: t };
}
