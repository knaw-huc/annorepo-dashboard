import {H1} from "../common/H1.tsx";
import {Hint} from "../common/Hint.tsx";
import {Loading} from "../common/Loading.tsx";
import {useSearchContainer} from "../../client/endpoint/useSearchContainer.tsx";
import {useContainer} from "../../client/endpoint/useContainer.tsx";
import {Badge} from "../common/Badge.tsx";
import {ContainerAnnotationPage} from "../annotation/ContainerAnnotationPage.tsx";
import {
  ContainerAnnotationFields
} from "../annotation/ContainerAnnotationFields.tsx";
import {Button} from "../common/Button.tsx";
import {useEffect, useState} from "react";
import {toPageNo} from "../../util/toPageNo.ts";

export type ContainerDetailProps = {
  name: string,
  onClickCreateAnnotation: () => void
}

let NO_PAGE = -1;

export function ContainerDetail(props: ContainerDetailProps) {

  const {name} = props;
  const query = {"body.purpose": "identifying"};
  const {data: container} = useContainer(name)
  const {data: searchResult} = useSearchContainer(name, query);
  const [pageNo, setPageNo] = useState<number>(NO_PAGE);

  useEffect(() => {
    const containerPageId = container?.first.id;
    if (containerPageId) {
      setPageNo(toPageNo(containerPageId))
    }
  }, [container]);

  if (!container || !searchResult) {
    return <Loading/>;
  }

  const handleChangePage = (update: number) => {
    setPageNo(update)
  }

  return <div>
    <H1>{container.label} <Hint>container</Hint></H1>
    <Button onClick={props.onClickCreateAnnotation}>New annotation</Button>
    <ul className="mt-5">
      <li>Annotations: <Badge>{container.total}</Badge></li>
    </ul>
    <ContainerAnnotationFields name={props.name}/>
    {pageNo === NO_PAGE
      ? <Loading/>
      : <ContainerAnnotationPage containerName={name} pageNo={pageNo} onChangePageNo={handleChangePage}/>
    }
  </div>
}

