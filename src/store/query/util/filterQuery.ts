import {
  isLogicalSubquery,
  Subquery,
} from "../../../model/query/QueryModel.ts";
import { PropertyName } from "lodash";
import { formsPropPath } from "../formsPropPath.ts";

export type SubqueryWithPath = {
  path: PropertyName[];
  subquery: Subquery;
};

export type FindSubqueryPredicate = (
  subquery: Subquery,
  path: PropertyName[],
) => boolean;

export function filterQuery(
  query: Subquery[],
  predicate: FindSubqueryPredicate,
): SubqueryWithPath[] {
  return findWithParent(query, predicate, []);

  function findWithParent(
    query: Subquery[],
    predicate: FindSubqueryPredicate,
    parent: PropertyName[],
  ) {
    const result: SubqueryWithPath[] = [];
    for (let i = 0; i < query.length; i++) {
      const subquery = query[i];
      const path = [...parent, i];
      if (predicate(subquery, path)) {
        result.push({ subquery, path });
      }
      if (isLogicalSubquery(subquery)) {
        const iPath = [...parent, i, formsPropPath];
        result.push(...findWithParent(subquery.forms, predicate, iPath));
      }
    }
    return result;
  }
}
