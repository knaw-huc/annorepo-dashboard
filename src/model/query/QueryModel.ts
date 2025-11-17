// QueryModel.ts - Updated types with isPristine

import { QueryValue } from "./value/QueryValue.ts";
import { ComparisonOperator, LogicalOperator } from "./operator/Operator.ts";
import { QueryValueType } from "./value/QueryValueType.ts";
import { ErroneousValue, ErrorRecord } from "./ErrorRecord.ts";
import { ParamValue } from "./ParamValue.ts";
import { Any } from "../Any.ts";

export type Subquery = LogicalSubquery | ComparisonSubquery;
export function isSubquery(toTest: Any): toTest is Subquery {
  return (
    (toTest as Subquery).type === "logical" ||
    (toTest as Subquery).type === "comparison"
  );
}

export type ComparisonSubquery = BaseSubquery & {
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

  /**
   * Mark subquery that is clean and has not been modified:
   * - it is not validated, so it does not trigger errors in UI
   * - it is not included in AR-query, so it does not create errors
   */
  isPristine: boolean;
};

export function isComparisonSubquery(
  toTest: Subquery,
): toTest is ComparisonSubquery {
  return (toTest as ComparisonSubquery).type === "comparison";
}

export type BaseSubquery = {
  /**
   * Does subquery introduce error when validating
   * it inside the context of the whole query?
   * See {@link validateSubquery}
   */
  queryError: string;
};

export type LogicalSubquery = BaseSubquery & {
  type: "logical";
  operator: LogicalOperator;
  forms: Subquery[];
  queryError: string;
};

export function isLogicalSubquery(toTest: Subquery): toTest is LogicalSubquery {
  return (toTest as LogicalSubquery).type === "logical";
}

export type SubQueryForm = LogicalForm | ComparisonForm;

export type LogicalForm = {
  operator: LogicalOperator;
  forms: SubQueryForm[];
};

export type ComparisonForm = {
  field: string;
  operator: ComparisonOperator;
  value: QueryValue | ErroneousValue;
  valueType: QueryValueType;
};
