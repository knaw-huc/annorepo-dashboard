import {
  isQueryValueRange,
  QueryOperator,
  QueryValue, SearchQuery
} from "../../client/ArModel.ts";
import {isArray, isNumber, isString, toNumber} from "lodash";
import {InputWithLabel} from "../common/form/InputWithLabel.tsx";
import {FieldQueryForm} from "./ContainerSearchForm.tsx";

export function QueryValueField(props: {
  queryValue: QueryValue
  onChange: (value: QueryValue) => void
}) {
  const {queryValue, onChange} = props;

  function handleChange(update: string) {
    const queryInputUpdate = convertStringToQueryValue(update, queryValue);
    onChange(queryInputUpdate);
  }

  return <InputWithLabel
    value={convertQueryValueToString(queryValue)}
    label="Value"
    onChange={handleChange}
  />
}

function convertQueryValueToString(queryValue: QueryValue) {
  if (isString(queryValue)) {
    return queryValue;
  } else if (isNumber(queryValue)) {
    return `${queryValue}`
  } else if (isArray(queryValue)) {
    return JSON.stringify(queryValue)
  } else if (isQueryValueRange(queryValue)) {
    return JSON.stringify(queryValue)
  } else {
    throw new Error('Unknown input type: ' + queryValue)
  }
}

function convertStringToQueryValue(
  inputValue: string,
  queryValue: QueryValue
): QueryValue {
  if (isString(queryValue)) {
    return inputValue;
  } else if (isNumber(queryValue)) {
    return toNumber(inputValue)
  } else if (isArray(queryValue)) {
    return JSON.parse(inputValue)
  } else if (isQueryValueRange(queryValue)) {
    return JSON.parse(inputValue)
  } else {
    throw new Error('Unknown query type: ' + queryValue)
  }
}

export function convertValueByOperator(
  currentValue: QueryValue,
  nextOperator: QueryOperator,
): QueryValue {
  switch (nextOperator) {
    case QueryOperator.simpleQuery:
    case QueryOperator.equal:
    case QueryOperator.notEqual:
      if(isString(currentValue)) {
        return currentValue
      }
      return ''
    case QueryOperator.lessThan:
    case QueryOperator.lessThanOrEqual:
    case QueryOperator.greaterThan:
    case QueryOperator.greaterThanOrEqual:
      if(isNumber(currentValue)) {
        return currentValue
      }
      return 0
    case QueryOperator.isIn:
    case QueryOperator.isNotIn:
      if(isArray(currentValue)) {
        return currentValue
      }
      return ["foo"]
    case QueryOperator.isWithinTextAnchorRange:
    case QueryOperator.overlapsWithTextAnchorRange:
      if(isQueryValueRange(currentValue)) {
        return currentValue
      }
      return {source: "http://example.com", start: 0, end: 1}
    default:
      throw new Error(`Unknown operator: ${nextOperator}`)
  }
}

export function convertFormToQuery(form: FieldQueryForm): SearchQuery {
  switch (form.operator) {
    case QueryOperator.simpleQuery:
      return {[form.field]: `${form.value}`}
    case QueryOperator.equal:
      return {[form.field]: {[QueryOperator.equal]: `${form.value}`}}
    case QueryOperator.notEqual:
      return {[form.field]: {[QueryOperator.notEqual]: `${form.value}`}}
    case QueryOperator.lessThan:
      return {[form.field]: {[QueryOperator.lessThan]: toNumber(form.value)}}
    case QueryOperator.lessThanOrEqual:
      return {[form.field]: {[QueryOperator.lessThanOrEqual]: toNumber(form.value)}}
    case QueryOperator.greaterThan:
      return {[form.field]: {[QueryOperator.greaterThan]: toNumber(form.value)}}
    case QueryOperator.greaterThanOrEqual:
      return {[form.field]: {[QueryOperator.greaterThanOrEqual]: toNumber(form.value)}}
    case QueryOperator.isIn:
      return {[form.field]: {[QueryOperator.isIn]: form.value}}
    case QueryOperator.isNotIn:
      return {[form.field]: {[QueryOperator.isNotIn]: form.value}}
    case QueryOperator.isWithinTextAnchorRange:
      return {[form.field]: {[QueryOperator.isWithinTextAnchorRange]: form.value as unknown as string}}
    case QueryOperator.overlapsWithTextAnchorRange:
      return {[form.field]: {[QueryOperator.overlapsWithTextAnchorRange]: form.value as unknown as string}}
    default:
      throw new Error(`Unknown operator: ${form.operator}`)
  }
}