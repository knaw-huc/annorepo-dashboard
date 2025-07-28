import { assert, describe, expect, it } from "vitest";
import {
  LogicalOperator,
  Operator,
} from "../../../model/query/operator/Operator.ts";
import {
  ComparisonSubquery,
  isComparisonSubquery,
  isLogicalSubquery,
  LogicalSubquery,
  Subquery,
} from "../../../model/query/QueryModel.ts";
import { pruneQuery } from "./pruneQuery.ts";

describe(pruneQuery.name, async () => {
  const eq = Operator.equal;

  it("prunes by value", async () => {
    const result = pruneQuery(
      [testCompare("f", eq, "v"), testCompare("f2", eq, "v2")],
      (sq) => isComparisonSubquery(sq) && sq.form.value === "v2",
    );

    expect(result.length).toBe(1);
    const s1 = result[0];
    assert(isComparisonSubquery(s1));
    expect(s1.form.value).toBe("v");
  });

  it("prunes nested value", async () => {
    const result = pruneQuery(
      [
        testLogical(LogicalOperator.and, [
          testCompare("f", eq, "v"),
          testCompare("f2", eq, "v2"),
        ]),
      ],
      (sq) => isComparisonSubquery(sq) && sq.form.value === "v2",
    );

    assert(isLogicalSubquery(result[0]));
    const s1 = result[0].forms[0];
    assert(isComparisonSubquery(s1));
    expect(s1.form.value).toBe("v");
  });
});

function testLogical(or: LogicalOperator, forms: Subquery[]): LogicalSubquery {
  return {
    type: "logical",
    operator: or,
    error: "",
    forms,
  };
}

function testCompare(
  field: string,
  operator: Operator,
  value: string,
): ComparisonSubquery {
  return {
    type: "comparison",
    form: {
      field,
      operator,
      value,
      valueType: "string",
    },
    errors: {
      field: "",
      operator: "",
      value: "",
      valueType: "",
    },
    param: false,
  };
}
