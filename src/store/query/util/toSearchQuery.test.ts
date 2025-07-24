import { describe, expect, it } from "vitest";
import {
  LogicalOperator,
  Operator,
} from "../../../model/query/operator/Operator.ts";
import { toSearchQuery } from "./toSearchQuery.ts";
import { ComparisonForm } from "../../../model/query/QueryModel.ts";

function testForm(field: string, eq: Operator, value: string): ComparisonForm {
  return { field: field, operator: eq, value: value, valueType: "string" };
}

describe(toSearchQuery.name, async () => {
  const or = LogicalOperator.or;
  const eq = Operator.equal;
  const noErrors = {
    field: "",
    operator: "",
    value: "",
    valueType: "",
  };

  it("converts :or", async () => {
    const result = toSearchQuery(
      [
        {
          type: "logical",
          operator: or,
          error: "",
          forms: [
            {
              type: "comparison",
              form: testForm("f", eq, "v"),
              errors: noErrors,
              param: false,
            },
            {
              type: "comparison",
              form: testForm("f2", eq, "v2"),
              errors: noErrors,
              param: false,
            },
          ],
        },
      ],
      false,
    );
    // TODO: fix this test:
    expect(result).toBe({
      ":or": [{ f: { ":=": "v" } }, { f2: { ":=": "v2" } }],
    });
  });
});
