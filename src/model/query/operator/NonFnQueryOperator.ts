import { ComparisonOperator } from "./Operator.ts";

export const nonFnQueryOperators = [
  ComparisonOperator.equal,
  ComparisonOperator.notEqual,
  ComparisonOperator.lessThan,
  ComparisonOperator.lessThanOrEqual,
  ComparisonOperator.greaterThan,
  ComparisonOperator.greaterThanOrEqual,
  ComparisonOperator.isIn,
  ComparisonOperator.isNotIn,
] as const;
export type NonFnQueryOperator = (typeof nonFnQueryOperators)[number];

export function isNonFnOperator(toTest: string): toTest is NonFnQueryOperator {
  return nonFnQueryOperators.includes(toTest as NonFnQueryOperator);
}
