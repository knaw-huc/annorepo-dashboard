import { useStore } from "../../../store/useStore.ts";
import { mapValues, PropertyName } from "lodash";
import { defaultQuery } from "../../../model/query/defaultQuery.ts";
import { toComparisonForm } from "../../../store/query/util/toComparisonForm.ts";
import { toParamName } from "../../../store/query/util/toParamName.ts";

export function useAddComparisonSubquery() {
  const { addSubquery } = useStore();

  return (path: PropertyName[], isParam: boolean) => {
    const newQueryEntry = Object.entries(defaultQuery)[0];
    const form = toComparisonForm(newQueryEntry);
    const queryError = "";
    const errors = mapValues(form, () => "");
    const param = isParam ? toParamName(form, path) : false;
    addSubquery({
      path,
      subquery: { type: "comparison", form, errors, param, queryError },
    });
  };
}
