import { assert, describe, expect, it } from "vitest";
import { toAnnotationGroups } from "./toAnnotationGroups.ts";

describe(toAnnotationGroups.name, async () => {
  it("parses name", async () => {
    const name = "/annorepo/w3c/foo/bar";
    const result = toAnnotationGroups(name);
    assert(result, "is not undefined");
    expect(result.containerName).toBe("foo");
    expect(result.annotationName).toBe("bar");
  });

  it("parses id", async () => {
    const id = "http://example.com/annorepo/w3c/foo/bar";
    const result = toAnnotationGroups(id);
    assert(result, "is not undefined");
    expect(result.containerName).toBe("foo");
    expect(result.annotationName).toBe("bar");
  });

  it("parses id directly at root", async () => {
    const id = "http://localhost:8080/w3c/foo/bar";
    const result = toAnnotationGroups(id);
    assert(result, "is not undefined");
    expect(result.containerName).toBe("foo");
    expect(result.annotationName).toBe("bar");
  });
});
