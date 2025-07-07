import {QueryValueType} from "./QueryValueType.ts";

import {QueryOperator} from "../operator/QueryOperator.ts";

export const queryOperatorValueType: Record<QueryOperator, QueryValueType[]> = {
  [QueryOperator.simpleQuery]: ['string', 'number'],
  [QueryOperator.equal]: ['string', 'number'],
  [QueryOperator.notEqual]: ['string', 'number'],
  [QueryOperator.lessThan]: ['number'],
  [QueryOperator.lessThanOrEqual]: ['number'],
  [QueryOperator.greaterThan]: ['number'],
  [QueryOperator.greaterThanOrEqual]: ['number'],
  [QueryOperator.isIn]: ['options'],
  [QueryOperator.isNotIn]: ['options'],
  [QueryOperator.isWithinTextAnchorRange]: ['range'],
  [QueryOperator.overlapsWithTextAnchorRange]: ['range'],
}