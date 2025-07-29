import { describe, expect, it } from "vitest";
import { LogicalOperator } from "../../../../model/query/operator/Operator.ts";
import { LogicalSubquery } from "../../../../model/query/QueryModel.ts";
import { revalidateInvalidSubqueries } from "./revalidateInvalidSubqueries.ts";

describe(revalidateInvalidSubqueries.name, () => {
  const { or } = LogicalOperator;

  it("revalidates error", () => {
    const toValidate: LogicalSubquery = {
      type: "logical",
      forms: [],
      operator: or,
      queryError: "':or' already exists.",
    };
    revalidateInvalidSubqueries([toValidate]);
    expect(toValidate.queryError).toBe("");
  });
});
