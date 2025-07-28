import { assert, describe, expect, it } from "vitest";
import {
  LogicalOperator,
  ComparisonOperator,
} from "../../../model/query/operator/Operator.ts";
import {
  isComparisonSubquery,
  isLogicalSubquery,
} from "../../../model/query/QueryModel.ts";
import { pruneQuery } from "./pruneQuery.ts";
import { createComparison } from "./test/createComparison.ts";
import { createLogical } from "./test/createLogical.ts";

describe(pruneQuery.name, async () => {
  const eq = ComparisonOperator.equal;

  it("prunes by value", async () => {
    const result = pruneQuery(
      [createComparison("f", eq, "v"), createComparison("f2", eq, "v2")],
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
        createLogical(LogicalOperator.and, [
          createComparison("f", eq, "v"),
          createComparison("f2", eq, "v2"),
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
