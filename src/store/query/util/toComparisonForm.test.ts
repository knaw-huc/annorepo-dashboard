import { describe, expect, it } from "vitest";
import { toComparisonForm } from "./toComparisonForm.ts";
import { ComparisonForm } from "../../../model/query/QueryModel.ts";
import { defaultQuery } from "../../../model/query/defaultQuery.ts";
import { Operator } from "../../../model/query/operator/Operator.ts";
import {
  ArExtendedEntry,
  ArRangeEntry,
  ArSimpleEntry,
} from "../../../model/ArModel.ts";

describe(toComparisonForm.name, async () => {
  it("converts default query entry", async () => {
    const entry = Object.entries(defaultQuery)[0];
    const result: ComparisonForm = toComparisonForm(entry);
    expect(result).toEqual({
      field: "field",
      operator: ":=",
      value: "value",
      valueType: "string",
    });
  });

  it("converts range query entry", async () => {
    const entry: ArRangeEntry = [
      Operator.overlapsWithTextAnchorRange,
      { source: "http://example.com", start: 1, end: 2 },
    ];
    const result: ComparisonForm = toComparisonForm(entry);
    expect(result).toEqual({
      field: "n.a.",
      operator: ":overlapsWithTextAnchorRange",
      value: {
        end: 2,
        source: "http://example.com",
        start: 1,
      },
      valueType: "range",
    });
  });

  it("converts simple query entry", async () => {
    const entry: ArSimpleEntry = ["field", "value"];
    const result: ComparisonForm = toComparisonForm(entry);

    expect(result).toEqual({
      field: "field",
      operator: "simpleQuery",
      value: "value",
      valueType: "string",
    });
  });

  it("converts extended query entry", async () => {
    const entry: ArExtendedEntry = ["field", { [Operator.equal]: "value" }];
    const result: ComparisonForm = toComparisonForm(entry);

    expect(result).toEqual({
      field: "field",
      operator: ":=",
      value: "value",
      valueType: "string",
    });
  });
});
