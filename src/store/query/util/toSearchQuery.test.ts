import { describe, expect, it } from "vitest";
import {
  LogicalOperator,
  Operator,
} from "../../../model/query/operator/Operator.ts";
import { toSearchQuery } from "./toSearchQuery.ts";
import { ComparisonSubquery } from "../../../model/query/QueryModel.ts";

describe(toSearchQuery.name, async () => {
  const or = LogicalOperator.or;
  const eq = Operator.equal;

  it("converts :or", async () => {
    const result = toSearchQuery(
      [
        {
          type: "logical",
          operator: or,
          error: "",
          forms: [testCompare("f", eq, "v"), testCompare("f2", eq, "v2")],
        },
      ],
      false,
    );
    // TODO: fix this test:
    expect(result).toEqual({
      ":or": [{ f: { ":=": "v" } }, { f2: { ":=": "v2" } }],
    });
  });
});

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
