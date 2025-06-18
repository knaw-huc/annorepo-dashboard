import {describe, expect, it} from "vitest";
import {toQueryFieldForm} from "./toQueryFieldForm.ts";
import {defaultQuery} from "../../../component/common/search/QueryModel.ts";

describe('convertToQueryFieldForm', async () => {
  it('converts default query', async () => {
    const defaultQueryEntry = Object.entries(defaultQuery)[0];
    const result = toQueryFieldForm(defaultQueryEntry)
    expect(result).toEqual({
      field: "field",
      operator: ":=",
      value: "value",
    })
  });
});