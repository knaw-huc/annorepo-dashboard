export type SelectOption<
  T = string
> = {
  label: string,
  value: T
};

export function toOption<T>(t: T): SelectOption<T> {
  return ({label: `${t}`, value: t});
}