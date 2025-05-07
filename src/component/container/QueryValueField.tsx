import {
  QueryOperator,
  queryOperatorValue,
  QueryValue,
  queryValueConfigs,
  QueryValuesConfig,
  SearchQuery
} from "../../client/ArModel.ts";
import {InputWithLabel} from "../common/form/InputWithLabel.tsx";
import {FieldQueryForm} from "./ContainerSearchForm.tsx";
import {useEffect, useState} from "react";
import {orThrow} from "../../util/orThrow.ts";
import {isEqual} from "lodash";

export function QueryValueField(props: {
  operator: QueryOperator,
  queryValue: QueryValue
  onChange: (value: QueryValue) => void
  error: string
  onError: (error: string) => void
}) {

  const [formValue, setFormValue] = useState<string>(
    convertQueryValueToString(props.queryValue)
  );

  useEffect(() => {
    const isFormValueEqualToQuery = isEqual(
      convertStringToQueryValue(formValue, props.queryValue),
      props.queryValue
    );
    if (!isFormValueEqualToQuery) {
      setFormValue(convertQueryValueToString(props.queryValue))
    }
  }, [props.queryValue]);

  function handleChange(update: string) {
    setFormValue(update);
    try {
      const queryUpdate = convertStringToQueryValue(update, props.queryValue);
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

function findQueryConfigByValue(
  queryValue: QueryValue
): QueryValuesConfig<QueryValue> {
  return queryValueConfigs.find(c => c.typeguard(queryValue))
    ?? orThrow(`Unknown type of query value: ${queryValue}`);
}

function convertQueryValueToString(
  queryValue: QueryValue
): string {
  return findQueryConfigByValue(queryValue)
    .toString(queryValue)
}

function convertStringToQueryValue(
  inputValue: string,
  queryValue: QueryValue
): QueryValue {
  return findQueryConfigByValue(queryValue)
    .toValue(inputValue)
}

export function convertQueryValueByOperator(
  currentValue: QueryValue,
  nextOperator: QueryOperator,
): QueryValue {
  const currentValueConfig = findQueryConfigByValue(currentValue)
  const currentType = queryOperatorValue[nextOperator]
  if (currentValueConfig.type === currentType) {
    return currentValue
  } else {
    return queryValueConfigs.find(t => t.type === currentType)?.defaultValue
      ?? orThrow(`No default found for ${currentType}`)
  }
}

export function convertFormToQuery(
  form: FieldQueryForm
): SearchQuery {
  if (form.operator === QueryOperator.simpleQuery) {
    return {[form.field]: `${form.value}`}
  }
  return {[form.field]: {[form.operator]: form.value}}
}