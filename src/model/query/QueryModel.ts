import {QueryValue} from "./value/QueryValue.ts";
import {LogicalOperator, Operator} from "./operator/Operator.ts";
import {QueryValueType} from "./value/QueryValueType.ts";
import {ErroneousValue} from "./ErrorRecord.ts";

export type QueryForm =
  | LogicalSubQuery
  | ComparisonSubQuery

export type QueryForms = QueryForm[]

export type LogicalSubQuery = {
  operator: LogicalOperator
  expressions: ComparisonSubQuery[]
}
export function isLogicalSubQuery(toTest: QueryForm): toTest is LogicalSubQuery {
    return Array.isArray((toTest as LogicalSubQuery).expressions)
}

export type ComparisonSubQuery = {
  field: string,
  operator: Operator
  value: QueryValue | ErroneousValue
  valueType: QueryValueType
}
export function isComparisonSubQuery(toTest: QueryForm): toTest is ComparisonSubQuery {
  return (toTest as ComparisonSubQuery).valueType !== undefined
}

