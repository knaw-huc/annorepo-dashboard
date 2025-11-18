import { ComparisonOperator } from "./Operator.ts";

export const optionQueryOperator = [
  ComparisonOperator.isIn,
  ComparisonOperator.isNotIn,
] as const;

export type OptionQueryOperator = (typeof optionQueryOperator)[number];

export function isOptionQueryOperator(
  toTest: string,
): toTest is OptionQueryOperator {
  return optionQueryOperator.includes(toTest as OptionQueryOperator);
}
