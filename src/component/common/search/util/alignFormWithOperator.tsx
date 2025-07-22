import {ComparisonSubQueryForm} from "../../../../model/query/QueryModel.ts";
import {Operator} from "../../../../model/query/operator/Operator.ts";
import {
  findMapperByType
} from "../../../../model/query/value/util/findMapperByType.ts";
import {
  queryOperatorValueType
} from "../../../../model/query/value/queryOperatorValueType.ts";
import {
  queryValueMappers
} from "../../../../model/query/value/queryValueMappers.ts";
import {orThrow} from "../../../../util/orThrow.ts";
import {
  isRangeQueryOperator
} from "../../../../model/query/operator/RangeQueryOperator.ts";
import {NO_FIELD} from "../../../../model/ArModel.ts";

export function alignFormWithOperator(
  prev: ComparisonSubQueryForm,
  nextOperator: Operator,
): ComparisonSubQueryForm {
  const currentMapping = findMapperByType(prev.valueType)

  // Use first option by default:
  const nextType = queryOperatorValueType[nextOperator][0]

  const next: ComparisonSubQueryForm = {
    ...prev,
    operator: nextOperator,
    valueType: nextType
  }
  if (currentMapping.type === nextType) {
    next.value = prev.value
  } else {
    const nextMapping = queryValueMappers.find(m => m.type === nextType)
      ?? orThrow(`No default found for ${nextType}`);
    next.value = nextMapping.defaultValue
  }
  if (prev.value && isRangeQueryOperator(nextOperator)) {
    next.field = NO_FIELD
  }
  return next
}