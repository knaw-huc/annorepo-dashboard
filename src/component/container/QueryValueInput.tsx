import {
  QueryOperator,
  queryOperatorValueType,
  QueryValue,
  queryValueMapping,
  QueryValuesConfig
} from "../../client/ArModel.ts";
import {InputWithLabel} from "../common/form/InputWithLabel.tsx";
import {useEffect, useState} from "react";
import {orThrow} from "../../util/orThrow.ts";
import {isEqual} from "lodash";

export function QueryValueInput(props: {
  operator: QueryOperator,
  queryValue: QueryValue
  onChange: (value: QueryValue) => void
  error: string
  onError: (error: string) => void
}) {

  const [formValue, setFormValue] = useState<string>(
    toQueryValueString(props.queryValue, props.operator)
  );

  useEffect(() => {
    const nextAsString = toQueryValueString(
      props.queryValue,
      props.operator
    );
    if (!isEqual(nextAsString, formValue)) {
      handleChange(nextAsString)
    }
  }, [props.queryValue]);

  useEffect(() => {
    const newValue = updateQueryValueAfterOperatorChange(
      props.queryValue,
      props.operator
    );
    const updatedValue = toQueryValueString(
      newValue,
      props.operator
    )
    handleChange(updatedValue)
  }, [props.operator]);

  function handleChange(update: string) {
    setFormValue(update);
    try {
      const queryUpdate = toQueryValue(update, props.operator);
      props.onChange(queryUpdate);
      props.onError("")
    } catch (e) {
      props.onError(e instanceof Error ? e.message : "Invalid value")
    }
  }

  return <InputWithLabel
    value={formValue}
    label="Value"
    errorLabel={props.error}
    onChange={handleChange}
  />
}

function findQueryMappingByValue(
  queryValue: QueryValue
) {
  return queryValueMapping.find(c => c.isType(queryValue))
    ?? orThrow(`Unknown type of query value: ${queryValue}`);
}

function findMapping(operator: QueryOperator) {
  const byOperator = (operator: QueryOperator) => {
    return (config: QueryValuesConfig<QueryValue>) => {
      return config.type === queryOperatorValueType[operator];
    };
  }

  return queryValueMapping.find(byOperator(operator))
    ?? orThrow(`Could not find mapping by operator ${operator}`);
}

function toQueryValueString(
  queryValue: QueryValue,
  operator: QueryOperator
): string {
  const mapping = findMapping(operator);
  return mapping.toString(queryValue)
}

function toQueryValue(
  inputValue: string,
  operator: QueryOperator
): QueryValue {
  const mapping = findMapping(operator);
  return mapping.toValue(inputValue)
}

function updateQueryValueAfterOperatorChange(
  currentValue: QueryValue,
  nextOperator: QueryOperator,
): QueryValue {
  const currentMapping = findQueryMappingByValue(currentValue)
  const nextType = queryOperatorValueType[nextOperator]
  if (currentMapping.type === nextType) {
    return currentValue
  } else {
    const nextMapping = queryValueMapping.find(t => t.type === nextType)
      ?? orThrow(`No default found for ${nextType}`);
    return nextMapping.defaultValue
  }
}
