import { orThrow } from "../../../../util/orThrow.ts";
import { QueryValue } from "../QueryValue.ts";
import { comparisonOperatorValueType } from "../comparisonOperatorValueType.ts";
import { QueryValueMapper } from "../QueryValueMapper.ts";
import { queryValueMappers } from "../queryValueMappers.ts";
import { ComparisonOperator } from "../../operator/Operator.ts";

/**
 * @see queryValueMappers
 */
export function findMapperByOperator(operator: ComparisonOperator) {
  const byOperator = (operator: ComparisonOperator) => {
    return (config: QueryValueMapper<QueryValue>) => {
      // Use first option by default:
      return config.type === comparisonOperatorValueType[operator][0];
    };
  };
  return (
    queryValueMappers.find(byOperator(operator)) ??
    orThrow(`Could not find mapping by operator ${operator}`)
  );
}
