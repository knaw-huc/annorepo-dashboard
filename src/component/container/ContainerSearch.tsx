import {Loading} from "../common/Loading.tsx";
import {useSearchContainer} from "../../client/endpoint/useSearchContainer.tsx";
import {useContainer} from "../../client/endpoint/useContainer.tsx";
import {useEffect, useState} from "react";
import {toPageNo} from "../../util/toPageNo.ts";
import {ContainerSearchForm, defaultForm} from "./ContainerSearchForm.tsx";
import {AnnotationPage} from "../annotation/AnnotationPage.tsx";
import {convertFormToQuery} from "./QueryValueField.tsx";
import {H1} from "../common/H1.tsx";
import {mapValues} from "lodash";
import {ErrorMessage} from "../common/ErrorMessage.tsx";
import {StatusMessage} from "../common/StatusMessage.tsx";

export type ContainerSearchProps = {
  name: string,
  onClose: () => void
}

export function ContainerSearch(props: ContainerSearchProps) {

  const {name} = props;

  const [form, setForm] = useState(defaultForm)
  const [errors, setErrors] = useState(mapValues(defaultForm, _ => ''))
  const [query, setQuery] = useState(convertFormToQuery(form));
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
    return <StatusMessage requests={[container, page]} />;
  }

  const handleChangePage = (update: string) => {
    setPageNo(toPageNo(update))
  }

  const handleSubmitSearch = () => {
    setQuery(convertFormToQuery(form))
  }

  return <div>
    <H1>Search annotations</H1>
    <ContainerSearchForm
      containerName={name}
      form={form}
      onChange={setForm}
      onSubmit={handleSubmitSearch}
      errors={errors}
      onError={setErrors}
    />
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




