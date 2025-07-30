import {
  isLogicalSubquery,
  Subquery,
} from "../../../model/query/QueryModel.ts";

/**
 * Remove subqueries that match predicate from the query tree
 */
export function pruneQuery(
  query: Subquery[],
  predicate: (subquery: Subquery) => boolean,
): Subquery[] {
  const pruned: Subquery[] = [];
  for (let i = 0; i < query.length; i++) {
    if (predicate(query[i])) {
      // Prune when predicate matches
    } else {
      const subquery = structuredClone(query[i]);
      pruned.push(subquery);
      if (isLogicalSubquery(subquery)) {
        const forms = [...subquery.forms];
        subquery.forms.length = 0;
        subquery.forms.push(...pruneQuery(forms, predicate));
      }
    }
  }
  return pruned;
}
