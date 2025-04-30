import {H1} from "../common/H1.tsx";
import {Hint} from "../common/Hint.tsx";
import {Loading} from "../common/Loading.tsx";
import {useSearchContainer} from "../../client/endpoint/useSearchContainer.tsx";
import {useContainer} from "../../client/endpoint/useContainer.tsx";
import {Badge} from "../common/Badge.tsx";
import {AnnotationPage} from "../annotation/AnnotationPage.tsx";
import {ContainerAnnotationFields} from "../annotation/ContainerAnnotationFields.tsx";
import {Button} from "../common/Button.tsx";

export type ContainerDetailProps = {
  name: string,
  onClickCreateAnnotation: () => void
}

export function ContainerDetail(props: ContainerDetailProps) {

  const {name} = props;
  const query = {"body.purpose": "identifying"};

  const {data: container} = useContainer(name)
  const {data: searchResult} = useSearchContainer(name, query);

  console.log('ContainerDetail', {container, searchResult})

  if (!container || !searchResult) {
    return <Loading/>;
  }

  return <div>
    <H1>{container.label} <Hint>container</Hint></H1>
    <Button onClick={props.onClickCreateAnnotation}>New annotation</Button>
    <ul className="mt-5"  >
      <li>Annotations: <Badge>{container.total}</Badge></li>
    </ul>
    <ContainerAnnotationFields name={props.name}/>
    <AnnotationPage page={container.first}/>
  </div>
}

