import {orThrow} from "../../../../util/orThrow.ts";
import {QueryValue} from "../QueryValue.ts";
import {
  queryOperatorValueType
} from "../queryOperatorValueType.ts";
import {QueryValueMapper} from "../QueryValueMapper.ts";
import {queryValueMappers} from "../queryValueMappers.ts";
import {Operator} from "../../operator/Operator.ts";

/**
 * @see queryValueMappers
 */
export function findMapperByOperator(operator: Operator) {
  const byOperator = (operator: Operator) => {
    return (config: QueryValueMapper<QueryValue>) => {
      // Use first option by default:
      return config.type === queryOperatorValueType[operator][0];
    };
  }
  return queryValueMappers.find(byOperator(operator))
    ?? orThrow(`Could not find mapping by operator ${operator}`);
}