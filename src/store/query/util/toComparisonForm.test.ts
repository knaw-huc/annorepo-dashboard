import { describe, expect, it } from "vitest";
import { toComparisonForm } from "./toComparisonForm.ts";
import { ComparisonForm } from "../../../model/query/QueryModel.ts";
import { defaultQuery } from "../../../model/query/defaultQuery.ts";
import { ComparisonOperator } from "../../../model/query/operator/Operator.ts";
import {
  ArExtendedEntry,
  ArRangeEntry,
  ArSimpleEntry,
} from "../../../model/ArModel.ts";

describe(toComparisonForm.name, async () => {
  it("converts default query entry", async () => {
    const entry = Object.entries(defaultQuery)[0];
    const result = toComparisonForm(entry);
    const expected: ComparisonForm = {
      field: "",
      operator: ComparisonOperator.equal,
      inputValue: "",
      valueType: "string",
    };
    expect(result).toEqual(expected);
  });

  it("converts range query entry", async () => {
    const entry: ArRangeEntry = [
      ComparisonOperator.overlapsWithTextAnchorRange,
      { source: "http://example.com", start: 1, end: 2 },
    ];
    const result: ComparisonForm = toComparisonForm(entry);
    const expected: ComparisonForm = {
      field: "n.a.",
      operator: ComparisonOperator.overlapsWithTextAnchorRange,
      inputValue: JSON.stringify({
        source: "http://example.com",
        start: 1,
        end: 2,
      }),
      valueType: "range",
    };
    expect(result).toEqual(expected);
  });

  it("converts simple query entry", async () => {
    const entry: ArSimpleEntry = ["field", "value"];
    const result: ComparisonForm = toComparisonForm(entry);

    const expected: ComparisonForm = {
      field: "field",
      operator: ComparisonOperator.simpleQuery,
      inputValue: "value",
      valueType: "string",
    };
    expect(result).toEqual(expected);
  });

  it("converts extended query entry", async () => {
    const entry: ArExtendedEntry = [
      "field",
      { [ComparisonOperator.equal]: "value" },
    ];
    const result: ComparisonForm = toComparisonForm(entry);

    const expected: ComparisonForm = {
      field: "field",
      operator: ComparisonOperator.equal,
      inputValue: "value",
      valueType: "string",
    };
    expect(result).toEqual(expected);
  });
});
