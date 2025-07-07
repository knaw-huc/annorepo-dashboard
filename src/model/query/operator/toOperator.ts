import {QueryOperator} from "./QueryOperator.ts";

export const queryOperatorOrFnValues: string[] = Object.values(QueryOperator)

export function toOperator(value: string): QueryOperator | null {
  if (!queryOperatorOrFnValues.includes(value)) {
    return null
  }
  return value as QueryOperator;
}