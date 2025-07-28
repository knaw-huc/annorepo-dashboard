import { ComparisonOperator } from "./Operator.ts";

export const rangeQueryOperator = [
  ComparisonOperator.overlapsWithTextAnchorRange,
  ComparisonOperator.isWithinTextAnchorRange,
] as const;

export type RangeQueryOperator = (typeof rangeQueryOperator)[number];

export function isRangeQueryOperator(
  toTest: string,
): toTest is RangeQueryOperator {
  return rangeQueryOperator.includes(toTest as RangeQueryOperator);
}
