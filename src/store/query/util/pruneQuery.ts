import {
  isLogicalSubquery,
  Subquery,
} from "../../../model/query/QueryModel.ts";

/**
 * Remove subqueries from query tree that match the predicate
 */
export function pruneQuery(
  subqueries: Subquery[],
  predicate: (subquery: Subquery) => boolean,
): Subquery[] {
  const pruned: Subquery[] = [];
  for (let i = 0; i < subqueries.length; i++) {
    if (predicate(subqueries[i])) {
      // Prune when predicate matches
    } else {
      const subquery = structuredClone(subqueries[i]);
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
