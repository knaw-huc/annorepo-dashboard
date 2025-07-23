import { describe, expect, it } from "vitest";
import { toComparisonForm } from "./toComparisonForm.ts";
import { ComparisonForm } from "../../../model/query/QueryModel.ts";
import { defaultQuery } from "../../../model/query/defaultQuery.ts";

describe("convertToQueryFieldForm", async () => {
  it("converts default query", async () => {
    const defaultQueryEntry = Object.entries(defaultQuery)[0];
    const result: ComparisonForm = toComparisonForm(defaultQueryEntry);
    expect(result).toEqual({
      field: "field",
      operator: ":=",
      value: "value",
      valueType: "string",
    });
  });
});
