import { describe, expect, it } from "vitest";
import { LogicalOperator } from "../../../model/query/operator/Operator.ts";
import { validateSubquery } from "./validateSubquery.ts";
import { LogicalSubquery } from "../../../model/query/QueryModel.ts";

describe(validateSubquery.name, () => {
  const { and, or } = LogicalOperator;

  it("returns error on two adjacent :ors", () => {
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

  it("validates second erroneous value ignoring first", () => {
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
});
