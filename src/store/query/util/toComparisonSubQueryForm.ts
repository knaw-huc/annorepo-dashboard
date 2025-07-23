import {
  ArQueryEntry,
  isArRangeQueryValue,
  NO_FIELD
} from "../../../model/ArModel.ts";
import {isNumber, isPlainObject, isString} from "lodash";
import {ComparisonSubQueryForm} from "../../../model/query/QueryModel.ts";
import {
  findMapperByOperator
} from "../../../model/query/value/util/findMapperByOperator.ts";
import {QueryValue} from "../../../model/query/value/QueryValue.ts";
import {Operator} from "../../../model/query/operator/Operator.ts";
import {
  isRangeQueryOperator
} from "../../../model/query/operator/RangeQueryOperator.ts";
import {
  isNonFnOperator
} from "../../../model/query/operator/NonFnQueryOperator.ts";
import {QueryValueType} from "../../../model/query/value/QueryValueType.ts";
import {findParam} from "./findParam.ts";

export function toComparisonSubQueryForm(
  entry: ArQueryEntry,
  // Query entry contains param when passing a template:
  paramNames?: string[]
): ComparisonSubQueryForm {
  const [queryKey, queryValue] = entry
  let field: string;
  let value: QueryValue;
  let operator: Operator
  let valueType: QueryValueType

  if (isRangeQueryOperator(queryKey)) {
    // Range function query:

    field = NO_FIELD
    operator = queryKey as Operator
    if (findParam(queryValue, paramNames)) {

      /**
       * TODO: are number params supported?
       *  And if so: how to find the correct type?
       */
      const mapper = findMapperByOperator(operator);
      value = mapper.defaultValue
      valueType = mapper.type
    } else if (isArRangeQueryValue(queryValue)) {
      value = queryValue
      valueType = 'range'
    } else {
      throwUnexpected(queryValue, 'range', entry);
    }
  } else if (isString(queryValue)) {
    // Simple query:

    field = queryKey
    operator = Operator.simpleQuery
    if (findParam(queryValue, paramNames)) {
      const mapper = findMapperByOperator(Operator.simpleQuery);
      value = mapper.defaultValue
      valueType = mapper.type
    } else {
      if (isNumber(queryValue)) {
        value = queryValue
        valueType = 'number'
      } else if (isString(queryValue)) {
        value = queryValue
        valueType = 'string'
      } else {
        throwUnexpected(queryValue, 'number or string', entry);
      }
    }
  } else {
    // Operator query:

    field = queryKey
    if (!isPlainObject(queryValue)) {
      throwUnexpected(queryValue, 'object', entry);
    }
    const [
      queryObjectKey,
      queryObjectValue
    ] = Object.entries(queryValue as object)[0]
    if (!isNonFnOperator(queryObjectKey)) {
      throwUnexpected(queryObjectKey, 'non-function operator', entry);
    }
    operator = queryObjectKey
    if (findParam(queryObjectValue, paramNames)) {
      const mapper = findMapperByOperator(operator);
      value = mapper.defaultValue
      valueType = mapper.type
    } else if (isNumber(queryObjectValue)) {
      value = queryObjectValue
      valueType = 'number'
    } else if (isString(queryObjectValue)) {
      value = queryObjectValue
      valueType = 'string'
    } else {
      throwUnexpected(queryObjectValue, 'number or string', entry);
    }
  }

  return {
    field,
    operator,
    value,
    valueType
  } satisfies object;
}

function throwUnexpected(
  got: any,
  expected: string,
  entry: ArQueryEntry
): never {
  throw new Error(`Expected ${
    expected
  } but got ${
    JSON.stringify(got)
  } in ${
    JSON.stringify(entry)
  }`)
}


