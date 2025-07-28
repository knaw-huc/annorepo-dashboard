import { assert, describe, expect, it } from "vitest";
import {
  isComparisonSubquery,
  isLogicalSubquery,
  LogicalSubquery,
  Subquery,
} from "../../../model/query/QueryModel.ts";
import {
  LogicalOperator,
  Operator,
} from "../../../model/query/operator/Operator.ts";
import { ArLogicalEntry } from "../../../model/ArModel.ts";
import { toSubquery } from "./toQuery.ts";

describe(toSubquery.name, async () => {
  const eq = Operator.equal;
  const or = LogicalOperator.or;
  const noComparisonErrors = {
    field: "",
    operator: "",
    value: "",
    valueType: "",
  };

  it("converts :or", async () => {
    const entry: ArLogicalEntry = [or, { f: { [eq]: "v" } }];

    const result: Subquery = toSubquery(entry);

    const expectedOrSubquery: LogicalSubquery = {
      type: "logical",
      forms: [
        {
          type: "comparison",
          form: { field: "f", operator: eq, value: "v", valueType: "string" },
          errors: noComparisonErrors,
          param: false,
        },
      ],
      operator: or,
      error: "",
    };
    expect(result).toEqual(expectedOrSubquery);
  });

  it("converts :and with two operant forms", async () => {
    const entry: ArLogicalEntry = [
      LogicalOperator.and,
      {
        f: { [eq]: "v" },
        f2: { [eq]: "v2" },
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
