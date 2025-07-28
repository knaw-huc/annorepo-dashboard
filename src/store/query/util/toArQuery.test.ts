import { describe, expect, it } from "vitest";
import {
  LogicalOperator,
  Operator,
} from "../../../model/query/operator/Operator.ts";
import { toArQuery } from "./toArQuery.ts";
import { createLogical } from "./test/createLogical.ts";
import { createComparison } from "./test/createComparison.ts";

describe(toArQuery.name, async () => {
  const { or, and } = LogicalOperator;
  const eq = Operator.equal;

  it("converts :or", async () => {
    const f = createComparison("f", eq, "v");
    const f2 = createComparison("f2", eq, "v2");
    const toTest = createLogical(or, [f, f2]);
    const result = toArQuery([toTest], false);

    expect(result).toEqual({
      ":or": [{ f: { ":=": "v" } }, { f2: { ":=": "v2" } }],
    });
  });

  it("converts :and", async () => {
    const result = toArQuery(
      [
        createLogical(and, [
          createComparison("f", eq, "v"),
          createComparison("f2", eq, "v2"),
        ]),
      ],
      false,
    );
    expect(result).toEqual({
      ":and": [{ f: { ":=": "v" } }, { f2: { ":=": "v2" } }],
    });
  });
  it("converts :and with two :ors", async () => {
    const result = toArQuery(
      [
        createLogical(and, [
          createLogical(or, [
            createComparison("f", eq, "v"),
            createComparison("f2", eq, "v2"),
          ]),
          createLogical(or, [
            createComparison("f3", eq, "v3"),
            createComparison("f4", eq, "v4"),
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
