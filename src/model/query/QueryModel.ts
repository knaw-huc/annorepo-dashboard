import { QueryValue } from "./value/QueryValue.ts";
import { LogicalOperator, Operator } from "./operator/Operator.ts";
import { QueryValueType } from "./value/QueryValueType.ts";
import { ErroneousValue, ErrorRecord } from "./ErrorRecord.ts";
import { ParamValue } from "./ParamValue.ts";

export type ValidatedQueryForms = Subquery[];

export type Subquery = LogicalSubquery | ComparisonSubquery;

export type ComparisonSubquery = {
  type: "comparison";
  form: ComparisonForm;

  /**
   * - Meaning of param in a global query: nothing
   * - Meaning of param in a custom query:
   *   - false: form value is not a parameter and has a static value
   *   - truthy param: form value is the value of param
   */
  param: ParamValue;

  errors: ErrorRecord<ComparisonForm>;
};

export function isComparisonSubQuery(
  toTest: Subquery,
): toTest is ComparisonSubquery {
  return (toTest as ComparisonSubquery).type === "comparison";
}

export type LogicalSubquery = {
  type: "logical";
  operator: LogicalOperator;
  forms: Subquery[];
};

export function isLogicalSubQuery(toTest: Subquery): toTest is LogicalSubquery {
  return (toTest as LogicalSubquery).type === "logical";
}

export type SubQueryForm = LogicalForm | ComparisonForm;

export type LogicalForm = {
  operator: LogicalOperator;
  forms: SubQueryForm[];
};

export type ComparisonForm = {
  field: string;
  operator: Operator;
  value: QueryValue | ErroneousValue;
  valueType: QueryValueType;
};
