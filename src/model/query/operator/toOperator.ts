import {Operator} from "./Operator.ts";

export const queryOperatorOrFnValues: string[] = Object.values(Operator)

export function toOperator(value: string): Operator | null {
  if (!queryOperatorOrFnValues.includes(value)) {
    return null
  }
  return value as Operator;
}