import { ComparisonOperator } from "./Operator.ts";

export const queryOperatorOrFnValues: string[] =
  Object.values(ComparisonOperator);

export function toOperator(value: string): ComparisonOperator | null {
  if (!queryOperatorOrFnValues.includes(value)) {
    return null;
  }
  return value as ComparisonOperator;
}
