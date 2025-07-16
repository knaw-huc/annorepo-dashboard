import {Operator} from "./Operator.ts";

export const rangeQueryOperator = [
  Operator.overlapsWithTextAnchorRange,
  Operator.isWithinTextAnchorRange
] as const

export type RangeQueryOperator = typeof rangeQueryOperator[number]

export function isRangeQueryOperator(toTest: string): toTest is RangeQueryOperator {
  return rangeQueryOperator.includes(toTest as RangeQueryOperator);
}
