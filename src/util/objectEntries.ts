export type Entry<T> = [keyof T, T[keyof T]]

export function objectEntries<T extends object>(obj: T): Entry<T>[] {
  return (Object.keys(obj) as Array<keyof T>).map((key) => [
    key,
    obj[key],
  ]) as Entry<T>[];
}