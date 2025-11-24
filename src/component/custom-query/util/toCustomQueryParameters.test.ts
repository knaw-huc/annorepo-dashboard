import { describe, expect, it } from "vitest";
import { Subquery } from "../../../model/query/QueryModel.ts";
import { toCustomQueryParameters } from "./toCustomQueryParameters.ts";
import {
  ComparisonOperator,
  LogicalOperator,
} from "../../../model/query/operator/Operator.ts";
import { createLogical } from "../../../store/query/util/test/createLogical.ts";
import { createComparison } from "../../../store/query/util/test/createComparison.ts";

describe(toCustomQueryParameters.name, async () => {
  it("converts nested param", async () => {
    const { and } = LogicalOperator;
    const { equal } = ComparisonOperator;
    const subqueries: Subquery[] = [
      createLogical(and, [createComparison("f", equal, "v", "0-forms-0-v")]),
    ];
    const result = toCustomQueryParameters(subqueries);
    // Stringified string results in double quotes:
    expect(result["0-forms-0-v"]).toEqual('"v"');
  });

  it("converts number", async () => {
    const { and } = LogicalOperator;
    const { equal } = ComparisonOperator;
    const comparison = createComparison("f", equal, 1, "0-forms-0-v");
    const subqueries: Subquery[] = [createLogical(and, [comparison])];
    const result = toCustomQueryParameters(subqueries);
    // Number as a string:
    expect(result["0-forms-0-v"]).toEqual("1");
  });
});
