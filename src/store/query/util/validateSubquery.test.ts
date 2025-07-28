import { describe, expect, it } from "vitest";
import {
  LogicalOperator,
  Operator,
} from "../../../model/query/operator/Operator.ts";
import { validateSubquery } from "./validateSubquery.ts";
import { LogicalSubquery } from "../../../model/query/QueryModel.ts";
import { createLogical } from "./test/createLogical.ts";
import { createComparison } from "./test/createComparison.ts";

describe(validateSubquery.name, () => {
  const { and, or } = LogicalOperator;
  const { equal } = Operator;
  it("sets error on two adjacent :ors", () => {
    const toValidate: LogicalSubquery = {
      type: "logical",
      forms: [],
      operator: or,
      error: "",
    };
    validateSubquery(toValidate, [
      { type: "logical", forms: [], operator: or, error: "" },
      toValidate,
    ]);
    expect(toValidate.error).toBe("':or' already exists.");
  });

  it("ignores already erroneous subquery", () => {
    const andToValidate: LogicalSubquery = {
      type: "logical",
      forms: [],
      operator: and,
      error: "",
    };
    validateSubquery(andToValidate, [
      { type: "logical", forms: [], operator: or, error: "" },
      {
        type: "logical",
        forms: [],
        operator: or,
        error: "':or' already exists.",
      },
      andToValidate,
    ]);
    expect(andToValidate.error).toBe("");
  });

  it("invalidates second erroneous value ignoring first", () => {
    const andToValidate: LogicalSubquery = {
      type: "logical",
      forms: [],
      operator: and,
      error: "",
    };
    validateSubquery(andToValidate, [
      { type: "logical", forms: [], operator: or, error: "" },
      {
        type: "logical",
        forms: [],
        operator: or,
        error: "':or' already exists.",
      },
      { type: "logical", forms: [], operator: and, error: "" },
      andToValidate,
    ]);
    expect(andToValidate.error).toBe("':and' already exists.");
  });

  /**
   * Fields can have the same name in nested subqueries:
   * no merging into single record, so no crashing json object keys
   */
  it("validates nested fields with same name", () => {
    const duplicateField = "field";
    const toValidate = createComparison(duplicateField, equal, "value");
    validateSubquery(toValidate, [
      createLogical(and, [
        createComparison(duplicateField, equal, "value"),
        toValidate,
      ]),
    ]);
    expect(toValidate.errors.field).toBe("");
  });
});
