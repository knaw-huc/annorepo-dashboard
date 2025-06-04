import {Warning} from "../Warning.tsx";
import {Button} from "../Button.tsx";
import {Add} from "../icon/Add.tsx";
import {Next} from "../icon/Next.tsx";
import {ReactNode, useEffect, useState} from "react";
import {isEqual} from "lodash";
import {SearchQuery} from "../../../client/ArModel.ts";
import {toQueryFieldForm} from "./util/toQueryFieldForm.ts";
import {toQueryFieldForms} from "./util/toQueryFieldForms.ts";
import {toSearchQuery} from "./util/toSearchQuery.tsx";
import {ErrorRecord} from "../form/util/ErrorRecord.ts";
import {
  createFieldQueryFormErrors,
  defaultQuery,
  FieldQueryForm,
  FieldQueryFormErrorsByField,
  hasErrorByField
} from "./QueryModel.ts";
import {SubQueryEditor} from "./SubQueryEditor.tsx";

/**
 * TODO:
 * extract QueryEditor
 * use QueryEditor also in CustomQueryEditor to reuse error handling
 */
export function SearchEditor(props: {
  query: SearchQuery
  fieldNames: string[],
  onSubmitQuery: (query: SearchQuery) => void
  onChangeQuery: (query: SearchQuery) => void
  searchError?: Error | null,
  moreButtons?: ReactNode
}) {
  const {searchError} = props;
  const [queryError, setQueryError] = useState('')

  const [subqueryForms, setSubqueryForms] = useState<FieldQueryForm[]>([])
  const [subqueryErrors, setSubqueryErrors] = useState<FieldQueryFormErrorsByField[]>([])

  useEffect(() => {
    const isQueryEqual = isEqual(props.query, toSearchQuery(subqueryForms));
    if(isQueryEqual) {
      return;
    }
    const forms = toQueryFieldForms(props.query);
    setSubqueryForms(forms)
    setSubqueryErrors(forms.map(f => createFieldQueryFormErrors(f)))
  }, [props.query]);

  const handleChangeSubquery = (next: FieldQueryForm, index: number) => {
    const update = subqueryForms.map((form, i) =>
      i === index ? next : form
    )
    setSubqueryForms(update)
    setQueryError('')
    if (!hasErrorByField(subqueryErrors)) {
      props.onChangeQuery(toSearchQuery(update))
    }
  }

  const handleSubqueryError = (next: ErrorRecord<FieldQueryForm>, index: number) => {
    setSubqueryErrors(prev => prev.map((errorForm, i) =>
      i === index ? {...errorForm, errors: next} : errorForm
    ))
  }

  const handleSubmitQuery = () => {
    if (hasErrorByField(subqueryErrors)) {
      return;
    }
    props.onSubmitQuery(toSearchQuery(subqueryForms))
  }

  const handleAddSubquery = () => {
    const newQueryEntry = Object.entries(defaultQuery)[0];
    const newForm = toQueryFieldForm(newQueryEntry)
    const formUpdate = [...subqueryForms, newForm];
    const errorUpdate = [...subqueryErrors, createFieldQueryFormErrors(newForm)];
    try {
      toSearchQuery(formUpdate);

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
      return <SubQueryEditor
        key={i}
        fieldNames={props.fieldNames}
        form={f}
        onChange={(es) => handleChangeSubquery(es, i)}
        errors={subqueryErrors[i].errors}
        onError={(es) => handleSubqueryError(es, i)}
        onRemove={() => handleRemoveSubquery(i)}
      />;
    })}
    <div className="mb-7">
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
        disabled={!!searchError || !subqueryForms.length || hasErrorByField(subqueryErrors)}
        type="button"
        className="pl-5 h-full border-b-2 ml-2"
        onClick={handleSubmitQuery}
      >
        Search
        <Next className="ml-1"/>
      </Button>
    </div>
  </div>
}


// TODO: move to FieldQueryFormErrorsByField
