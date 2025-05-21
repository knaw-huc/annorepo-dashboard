import {describe, expect, it} from "vitest";
import {convertToQueryFieldForm} from "./convertToQueryFieldForm.ts";
import {defaultQuery} from "./SubQuerySearchForm.tsx";

describe('convertToQueryFieldForm', async () => {
  it('converts default query', async () => {
    const defaultQueryEntry = Object.entries(defaultQuery)[0];
    const result = convertToQueryFieldForm(defaultQueryEntry)
    expect(result).toEqual({
      field: "type",
      operator: ":=",
      value: "Annotation",
    })
  });
});