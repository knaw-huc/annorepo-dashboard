import {H1} from "../common/H1.tsx";
import {Hint} from "../common/Hint.tsx";
import {Loading} from "../common/Loading.tsx";
import {useSearchContainer} from "../../client/endpoint/useSearchContainer.tsx";
import {useContainer} from "../../client/endpoint/useContainer.tsx";
import {Button} from "../common/Button.tsx";
import {useEffect, useState} from "react";
import {toPageNo} from "../../util/toPageNo.ts";
import {Back} from "../common/icon/Back.tsx";
import {ContainerSearchForm, defaultForm} from "./ContainerSearchForm.tsx";
import {AnnotationPage} from "../annotation/AnnotationPage.tsx";
import {convertFormToQuery} from "./QueryValueField.tsx";

export type ContainerSearchProps = {
  name: string,
  onClose: () => void
}

export function ContainerSearch(props: ContainerSearchProps) {

  const {name} = props;

  const [form, setForm] = useState(defaultForm)
  const [query, setQuery] = useState(convertFormToQuery(form));
  const [pageNo, setPageNo] = useState(0);

  const {data: container} = useContainer(name)
  const {data: searchPage} = useSearchContainer(name, query, pageNo);

  useEffect(() => {
    const containerPageId = container?.first.id;
    if (containerPageId) {
      setPageNo(toPageNo(containerPageId))
    }
  }, [container]);

  if (!container) {
    return <Loading/>;
  }

  const handleChangePage = (update: string) => {
    const pageNo = toPageNo(update);
    console.log('handleChangePage', {update, pageNo})
    setPageNo(pageNo)
  }

  const handleSubmitSearch = () => {
    const queryUpdate = convertFormToQuery(form);
    setQuery(queryUpdate)
  }

  return <div>
    <H1>{container.label} <Hint>search</Hint></H1>
    <div className="mb-2">
      <Button
        onClick={props.onClose}
        className="mr-2"
      >
        <Back className="mr-1"/>Container
      </Button>
    </div>
    <ContainerSearchForm
      containerName={name}
      form={form}
      onChange={setForm}
      onSubmit={handleSubmitSearch}
    />
    {searchPage
      ? <AnnotationPage
        pageNo={pageNo}
        page={searchPage}
        onChangePageNo={handleChangePage}
      />
      : <Loading/>
    }
  </div>
}




