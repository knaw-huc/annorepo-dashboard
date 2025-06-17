import {
  isRangeQueryOperator, NO_FIELD,
  QueryOperator,
  queryOperatorValueType,
  QueryValue,
  queryValueMapping,
  toOperator
} from "../../../client/ArModel.ts";
import {Dropdown} from "../form/Dropdown.tsx";
import {orThrow} from "../../../util/orThrow.ts";
import {SelectOption} from "../form/SelectOption.tsx";
import {QueryValueInput} from "./QueryValueInput.tsx";
import {QueryFieldInput} from "./QueryFieldInput.tsx";
import {Button} from "../Button.tsx";
import {Remove} from "../icon/Remove.tsx";
import {useStore} from "../../../store/useStore.ts";
import {FieldQueryForm} from "./QueryModel.ts";

export function SubQueryEditor(props: {
  fieldNames: string[],
  formIndex: number,
  disabled?: boolean
}) {
  const {fieldNames, disabled, formIndex} = props;

  const {
    forms,
    errors,
    removeForm,
    updateForm,
  } = useStore();
  const form = forms[formIndex]

  const suggestions = form.field
    ? fieldNames.filter(name => name.includes(form.field))
    : fieldNames

  function handleSelectOperator(update: SelectOption) {
    const operatorUpdate = toOperator(update.value)
      ?? orThrow(`Invalid operator: ${update.value}`);

    const formUpdate = alignWithOperator(form, operatorUpdate)
    updateForm({
      formIndex,
      form: formUpdate,
    });
  }

  const operatorOptions = Object
    .values(QueryOperator)
    .filter(o => o !== QueryOperator.simpleQuery)
    .map(v => ({label: v, value: v}))

  function handleChangeField(field: string) {
    const formUpdate = {...form, field};
    const errorUpdate = {...errors[formIndex]};
    if (!field) {
      errorUpdate.field = 'Field cannot be empty'
    } else {
      errorUpdate.field = ''
    }
    updateForm({formIndex, form: formUpdate, error: errorUpdate});
  }

  function handleRemoveSubQuery() {
    return removeForm(formIndex);
  }

  return <form onSubmit={e => e.preventDefault()}>
    <fieldset disabled={disabled}>
      <div className="flex mb-3 mt-2">
        <div className="flex-auto mr-2">
          <QueryFieldInput
            value={form.field}
            errorLabel={errors[formIndex].field}
            operator={form.operator}
            suggestions={suggestions}
            onChange={handleChangeField}
            disabled={disabled}
          />
        </div>
        <div className="flex-none mr-2">
          <Dropdown
            selectedValue={form.operator.valueOf()}
            options={operatorOptions}
            onSelect={handleSelectOperator}
            disabled={disabled}
          />
        </div>
        <div className="flex-auto mr-2">
          <QueryValueInput
            formIndex={formIndex}
            isCall={true}
          />
        </div>
        {!disabled && <div className="flex-none">
          <Button
            type="button"
            className="pl-3 h-full"
            onClick={handleRemoveSubQuery}
            secondary
          >
            <Remove className="ml-1"/>
          </Button>
        </div>}
      </div>
    </fieldset>
  </form>
}

function alignWithOperator(
  prev: FieldQueryForm,
  nextOperator: QueryOperator,
): FieldQueryForm {
  const currentMapping = findQueryMappingByValue(prev.value)
  const nextType = queryOperatorValueType[nextOperator]
  const next = {...prev, operator: nextOperator}
  if (currentMapping.type === nextType) {
    next.value = prev.value
  } else {
    const nextMapping = queryValueMapping.find(t => t.type === nextType)
      ?? orThrow(`No default found for ${nextType}`);
    next.value = nextMapping.defaultValue
  }
  if (prev.value && isRangeQueryOperator(nextOperator)) {
    next.field = NO_FIELD
  }
  return next
}

function findQueryMappingByValue(
  queryValue: QueryValue
) {
  return queryValueMapping.find(c => c.isType(queryValue))
    ?? orThrow(`Unknown type of query value: ${queryValue}`);
}
