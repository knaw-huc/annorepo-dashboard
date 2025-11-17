import { describe, expect, it } from "vitest";
import { validateQuery } from "./validateQuery.ts";
import {
  ComparisonOperator,
  LogicalOperator,
} from "../../../../model/query/operator/Operator.ts";
import { createComparison } from "../test/createComparison.ts";

describe(validateQuery.name, () => {
  it("validates empty query", () => {
    const result = validateQuery([]);
    const noError = "";
    expect(result).toBe(noError);
  });

  it("returns error on two adjacent :ors", () => {
    const dummy = createComparison("dummy", ComparisonOperator.equal, "value");

    const or = LogicalOperator.or;
    const result = validateQuery([
      { type: "logical", forms: [dummy], operator: or, queryError: "" },
      { type: "logical", forms: [dummy], operator: or, queryError: "" },
    ]);
    expect(result).toBe("':or' already exists.");
  });
});
