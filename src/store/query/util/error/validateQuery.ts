import { Subquery } from "../../../../model/query/QueryModel.ts";
import { toArQuery } from "../toArQuery.ts";
import { SubqueryError } from "./SubqueryError.ts";
import { ValueError } from "./ValueError.ts";
import { QueryError } from "./QueryError.ts";

/**
 * Check if forms and params can be converted into query
 * @returns error message on error
 */
export function validateQuery(query: Subquery[]): "" | QueryError | Error {
  try {
    // Computer says ...
    toArQuery(query, false);
    return "";
  } catch (error) {
    if (error instanceof SubqueryError || error instanceof ValueError) {
      return error;
    }
    const message =
      error instanceof Error
        ? error.message
        : "Query conversion causes unknown error";
    return new SubqueryError(message);
  }
}
