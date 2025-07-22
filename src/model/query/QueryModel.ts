import {QueryValue} from "./value/QueryValue.ts";
import {LogicalOperator, Operator} from "./operator/Operator.ts";
import {QueryValueType} from "./value/QueryValueType.ts";
import {ErroneousValue, ErrorRecord} from "./ErrorRecord.ts";
import {FormParamValue} from "./FormParamValue.ts";

export type ValidatedQueryForms = ValidatedQuery[];

export type ValidatedQuery =
  | ValidatedLogicalSubQuery
  | ValidatedComparisonSubQuery;

export type ValidatedComparisonSubQuery = {
  type: "comparison";
  form: ComparisonSubQueryForm;

  /**
   * - Meaning of param in a global query: nothing
   * - Meaning of param in a custom query:
   *   - false: form value is not a parameter and has a static value
   *   - truthy param: form value is the value of param
   */
  param: FormParamValue

  errors: ErrorRecord<ComparisonSubQueryForm>;
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

export type SubQueryForm = LogicalSubQueryForm | ComparisonSubQueryForm;

export type LogicalSubQueryForm = {
  operator: LogicalOperator;
  forms: SubQueryForm[];
};

export type ComparisonSubQueryForm = {
  field: string;
  operator: Operator;
  value: QueryValue | ErroneousValue;
  valueType: QueryValueType;
};
