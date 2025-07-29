import { Subquery } from "../../../../model/query/QueryModel.ts";
import { filterQuery } from "../filterQuery.ts";
import { validateSubquery } from "./validateSubquery.ts";

export function revalidateInvalidSubqueries(update: Subquery[]) {
  const invalidSubqueries = filterQuery(update, (sq) => !!sq.queryError);
  for (const invalidSubquery of invalidSubqueries) {
    validateSubquery(invalidSubquery.path, update);
  }
}
