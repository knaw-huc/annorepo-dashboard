import { QueryValueType } from "./QueryValueType.ts";

import { ComparisonOperator } from "../operator/Operator.ts";

export const comparisonOperatorValueType: Record<
  ComparisonOperator,
  QueryValueType[]
> = {
  [ComparisonOperator.simpleQuery]: ["string", "number"],
  [ComparisonOperator.equal]: ["string", "number"],
  [ComparisonOperator.notEqual]: ["string", "number"],
  [ComparisonOperator.lessThan]: ["number"],
  [ComparisonOperator.lessThanOrEqual]: ["number"],
  [ComparisonOperator.greaterThan]: ["number"],
  [ComparisonOperator.greaterThanOrEqual]: ["number"],
  [ComparisonOperator.isIn]: ["options"],
  [ComparisonOperator.isNotIn]: ["options"],
  [ComparisonOperator.isWithinTextAnchorRange]: ["range"],
  [ComparisonOperator.overlapsWithTextAnchorRange]: ["range"],
};
