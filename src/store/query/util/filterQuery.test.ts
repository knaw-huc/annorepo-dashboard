import { assert, describe, expect, it } from "vitest";
import {
  ComparisonOperator,
  LogicalOperator,
} from "../../../model/query/operator/Operator.ts";
import { isComparisonSubquery } from "../../../model/query/QueryModel.ts";
import { createComparison } from "./test/createComparison.ts";
import { createLogical } from "./test/createLogical.ts";
import { filterQuery } from "./filterQuery.ts";
import { formsPropPath } from "../formsPropPath.ts";

describe(filterQuery.name, async () => {
  const eq = ComparisonOperator.equal;

  it("filters by value", async () => {
    const result = filterQuery(
      [createComparison("f", eq, "v"), createComparison("f2", eq, "v2")],
      (sq) => isComparisonSubquery(sq) && sq.form.value === "v2",
    );

    expect(result.length).toBe(1);
    const s1 = result[0];
    assert(isComparisonSubquery(s1.subquery));
    expect(s1.subquery.form.value).toBe("v2");
    expect(s1.path).toEqual([1]);
  });

  it("finds nested value", async () => {
    const result = filterQuery(
      [
        createLogical(LogicalOperator.and, [
          createComparison("f", eq, "v"),
          createComparison("f2", eq, "v2"),
        ]),
      ],
      (sq) => isComparisonSubquery(sq) && sq.form.value === "v2",
    );

    expect(result.length).toBe(1);
    const s1 = result[0];
    assert(isComparisonSubquery(s1.subquery));
    expect(s1.subquery.form.value).toBe("v2");
    expect(s1.path).toEqual([0, formsPropPath, 1]);
  });
});
