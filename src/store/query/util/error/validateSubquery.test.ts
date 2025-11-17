import { describe, expect, it } from "vitest";
import {
  ComparisonOperator,
  LogicalOperator,
} from "../../../../model/query/operator/Operator.ts";
import { validateSubquery } from "./validateSubquery.ts";
import { LogicalSubquery } from "../../../../model/query/QueryModel.ts";
import { createLogical } from "../test/createLogical.ts";
import { createComparison } from "../test/createComparison.ts";

import { formsPropPath } from "../../formsPropPath.ts";

describe(validateSubquery.name, () => {
  const { and, or } = LogicalOperator;
  const { equal } = ComparisonOperator;
  const dummy = createComparison("dummy", equal, "value");

  it("sets error on two adjacent :ors", () => {
    const toValidate: LogicalSubquery = {
      type: "logical",
      forms: [dummy],
      operator: or,
      queryError: "",
    };
    validateSubquery(
      [1],
      [
        { type: "logical", forms: [dummy], operator: or, queryError: "" },
        toValidate,
      ],
    );
    expect(toValidate.queryError).toBe("':or' already exists.");
  });

  it("ignores already erroneous subquery", () => {
    const andToValidate: LogicalSubquery = {
      type: "logical",
      forms: [],
      operator: and,
      queryError: "",
    };
    validateSubquery(
      [2],
      [
        { type: "logical", forms: [], operator: or, queryError: "" },
        {
          type: "logical",
          forms: [],
          operator: or,
          queryError: "':or' already exists.",
        },
        andToValidate,
      ],
    );
    expect(andToValidate.queryError).toBe("");
  });

  it("invalidates second erroneous value ignoring first", () => {
    const andToValidate: LogicalSubquery = {
      type: "logical",
      forms: [dummy],
      operator: and,
      queryError: "",
    };
    validateSubquery(
      [3],
      [
        { type: "logical", forms: [dummy], operator: or, queryError: "" },
        {
          type: "logical",
          forms: [dummy],
          operator: or,
          queryError: "':or' already exists.",
        },
        { type: "logical", forms: [dummy], operator: and, queryError: "" },
        andToValidate,
      ],
    );
    expect(andToValidate.queryError).toBe("':and' already exists.");
  });

  /**
   * Fields can have the same name in nested subqueries:
   * no merging into single record, so no crashing json object keys
   */
  it("validates nested fields with same name", () => {
    const duplicateField = "field";
    const toValidate = createComparison(duplicateField, equal, "value");
    validateSubquery(
      [0, formsPropPath, 1],
      [createLogical(and, [dummy, toValidate])],
    );
    expect(toValidate.errors.field).toBe("");
  });
});
