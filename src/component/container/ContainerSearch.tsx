import {Loading} from "../common/Loading.tsx";
import {useSearchContainer} from "../../client/endpoint/useSearchContainer.tsx";
import {useContainer} from "../../client/endpoint/useContainer.tsx";
import {useEffect, useState} from "react";
import {toPageNo} from "../../util/toPageNo.ts";
import {
  defaultForm,
  FieldQueryForm,
  FieldQueryFormErrors,
  FieldQueryFormErrorsByField,
  SubQuerySearchForm
} from "./SubQuerySearchForm.tsx";
import {AnnotationPage} from "../annotation/AnnotationPage.tsx";
import {H1} from "../common/H1.tsx";
import {isEmpty, mapValues, some, values} from "lodash";
import {ErrorMessage} from "../common/ErrorMessage.tsx";
import {StatusMessage} from "../common/StatusMessage.tsx";
import {
  isRangeQueryOperator,
  isRangeQueryValue,
  QueryOperator,
  SearchQuery,
  SearchSubquery
} from "../../client/ArModel.ts";
import {objectEntries} from "../../util/objectEntries.ts";
import {Button} from "../common/Button.tsx";
import {Next} from "../common/icon/Next.tsx";
import cloneDeep from "lodash/cloneDeep";
import {Add} from "../common/icon/Add.tsx";
import {Warning} from "../common/Warning.tsx";

export type ContainerSearchProps = {
  name: string,
  onClose: () => void
}

export function ContainerSearch(props: ContainerSearchProps) {

  const {name} = props;

  const newForm = createNewForm();
  const [subqueryForms, setSubqueryForms] = useState([
    newForm
  ])
  const [query, setQuery] = useState(
    convertToSearchQuery([newForm])
  );
  const [subqueryErrors, setSubqueryErrors] = useState([
    createNewErrorForm(newForm)
  ])
  const [queryError, setQueryError] = useState('')
  const [pageNo, setPageNo] = useState(0);

  const container = useContainer(name)
  const {search, page} = useSearchContainer(name, query, pageNo);

  useEffect(() => {
    const containerPageId = container.data?.first.id;
    if (containerPageId) {
      setPageNo(toPageNo(containerPageId))
    }
  }, [container]);

  const error = search.error || page.error
  if (error) {
    return <ErrorMessage error={error}/>;
  }
  if (!container.isSuccess || !page.isSuccess) {
    return <StatusMessage requests={[container, page]}/>;
  }

  const handleChangePage = (update: string) => {
    setPageNo(toPageNo(update))
  }

  const handleChangeSubquery = (next: FieldQueryForm, index: number) => {
    setSubqueryForms(prev => prev.map((old, i) =>
      i === index ? next : old
    ))
  }

  const handleSubqueryError = (next: FieldQueryFormErrors, index: number) => {
    setSubqueryErrors(prev => prev.map((errorForm, i) =>
      i === index ? {...errorForm, errors: next} : errorForm
    ))
  }

  const handleSubmitSearch = () => {
    if (hasError(subqueryErrors)) {
      return;
    }
    setQuery(convertToSearchQuery(subqueryForms))
  }

  const handleAddSubquery = () => {
    const newForm = createNewForm()
    const formUpdate = [...subqueryForms, newForm];
    const errorUpdate = [...subqueryErrors, createNewErrorForm(newForm)];
    try {
      convertToSearchQuery(formUpdate);

      setSubqueryForms(formUpdate)
      setSubqueryErrors(errorUpdate)
      setQueryError('')
    } catch (e) {
      let errorMessage = e instanceof Error ? e.message : ``;
      setQueryError(['Could not add subquery', errorMessage].join(': '))
    }
  }

  const handleRemoveSubquery = (index: number) => {
    setSubqueryErrors(prev => prev.splice(index, 1))
    setSubqueryForms(prev => prev.splice(index, 1))
  }

  return <div>
    <H1>Search annotations</H1>
    {queryError && <Warning>{queryError}</Warning>}
    {subqueryForms.map((f, i) => {
      return <SubQuerySearchForm
        key={`${i}${f.field}`}
        containerName={name}
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
        className="pl-3 h-full border-b-2"
        onClick={handleAddSubquery}
        secondary
      >
        <Add className="mr-2" />
        Subquery
      </Button>

      <Button
        disabled={error || !subqueryForms.length || hasError(subqueryErrors)}
        type="button"
        className="pl-5 h-full border-b-2 ml-2"
        onClick={handleSubmitSearch}
      >
        Search
        <Next className="ml-1"/>
      </Button>
    </div>
    {page
      ? <AnnotationPage
        pageNo={pageNo}
        page={page.data}
        onChangePageNo={handleChangePage}
      />
      : <Loading/>
    }
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

function createNewForm() {
  return cloneDeep(defaultForm);
}

function hasError(forms: FieldQueryFormErrorsByField[]) {
  return some(forms, form =>
    values(form.errors).some(
      field => !isEmpty(field)
    )
  );
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