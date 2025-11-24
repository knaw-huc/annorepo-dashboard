import { ComparisonForm } from "../../../../model/query/QueryModel.ts";
import { ComparisonOperator } from "../../../../model/query/operator/Operator.ts";
import { findMapperByValueType } from "../../../../model/query/value/util/findMapperByValueType.ts";
import { comparisonOperatorValueType } from "../../../../model/query/value/comparisonOperatorValueType.ts";
import { queryValueMappers } from "../../../../model/query/value/queryValueMappers.ts";
import { orThrow } from "../../../../util/orThrow.ts";
import { isRangeQueryOperator } from "../../../../model/query/operator/RangeQueryOperator.ts";
import { NO_FIELD } from "../../../../model/ArModel.ts";

export function alignFormWithOperator(
  prev: ComparisonForm,
  nextOperator: ComparisonOperator,
): ComparisonForm {
  const currentMapping = findMapperByValueType(prev.valueType);

  // Use first option by default:
  const nextType = comparisonOperatorValueType[nextOperator][0];

  const next: ComparisonForm = {
    ...prev,
    operator: nextOperator,
    valueType: nextType,
  };
  if (currentMapping.type === nextType) {
    next.inputValue = prev.inputValue;
  } else {
    const nextMapper =
      queryValueMappers.find((m) => m.type === nextType) ??
      orThrow(`No default found for ${nextType}`);
    next.inputValue = nextMapper.toInputValue(nextMapper.defaultValue);
  }
  if (prev.inputValue && isRangeQueryOperator(nextOperator)) {
    next.field = NO_FIELD;
  }
  return next;
}
