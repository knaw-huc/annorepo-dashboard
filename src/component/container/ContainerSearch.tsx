import {Loading} from "../common/Loading.tsx";
import {useSearchContainer} from "../../client/endpoint/useSearchContainer.tsx";
import {useContainer} from "../../client/endpoint/useContainer.tsx";
import {FormEvent, useEffect, useState} from "react";
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

export type ContainerSearchProps = {
  name: string,
  onClose: () => void
}

export function ContainerSearch(props: ContainerSearchProps) {

  const {name} = props;

  const [subqueryForms, setSubqueryForms] = useState([defaultForm])

  const [subqueryErrors, setSubqueryErrors] = useState<
    FieldQueryFormErrorsByField[]
  >([
    {
      field: defaultForm.field,
      errors: mapValues(defaultForm, _ => '')
    }
  ])

  const [query, setQuery] = useState(convertToSubquery(defaultForm));
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

  const handleSubmitSearch = (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (hasError(subqueryErrors)) {
      return;
    }
    setQuery(convertToSearchQuery(subqueryForms))
  }


  return <div>
    <H1>Search annotations</H1>
    {subqueryForms.map((f, i) => {
      return <SubQuerySearchForm
        key={i}
        containerName={name}
        form={f}
        onChange={(es) => handleChangeSubquery(es, i)}
        errors={subqueryErrors[i].errors}
        onError={(es) => handleSubqueryError(es, i)}
      />;
    })}
    <div>
      <Button
        disabled={hasError(subqueryErrors)}
        type="button"
        className="pl-5 h-full border-b-2"
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

function hasError(forms: FieldQueryFormErrorsByField[]) {
  return some(forms, form =>
    values(form.errors).some(
      field => !isEmpty(field)
    )
  );
}

export function convertToSearchQuery(
  forms: FieldQueryForm[]
): SearchQuery {
  let subqueries = forms.map(f => convertToSubquery(f));
  return mergeForms(subqueries)
}

function mergeForms(
  subqueries: SearchSubquery[]
): SearchQuery {
  const merged: Record<string, any> = {};
  for (const subquery of subqueries) {
    const fields = Object.keys(subquery)
    if (fields.length > 1) {
      throw new Error('Expect one field per subquery')
    }
    for (const [key, value] of objectEntries(subquery)) {
      if (!key) {
        throw new Error(`Subquery needs a key, value was: ${JSON.stringify(value)}`)
      }
      if (key in merged) {
        throw new Error(
          `Overlap detected: Property '${key}' already exists in the merged object.`
        );
      }
      merged[key] = value;
    }
  }

  return merged;
}

export function convertToSubquery(
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