import { ArExtendedFieldQuery } from "../ArModel.ts";
import { Operator } from "./operator/Operator.ts";
import { toParamName } from "../../store/query/util/toParamName.ts";
import { toSearchQuery } from "../../store/query/util/toSearchQuery.ts";
import { toComparisonSubQueries } from "../../store/query/util/toComparisonSubQueries.ts";

export const defaultQuery: ArExtendedFieldQuery = {
  field: { [Operator.equal]: "value" },
};
export const defaultParams: string[] = toComparisonSubQueries(defaultQuery).map(
  (sq, i) => toParamName(sq.form, [i]),
);
const subqueries = toComparisonSubQueries(defaultQuery);
export const defaultTemplate: ArExtendedFieldQuery = toSearchQuery(
  subqueries,
  true,
);
