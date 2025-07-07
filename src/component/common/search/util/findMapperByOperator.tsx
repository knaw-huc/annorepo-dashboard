import {orThrow} from "../../../../util/orThrow.ts";
import {QueryValue} from "../../../../model/query/value/QueryValue.ts";
import {
  queryOperatorValueType
} from "../../../../model/query/value/queryOperatorValueType.ts";
import {QueryValuesConfig} from "../../../../model/query/value/QueryValuesConfig.ts";
import {queryValueMappers} from "../../../../model/query/value/queryValueMappers.ts";
import {QueryOperator} from "../../../../model/query/operator/QueryOperator.ts";

export function findMapperByOperator(operator: QueryOperator) {
  const byOperator = (operator: QueryOperator) => {
    return (config: QueryValuesConfig<QueryValue>) => {
      // Use first option by default:
      return config.type === queryOperatorValueType[operator][0];
    };
  }
  return queryValueMappers.find(byOperator(operator))
    ?? orThrow(`Could not find mapping by operator ${operator}`);
}