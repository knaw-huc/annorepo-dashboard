import { Subquery } from "../../model/query/QueryModel.ts";
import { PropertyName } from "lodash";

export type SubqueryToAdd = {
  path: PropertyName[];
  subquery: Subquery;
};
