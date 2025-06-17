import {
  QueryOperator,
  queryOperatorValueType,
  QueryValue,
  queryValueMappers,
  QueryValuesConfig
} from "../../../../client/ArModel.ts";
import {orThrow} from "../../../../util/orThrow.ts";

export function findMapper(operator: QueryOperator) {
  const byOperator = (operator: QueryOperator) => {
    return (config: QueryValuesConfig<QueryValue>) => {
      return config.type === queryOperatorValueType[operator];
    };
  }
  return queryValueMappers.find(byOperator(operator))
    ?? orThrow(`Could not find mapping by operator ${operator}`);
}