import { assert, describe, expect, it } from "vitest";
import {
  isComparisonSubquery,
  isLogicalSubquery,
  Subquery,
} from "../../../model/query/QueryModel.ts";
import {
  LogicalOperator,
  Operator,
} from "../../../model/query/operator/Operator.ts";
import { ArLogicalEntry } from "../../../model/ArModel.ts";
import { toSubquery } from "./toSubquery.ts";
import { toSearchQuery } from "./toSearchQuery.ts";

describe(toSearchQuery.name, async () => {
  it("converts :or", async () => {
    const entry: ArLogicalEntry = [
      LogicalOperator.or,
      { f: { [Operator.equal]: "v" } },
    ];

    const result: Subquery = toSubquery(entry);

    const isEqualSubquery = {
      errors: { field: "", operator: "", value: "", valueType: "" },
      form: { field: "f", operator: ":=", value: "v", valueType: "string" },
      param: false,
      type: "comparison",
    };
    const orSubquery = {
      forms: [isEqualSubquery],
      operator: ":or",
      type: "logical",
    };
    expect(result).toEqual(orSubquery);
  });

  it("converts :and with two operant forms", async () => {
    const entry: ArLogicalEntry = [
      LogicalOperator.and,
      {
        f: { [Operator.equal]: "v" },
        f2: { [Operator.equal]: "v2" },
      },
    ];

    const result: Subquery = toSubquery(entry);
    assert(isLogicalSubquery(result));
    expect(result.operator).toEqual(":and");
    expect(result.forms.length).toEqual(2);

    const subquery1 = result.forms[0];
    assert(isComparisonSubquery(subquery1));
    expect(subquery1.form.field).toBe("f");

    const subquery2 = result.forms[1];
    assert(isComparisonSubquery(subquery2));
    expect(subquery2.form.field).toBe("f2");
  });
});
