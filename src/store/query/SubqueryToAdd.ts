import {ValidatedComparisonSubQuery} from "../../model/query/QueryModel.ts";

// TODO: simplify by unnesting SubqueryToAdd.subquery
export type SubqueryToAdd = {
  subquery: ValidatedComparisonSubQuery,
}