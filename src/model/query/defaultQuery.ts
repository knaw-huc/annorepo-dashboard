import { ComparisonOperator } from "./operator/Operator.ts";
import { toArQuery } from "../../store/query/util/toArQuery.ts";
import { toQuery } from "../../store/query/util/toQuery.ts";
import { ArExtendedSubquery } from "../ArModel.ts";

export const defaultQuery: ArExtendedSubquery = {
  field: { [ComparisonOperator.equal]: "value" },
};

const subqueries = toQuery(defaultQuery);
export const defaultTemplate: ArExtendedSubquery = toArQuery(subqueries, true);
