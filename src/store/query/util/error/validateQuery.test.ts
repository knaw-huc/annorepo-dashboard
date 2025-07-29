import { describe, expect, it } from "vitest";
import { validateQuery } from "./validateQuery.ts";
import { LogicalOperator } from "../../../../model/query/operator/Operator.ts";

describe(validateQuery.name, () => {
  it("validates empty query", () => {
    const result = validateQuery([]);
    const noError = "";
    expect(result).toBe(noError);
  });

  it("returns error on two adjacent :ors", () => {
    const or = LogicalOperator.or;
    const result = validateQuery([
      { type: "logical", forms: [], operator: or, queryError: "" },
      { type: "logical", forms: [], operator: or, queryError: "" },
    ]);
    expect(result).toBe("':or' already exists.");
  });
});
