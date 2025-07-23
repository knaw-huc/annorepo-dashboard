import { Subquery } from "../../../model/query/QueryModel.ts";
import { toSearchQuery } from "./toSearchQuery.ts";

/**
 * Check if forms and params can be converted into query
 * @returns error message on error
 */
export function validateQuery(subqueries: Subquery[]): string {
  try {
    // Computer says ...
    toSearchQuery(subqueries, false);
    return "";
  } catch (e) {
    return e instanceof Error ? e.message : "New subquery causes unknown error";
  }
}
