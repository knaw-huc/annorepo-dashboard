import { assert, describe, expect, it } from "vitest";
import { ArQuery } from "../../../model/ArModel.ts";
import { toQuery } from "./toQuery.ts";
import {
  isComparisonSubquery,
  isLogicalSubquery,
} from "../../../model/query/QueryModel.ts";

describe(toQuery.name, async () => {
  it("converts :and", async () => {
    const query = {
      ":and": [
        { "body.foo": { ":=": "foo" } },
        { "body.purpose": { ":=": 1 } },
      ],
    } as ArQuery;

    const result = toQuery(query);
    expect(result.length).toBe(1);
    assert(isLogicalSubquery(result[0]));
    expect(result[0].forms.length).toBe(2);
    assert(isComparisonSubquery(result[0].forms[0]));
    expect(result[0].forms[0].form.value).toBe("foo");
    assert(isComparisonSubquery(result[0].forms[1]));
    expect(result[0].forms[1].form.value).toBe(1);
  });

  it("converts template", async () => {
    const entry = {
      ":and": [
        { "body.foo": { ":=": "<<0-forms-0-body-foo>>" } },
        { "body.purpose": { ":=": "<<0-forms-1-body-purpose>>" } },
      ],
    } as ArQuery;

    const paramNames = ["0-forms-0-body-foo", "0-forms-1-body-purpose"];
    const result = toQuery(entry, paramNames);

    expect(result.length).toBe(1);
    assert(isLogicalSubquery(result[0]));
    expect(result[0].forms.length).toBe(2);
    assert(isComparisonSubquery(result[0].forms[0]));
    expect(result[0].forms[0].form.value).toBe("value");
    expect(result[0].forms[0].param).toBe("0-forms-0-body-foo");
    assert(isComparisonSubquery(result[0].forms[1]));
    expect(result[0].forms[1].form.value).toBe("value");
    expect(result[0].forms[1].param).toBe("0-forms-1-body-purpose");
  });
});
