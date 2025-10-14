import { debounce, DebouncedFunc } from "lodash";
import { useRef } from "react";
import { AnyFn } from "../model/Any.ts";

export function useDebouncedCall<T extends AnyFn>(
  callback: T,
  delay: number = 250,
): DebouncedFunc<T> {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  const debouncedFn = useRef(
    debounce((...args: Parameters<T>) => {
      callbackRef.current(...args);
    }, delay),
  ).current;

  return debouncedFn as DebouncedFunc<T>;
}
