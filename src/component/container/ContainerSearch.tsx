import {H1} from "../common/H1.tsx";
import {Hint} from "../common/Hint.tsx";
import {Loading} from "../common/Loading.tsx";
import {useSearchContainer} from "../../client/endpoint/useSearchContainer.tsx";
import {useContainer} from "../../client/endpoint/useContainer.tsx";
import {Button} from "../common/Button.tsx";
import {useEffect, useState} from "react";
import {toPageNo} from "../../util/toPageNo.ts";
import {Back} from "../common/icon/Back.tsx";
import {ContainerSearchForm, FieldQueryForm} from "./ContainerSearchForm.tsx";
import {ContainerQuery, QueryOperatorOrFn} from "../../client/ArModel.ts";
import {AnnotationPage} from "../annotation/AnnotationPage.tsx";

export type ContainerSearchProps = {
  name: string,
  onClose: () => void
}

let NO_PAGE = -1;

export function ContainerSearch(props: ContainerSearchProps) {

  const {name} = props;
  const [query, setQuery] = useState<ContainerQuery>({"body.purpose": "identifying"});
  const {data: container} = useContainer(name)
  const {data: searchPage} = useSearchContainer(name, query);
  const [pageNo, setPageNo] = useState<number>(NO_PAGE);

  useEffect(() => {
    const containerPageId = container?.first.id;
    if (containerPageId) {
      setPageNo(toPageNo(containerPageId))
    }
  }, [container]);

  if (!container || !searchPage) {
    return <Loading/>;
  }

  const handleChangePage = (update: string) => {
    setPageNo(toPageNo(update))
  }

  const handleSubmitSearch = (form: FieldQueryForm) => {
    setQuery(formToQuery(form))
  }

  return <div>
    <H1>{container.label} <Hint>search</Hint></H1>
    <div className="mb-2">
      <Button
        onClick={props.onClose}
        className="mr-2"
      >
        Back<Back className="ml-1"/>
      </Button>
    </div>
    {pageNo === NO_PAGE
      ? <Loading/>
      : <>
        <ContainerSearchForm
          onSubmit={handleSubmitSearch}
        />
        <AnnotationPage
          pageNo={pageNo}
          page={searchPage}
          onChangePageNo={handleChangePage}
        />
      </>
    }
  </div>
}


function formToQuery(form: FieldQueryForm) {
  if (form.field === QueryOperatorOrFn.none) {
    return {
      [form.field]: form.value
    }
  } else {
    throw new Error('Query operator implemented: ' + form.field)
  }
}



