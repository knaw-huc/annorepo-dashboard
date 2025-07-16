import {QueryValueType} from "./QueryValueType.ts";

import {Operator} from "../operator/Operator.ts";

export const queryOperatorValueType: Record<Operator, QueryValueType[]> = {
  [Operator.simpleQuery]: ['string', 'number'],
  [Operator.equal]: ['string', 'number'],
  [Operator.notEqual]: ['string', 'number'],
  [Operator.lessThan]: ['number'],
  [Operator.lessThanOrEqual]: ['number'],
  [Operator.greaterThan]: ['number'],
  [Operator.greaterThanOrEqual]: ['number'],
  [Operator.isIn]: ['options'],
  [Operator.isNotIn]: ['options'],
  [Operator.isWithinTextAnchorRange]: ['range'],
  [Operator.overlapsWithTextAnchorRange]: ['range'],
}