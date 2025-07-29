import { Subquery } from "../../../../model/query/QueryModel.ts";
import { toArQuery } from "../toArQuery.ts";

/**
 * Check if forms and params can be converted into query
 * @returns error message on error
 */
export function validateQuery(query: Subquery[]): string {
  try {
    // Computer says ...
    toArQuery(query, false);
    return "";
  } catch (e) {
    return e instanceof Error
      ? e.message
      : "Query conversion causes unknown error";
  }
}
