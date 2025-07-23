import { ComparisonSubquery } from "../../model/query/QueryModel.ts";
import { PropertyName } from "lodash";

// TODO: simplify by unnesting SubqueryToAdd.subquery
export type SubqueryToAdd = {
  path: PropertyName[];
  subquery: ComparisonSubquery;
};
