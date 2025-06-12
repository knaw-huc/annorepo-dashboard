import {
  QueryOperator,
  queryOperatorValueType,
  QueryValue,
  queryValueMapping,
  QueryValuesConfig
} from "../../../client/ArModel.ts";
import {InputWithLabel} from "../form/InputWithLabel.tsx";
import {orThrow} from "../../../util/orThrow.ts";
import {ErroneousValue} from "./QueryModel.ts";

export function QueryValueInput(props: {
  operator: QueryOperator,
  queryValue: QueryValue
  onChange: (value: QueryValue, error: string) => void
  error: string
  disabled?: boolean
}) {
  const {
    operator,
    queryValue,
    onChange,
    error,
    disabled
  } = props;
  function handleChange(update: string) {
    try {
      const queryUpdate = toQueryValue(update, operator);
      onChange(queryUpdate, '');
    } catch (e) {
      onChange(
        update as ErroneousValue,
        e instanceof Error ? e.message : "Invalid value"
      )
    }
  }

  return <InputWithLabel
    value={error ? queryValue as ErroneousValue : toQueryValueString(queryValue, operator)}
    label="Value"
    errorLabel={error}
    onChange={handleChange}
    disabled={disabled}
  />
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

