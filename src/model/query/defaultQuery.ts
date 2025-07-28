import { Operator } from "./operator/Operator.ts";
import { toParamName } from "../../store/query/util/toParamName.ts";
import { toArQuery } from "../../store/query/util/toArQuery.ts";
import { toQuery } from "../../store/query/util/toQuery.ts";
import { ArExtendedSubquery } from "../ArModel.ts";
import { isComparisonSubquery } from "./QueryModel.ts";

export const defaultQuery: ArExtendedSubquery = {
  field: { [Operator.equal]: "value" },
};

export const defaultParams: string[] = toQuery(defaultQuery)
  .filter(isComparisonSubquery)
  .map((sq, i) => toParamName(sq.form, [i]));

const subqueries = toQuery(defaultQuery);
export const defaultTemplate: ArExtendedSubquery = toArQuery(subqueries, true);
