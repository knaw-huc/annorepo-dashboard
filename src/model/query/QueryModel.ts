import { QueryValue } from "./value/QueryValue.ts";
import { LogicalOperator, Operator } from "./operator/Operator.ts";
import { QueryValueType } from "./value/QueryValueType.ts";
import { ErroneousValue, ErrorRecord } from "./ErrorRecord.ts";

export type ValidatedQueryForms = ValidatedQuery[];

export type ValidatedQuery =
  | ValidatedLogicalSubQuery
  | ValidatedComparisonSubQuery;

export type ValidatedComparisonSubQuery = {
  type: "comparison";
  form: ComparisonSubQuery;
  errors: ErrorRecord<ComparisonSubQuery>;
};
export function isValidatedComparisonSubQuery(
  toTest: ValidatedQuery,
): toTest is ValidatedComparisonSubQuery {
  return (toTest as ValidatedComparisonSubQuery).type === "comparison";
}

export type ValidatedLogicalSubQuery = {
  type: "logical";
  operator: LogicalOperator;
  forms: ValidatedQuery[];
};
export function isValidatedLogicalSubQuery(
  toTest: ValidatedQuery,
): toTest is ValidatedLogicalSubQuery {
  return (toTest as ValidatedLogicalSubQuery).type === "logical";
}

export type SubQuery = LogicalSubQuery | ComparisonSubQuery;

export type LogicalSubQuery = {
  operator: LogicalOperator;
  expressions: SubQuery[];
};

export type ComparisonSubQuery = {
  field: string;
  operator: Operator;
  value: QueryValue | ErroneousValue;
  valueType: QueryValueType;
};
