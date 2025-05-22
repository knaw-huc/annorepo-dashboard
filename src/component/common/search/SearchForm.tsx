import {Warning} from "../Warning.tsx";
import {
  defaultQuery,
  FieldQueryForm,
  FieldQueryFormErrors,
  FieldQueryFormErrorsByField,
  SubQuerySearchForm
} from "./SubQuerySearchForm.tsx";
import {Button} from "../Button.tsx";
import {Add} from "../icon/Add.tsx";
import {Next} from "../icon/Next.tsx";
import {ReactNode, useEffect, useState} from "react";
import {isEmpty, isEqual, mapValues, some, values} from "lodash";
import {
  isRangeQueryOperator,
  isRangeQueryValue,
  QueryOperator,
  SearchQuery,
  SearchSubquery
} from "../../../client/ArModel.ts";
import {objectEntries} from "../../../util/objectEntries.ts";
import {convertToQueryFieldForm} from "./convertToQueryFieldForm.ts";

export function SearchForm(props: {
  query: SearchQuery
  fieldNames: string[],
  onSubmitQuery: (query: SearchQuery) => void
  onChangeQuery: (query: SearchQuery) => void
  searchError?: Error | null,
  moreButtons?: ReactNode
  disabled?: boolean
}) {
  const {searchError, disabled} = props;
  const [queryError, setQueryError] = useState('')

  const [subqueryForms, setSubqueryForms] = useState<FieldQueryForm[]>([])
  const [subqueryErrors, setSubqueryErrors] = useState<FieldQueryFormErrorsByField[]>([])

  useEffect(() => {
    const isFormMismatch = isEqual(props.query, convertToSearchQuery(subqueryForms));
    if(isFormMismatch) {
      return;
    }
    const forms = convertToForms(props.query);
    setSubqueryForms(forms)
    setSubqueryErrors(forms.map(f => createNewErrorForm(f)))
  }, [props.query]);

  const handleChangeSubquery = (next: FieldQueryForm, index: number) => {
    const update = subqueryForms.map((form, i) =>
      i === index ? next : form
    )
    setSubqueryForms(update)
    setQueryError('')
    if (!hasError(subqueryErrors)) {
      props.onChangeQuery(convertToSearchQuery(update))
    }
  }

  const handleSubqueryError = (next: FieldQueryFormErrors, index: number) => {
    setSubqueryErrors(prev => prev.map((errorForm, i) =>
      i === index ? {...errorForm, errors: next} : errorForm
    ))
  }

  const handleSubmitQuery = () => {
    if (hasError(subqueryErrors)) {
      return;
    }
    props.onSubmitQuery(convertToSearchQuery(subqueryForms))
  }

  const handleAddSubquery = () => {
    const newQueryEntry = Object.entries(defaultQuery)[0];
    const newForm = convertToQueryFieldForm(newQueryEntry)
    const formUpdate = [...subqueryForms, newForm];
    const errorUpdate = [...subqueryErrors, createNewErrorForm(newForm)];
    try {
      convertToSearchQuery(formUpdate);

      setSubqueryForms(formUpdate)
      setSubqueryErrors(errorUpdate)
      setQueryError('')
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : ``;
      setQueryError(['Could not add subquery', errorMessage].join(': '))
    }
  }

  const handleRemoveSubquery = (index: number) => {
    setSubqueryErrors(prev => prev.splice(index, 1))
    setSubqueryForms(prev => prev.splice(index, 1))
  }

  return <div>
    {queryError && <Warning>{queryError}</Warning>}
    {subqueryForms.map((f, i) => {
      return <SubQuerySearchForm
        key={i}
        fieldNames={props.fieldNames}
        form={f}
        onChange={(es) => handleChangeSubquery(es, i)}
        errors={subqueryErrors[i].errors}
        onError={(es) => handleSubqueryError(es, i)}
        onRemove={() => handleRemoveSubquery(i)}
        disabled={props.disabled}
      />;
    })}
    {!disabled && <div className="mb-7">
      <Button
        type="button"
        className="pl-3 h-full border-b-2 mr-2"
        onClick={handleAddSubquery}
        secondary
      >
        <Add className="mr-2"/>
        Subquery
      </Button>

      {props.moreButtons}

      <Button
        disabled={!!searchError || !subqueryForms.length || hasError(subqueryErrors)}
        type="button"
        className="pl-5 h-full border-b-2 ml-2"
        onClick={handleSubmitQuery}
      >
        Search
        <Next className="ml-1"/>
      </Button>
    </div>}
  </div>
}


function createNewErrorForm(
  form: FieldQueryForm
): FieldQueryFormErrorsByField {
  return {
    field: form.field,
    errors: mapValues(form, _ => '')
  };
}

function hasError(forms: FieldQueryFormErrorsByField[]) {
  return some(forms, form =>
    values(form.errors).some(
      field => !isEmpty(field)
    )
  );
}

function convertToForms(
  query: SearchQuery
): FieldQueryForm[] {
  return Object.entries(query).map((entry) => {
    return convertToQueryFieldForm(entry)
  })
}

function convertToSearchQuery(
  forms: FieldQueryForm[]
): SearchQuery {
  const subqueries = forms.map(f => convertToSubquery(f));
  return mergeForms(subqueries)
}

function mergeForms(
  subqueries: SearchSubquery[]
): SearchQuery {
  const merged: Record<string, any> = {};
  for (const subquery of subqueries) {
    const fields = Object.keys(subquery)
    if (fields.length > 1) {
      throw new Error('expect one field per subquery')
    }
    for (const [key, value] of objectEntries(subquery)) {
      if (!key) {
        throw new Error(`subquery needs a key (value was: ${JSON.stringify(value)})`)
      }
      if (key in merged) {
        throw new Error(
          `field '${key}' already exists.`
        );
      }
      merged[key] = value;
    }
  }

  return merged;
}

function convertToSubquery(
  form: FieldQueryForm
): SearchSubquery {
  if (form.operator === QueryOperator.simpleQuery) {
    return {[form.field]: `${form.value}`}
  } else if (isRangeQueryOperator(form.operator)) {
    if (!isRangeQueryValue(form.value)) {
      throw new Error('Expected range but got: ' + JSON.stringify(form.value))
    }
    return {[form.operator]: form.value}
  } else {
    return {[form.field]: {[form.operator]: form.value}}
  }
}
