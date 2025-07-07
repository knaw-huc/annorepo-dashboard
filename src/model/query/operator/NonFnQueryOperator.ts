import {QueryOperator} from "./QueryOperator.ts";

export const nonFnQueryOperators = [
  QueryOperator.equal,
  QueryOperator.notEqual,
  QueryOperator.lessThan,
  QueryOperator.lessThanOrEqual,
  QueryOperator.greaterThan,
  QueryOperator.greaterThanOrEqual,
  QueryOperator.isIn,
  QueryOperator.isNotIn
] as const
export type NonFnQueryOperator = typeof nonFnQueryOperators[number]

export function isNonFnOperator(toTest: string): toTest is NonFnQueryOperator {
  return nonFnQueryOperators.includes(toTest as NonFnQueryOperator);
}