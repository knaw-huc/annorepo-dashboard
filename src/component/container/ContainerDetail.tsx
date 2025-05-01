import {H1} from "../common/H1.tsx";
import {Hint} from "../common/Hint.tsx";
import {Loading} from "../common/Loading.tsx";
import {useContainer} from "../../client/endpoint/useContainer.tsx";
import {Badge} from "../common/Badge.tsx";
import {
  ContainerAnnotationPage
} from "./ContainerAnnotationPage.tsx";
import {
  ContainerAnnotationFields
} from "../annotation/ContainerAnnotationFields.tsx";
import {Button} from "../common/Button.tsx";
import {useEffect, useState} from "react";
import {toPageNo} from "../../util/toPageNo.ts";
import {H2} from "../common/H2.tsx";
import {Add} from "../common/icon/Add.tsx";
import {Search} from "../common/icon/Search.tsx";

export type ContainerDetailProps = {
  name: string,
  onClickCreateAnnotation: () => void
  onClickSearchAnnotations: () => void
}

let NO_PAGE = -1;

export function ContainerDetail(props: ContainerDetailProps) {

  const {name} = props;
  const {data: container} = useContainer(name)
  const [pageNo, setPageNo] = useState<number>(NO_PAGE);

  useEffect(() => {
    const containerPageId = container?.first.id;
    if (containerPageId) {
      setPageNo(toPageNo(containerPageId))
    }
  }, [container]);

  if (!container) {
    return <Loading/>;
  }

  const handleChangePage = (update: number) => {
    setPageNo(update)
  }

  return <div>
    <H1>{container.label} <Hint>container</Hint></H1>
    <ul className="mt-5">
      <li>Annotations: <Badge>{container.total}</Badge></li>
    </ul>
    <ContainerAnnotationFields name={props.name}/>
    <H2>Annotations</H2>
    <div className="mb-2">
      <Button
        onClick={props.onClickCreateAnnotation}
        className="mr-2"
      >
        Add<Add className="ml-1"/>
      </Button>
      <Button
        onClick={props.onClickSearchAnnotations}
      >
        Search<Search className="ml-1"/>
      </Button>
    </div>
    {pageNo === NO_PAGE
      ? <Loading/>
      : <ContainerAnnotationPage containerName={name} pageNo={pageNo}
                                 onChangePageNo={handleChangePage}/>
    }
  </div>
}

