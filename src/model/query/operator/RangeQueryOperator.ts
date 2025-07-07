import {QueryOperator} from "./QueryOperator.ts";

export const rangeQueryOperator = [
  QueryOperator.overlapsWithTextAnchorRange,
  QueryOperator.isWithinTextAnchorRange
] as const

export type RangeQueryOperator = typeof rangeQueryOperator[number]

export function isRangeQueryOperator(toTest: string): toTest is RangeQueryOperator {
  return rangeQueryOperator.includes(toTest as RangeQueryOperator);
}
