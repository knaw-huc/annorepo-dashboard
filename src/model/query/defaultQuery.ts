import { Operator } from "./operator/Operator.ts";
import { toParamName } from "../../store/query/util/toParamName.ts";
import { toSearchQuery } from "../../store/query/util/toSearchQuery.ts";
import { toSubqueries } from "../../store/query/util/toSubqueries.ts";
import { ArExtendedSubquery } from "../ArModel.ts";
import { isComparisonSubquery } from "./QueryModel.ts";

export const defaultQuery: ArExtendedSubquery = {
  field: { [Operator.equal]: "value" },
};

export const defaultParams: string[] = toSubqueries(defaultQuery)
  .filter(isComparisonSubquery)
  .map((sq, i) => toParamName(sq.form, [i]));

const subqueries = toSubqueries(defaultQuery);
export const defaultTemplate: ArExtendedSubquery = toSearchQuery(
  subqueries,
  true,
);
