import {QueryValue} from "./value/QueryValue.ts";
import {LogicalOperator, Operator} from "./operator/Operator.ts";
import {QueryValueType} from "./value/QueryValueType.ts";
import {ErroneousValue, ErrorRecord} from "./ErrorRecord.ts";

export type QueryForm =
  | LogicalSubQuery
  | ComparisonSubQuery

export type QueryFormWithErrors =
  | LogicalSubQueryWithErrors
  | ComparisonSubQueryWithErrors

export type LogicalSubQueryWithErrors = {
  operator: LogicalOperator,
  forms: ComparisonSubQueryWithErrors,
}

export type ComparisonSubQueryWithErrors = {
  form: ComparisonSubQuery,
  errors: ErrorRecord<QueryFormWithErrors>
}

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
export type ComparisonSubQueryErrors = ErrorRecord<ComparisonSubQuery>;

export function isComparisonSubQuery(toTest: QueryForm): toTest is ComparisonSubQuery {
  return (toTest as ComparisonSubQuery).valueType !== undefined
}

