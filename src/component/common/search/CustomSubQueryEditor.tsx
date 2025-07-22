import {DropdownSelector} from "../form/DropdownSelector.tsx";
import {QueryValueInput} from "./QueryValueInput.tsx";
import {QueryFieldInput} from "./QueryFieldInput.tsx";
import noop from "lodash/noop";
import {useStore} from "../../../store/useStore.ts";
import {useValueSuggestions} from "./useValueSuggestions.tsx";

export function CustomSubQueryEditor(props: {
  subqueryIndex: number
  isCall: boolean
  containerName?: string
}) {
  const {subqueryIndex, isCall, containerName} = props;
  const {subqueries} = useStore()
  const subquery = subqueries[subqueryIndex]
  const operatorValue = subquery.form.operator.valueOf();

  const valueSuggestions = useValueSuggestions({
    containerName: containerName,
    field: subquery.form.field,
    value: subquery.form.value,
  })

  return <div className="flex-grow">
    <fieldset>
      <div className="flex mb-3 mt-2">
        <div className="flex-auto mr-2">
          <QueryFieldInput
            value={subquery.form.field}
            operator={subquery.form.operator}
            // Disabled and cannot be changed:
            onChange={noop}
            suggestions={[]}
            disabled={true}
          />
        </div>
        <div className="flex-none mr-2">
          <DropdownSelector
            selectedValue={operatorValue}
            options={[{label: operatorValue, value: operatorValue}]}
            onSelect={noop}
            disabled={true}
          />
        </div>
        <div className="flex-auto mr-2">
          <QueryValueInput
            suggestions={valueSuggestions}
            formIndex={subqueryIndex}
            isCustom={true}
            isCall={isCall}
          />
        </div>
      </div>
    </fieldset>
  </div>

}
