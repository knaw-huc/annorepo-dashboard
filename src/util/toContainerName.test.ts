import { describe, expect, it } from "vitest";
import { toContainerName } from "./toContainerName.ts";

describe(toContainerName.name, async () => {
  it("parses name", async () => {
    const name = "foo";
    const result = toContainerName(name);
    expect(result).toBe("foo");
  });

  it("parses id", async () => {
    const id = "http://example.com/annorepo/w3c/foo";
    const result = toContainerName(id);
    expect(result).toBe("foo");
  });
});
