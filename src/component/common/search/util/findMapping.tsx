import {
  QueryOperator,
  queryOperatorValueType,
  QueryValue,
  queryValueMapping,
  QueryValuesConfig
} from "../../../../client/ArModel.ts";
import {orThrow} from "../../../../util/orThrow.ts";

export function findMapping(operator: QueryOperator) {
  const byOperator = (operator: QueryOperator) => {
    return (config: QueryValuesConfig<QueryValue>) => {
      return config.type === queryOperatorValueType[operator];
    };
  }
  return queryValueMapping.find(byOperator(operator))
    ?? orThrow(`Could not find mapping by operator ${operator}`);
}