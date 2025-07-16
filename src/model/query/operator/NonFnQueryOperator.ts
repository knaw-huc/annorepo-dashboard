import {Operator} from "./Operator.ts";

export const nonFnQueryOperators = [
  Operator.equal,
  Operator.notEqual,
  Operator.lessThan,
  Operator.lessThanOrEqual,
  Operator.greaterThan,
  Operator.greaterThanOrEqual,
  Operator.isIn,
  Operator.isNotIn
] as const
export type NonFnQueryOperator = typeof nonFnQueryOperators[number]

export function isNonFnOperator(toTest: string): toTest is NonFnQueryOperator {
  return nonFnQueryOperators.includes(toTest as NonFnQueryOperator);
}