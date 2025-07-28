import { describe, expect, it } from "vitest";
import {
  LogicalOperator,
  Operator,
} from "../../../model/query/operator/Operator.ts";
import { toSearchQuery } from "./toSearchQuery.ts";
import {
  ComparisonSubquery,
  LogicalSubquery,
  Subquery,
} from "../../../model/query/QueryModel.ts";

describe(toSearchQuery.name, async () => {
  const { or, and } = LogicalOperator;
  const eq = Operator.equal;

  it("converts :or", async () => {
    const f = testCompare("f", eq, "v");
    const f2 = testCompare("f2", eq, "v2");
    const toTest = testLogical(or, [f, f2]);
    const result = toSearchQuery([toTest], false);

    expect(result).toEqual({
      ":or": [{ f: { ":=": "v" } }, { f2: { ":=": "v2" } }],
    });
  });

  it("converts :and", async () => {
    const result = toSearchQuery(
      [
        testLogical(and, [
          testCompare("f", eq, "v"),
          testCompare("f2", eq, "v2"),
        ]),
      ],
      false,
    );
    expect(result).toEqual({
      ":and": [{ f: { ":=": "v" } }, { f2: { ":=": "v2" } }],
    });
  });
  it("converts :and with two :ors", async () => {
    const result = toSearchQuery(
      [
        testLogical(and, [
          testLogical(or, [
            testCompare("f", eq, "v"),
            testCompare("f2", eq, "v2"),
          ]),
          testLogical(or, [
            testCompare("f3", eq, "v3"),
            testCompare("f4", eq, "v4"),
          ]),
        ]),
      ],
      false,
    );
    expect(result).toEqual({
      ":and": [
        {
          ":or": [{ f: { ":=": "v" } }, { f2: { ":=": "v2" } }],
        },
        {
          ":or": [{ f3: { ":=": "v3" } }, { f4: { ":=": "v4" } }],
        },
      ],
    });
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
