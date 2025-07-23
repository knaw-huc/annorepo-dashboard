/**
 * See: https://github.com/knaw-huc/annorepo/blob/main/docs/api-usage.md#create-a-query--experimental
 */
export enum Operator {
  // Query without operator:
  simpleQuery = "simpleQuery",

  // Operators:
  equal = ":=",
  notEqual = ":!=",
  lessThan = ":<",
  lessThanOrEqual = ":<=",
  greaterThan = ":>",
  greaterThanOrEqual = ":>=",
  isIn = ":isIn",
  isNotIn = ":isNotIn",

  // Query functions:
  isWithinTextAnchorRange = ":isWithinTextAnchorRange",
  overlapsWithTextAnchorRange = ":overlapsWithTextAnchorRange",
}

export enum LogicalOperator {
  OR = ":OR",
  AND = ":AND",
}
