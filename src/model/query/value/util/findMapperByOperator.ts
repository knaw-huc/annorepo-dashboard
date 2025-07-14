import {orThrow} from "../../../../util/orThrow.ts";
import {QueryValue} from "../QueryValue.ts";
import {
  queryOperatorValueType
} from "../queryOperatorValueType.ts";
import {QueryValuesConfig} from "../QueryValuesConfig.ts";
import {queryValueMappers} from "../queryValueMappers.ts";
import {QueryOperator} from "../../operator/QueryOperator.ts";

/**
 * @see queryValueMappers
 */
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