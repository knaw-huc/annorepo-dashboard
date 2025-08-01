import {
  ArComparisonEntry,
  ArQueryEntry,
  isArRangeQueryValue,
  NO_FIELD,
} from "../../../model/ArModel.ts";
import { isNumber, isPlainObject, isString } from "lodash";
import { ComparisonForm } from "../../../model/query/QueryModel.ts";
import { findMapperByOperator } from "../../../model/query/value/util/findMapperByOperator.ts";
import { QueryValue } from "../../../model/query/value/QueryValue.ts";
import { ComparisonOperator } from "../../../model/query/operator/Operator.ts";
import { isRangeQueryOperator } from "../../../model/query/operator/RangeQueryOperator.ts";
import { isNonFnOperator } from "../../../model/query/operator/NonFnQueryOperator.ts";
import { QueryValueType } from "../../../model/query/value/QueryValueType.ts";
import { findParam } from "./findParam.ts";
import { Any } from "../../../model/Any.ts";
/**
 * TODO: handle single <> and double <<>> parameters properly
 */
export function toComparisonForm(
  entry: ArComparisonEntry,
  // Query entry contains param when passing a template:
  paramNames?: string[],
): ComparisonForm {
  const [queryKey, queryValue] = entry;
  let field: string;
  let value: QueryValue;
  let operator: ComparisonOperator;
  let valueType: QueryValueType;

  if (isRangeQueryOperator(queryKey)) {
    // Range function query:

    field = NO_FIELD;
    operator = queryKey as ComparisonOperator;
    if (findParam(queryValue, paramNames)) {
      const mapper = findMapperByOperator(operator);
      value = mapper.defaultValue;
      valueType = mapper.type;
    } else if (isArRangeQueryValue(queryValue)) {
      value = queryValue;
      valueType = "range";
    } else {
      throwUnexpected(queryValue, "range", entry);
    }
  } else if (isString(queryValue)) {
    // Simple query:

    field = queryKey;
    operator = ComparisonOperator.simpleQuery;
    if (findParam(queryValue, paramNames)) {
      const mapper = findMapperByOperator(ComparisonOperator.simpleQuery);
      value = mapper.defaultValue;
      valueType = mapper.type;
    } else {
      if (isNumber(queryValue)) {
        value = queryValue;
        valueType = "number";
      } else if (isString(queryValue)) {
        value = queryValue;
        valueType = "string";
      } else {
        throwUnexpected(queryValue, "number or string", entry);
      }
    }
  } else {
    // Operator query:

    field = queryKey;
    if (!isPlainObject(queryValue)) {
      throwUnexpected(queryValue, "object", entry);
    }
    const [queryObjectKey, queryObjectValue] = Object.entries(
      queryValue as object,
    )[0];
    if (!isNonFnOperator(queryObjectKey)) {
      throwUnexpected(queryObjectKey, "non-function operator", entry);
    }
    operator = queryObjectKey;
    if (findParam(queryObjectValue, paramNames)) {
      const mapper = findMapperByOperator(operator);
      value = mapper.defaultValue;
      valueType = mapper.type;
    } else if (isNumber(queryObjectValue)) {
      value = queryObjectValue;
      valueType = "number";
    } else if (isString(queryObjectValue)) {
      value = queryObjectValue;
      valueType = "string";
    } else {
      throwUnexpected(queryObjectValue, "number or string", entry);
    }
  }

  return {
    field,
    operator,
    value,
    valueType,
  };
}

function throwUnexpected(
  got: Any,
  expected: string,
  entry: ArQueryEntry,
): never {
  throw new Error(
    `Expected ${expected} but got ${JSON.stringify(got)} in ${JSON.stringify(
      entry,
    )}`,
  );
}
