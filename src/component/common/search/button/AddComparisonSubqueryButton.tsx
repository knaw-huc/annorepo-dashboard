import { DeprecatedButton } from "../../DeprecatedButton.tsx";
import { Add } from "../../icon/Add.tsx";
import { defaultQuery } from "../../../../model/query/defaultQuery.ts";
import { toComparisonForm } from "../../../../store/query/util/toComparisonForm.ts";
import { mapValues, PropertyName } from "lodash";
import { useStore } from "../../../../store/useStore.ts";
import { toParamName } from "../../../../store/query/util/toParamName.ts";

export function AddComparisonSubqueryButton(props: {
  disabled?: boolean;
  path: PropertyName[];
  isParam: boolean;
  className?: string;
}) {
  const { disabled, path, isParam } = props;

  const addComparisonSubquery = useAddComparisonSubquery();

  return (
    <DeprecatedButton
      type="button"
      className={`h-full border-b-2 ${props.className}`}
      onClick={() => addComparisonSubquery(path, isParam)}
      secondary
      disabled={disabled}
    >
      <Add className="mr-2" />
      Add subquery
    </DeprecatedButton>
  );
}

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
