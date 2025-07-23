import {describe, expect, it} from "vitest";
import {toComparisonSubQueryForm} from "./toComparisonSubQueryForm.ts";
import {
  ComparisonSubQueryForm
} from "../../../model/query/QueryModel.ts";
import {defaultQuery} from "../../../model/query/defaultQuery.ts";

describe('convertToQueryFieldForm', async () => {
  it('converts default query', async () => {
    const defaultQueryEntry = Object.entries(defaultQuery)[0];
    const result: ComparisonSubQueryForm = toComparisonSubQueryForm(defaultQueryEntry)
    expect(result).toEqual({
      field: "field",
      operator: ":=",
      value: "value",
      valueType: "string",
    })
  });
});