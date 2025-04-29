import {H1} from "../common/H1.tsx";
import {Hint} from "../common/Hint.tsx";
import {Loading} from "../common/Loading.tsx";
import {useSearchContainer} from "../../client/endpoint/useSearchContainer.tsx";
import {useContainer} from "../../client/endpoint/useContainer.tsx";
import {useContainerFields} from "../../client/endpoint/useContainerFields.tsx";
import {H2} from "../common/H2.tsx";
import {Badge} from "../common/Badge.tsx";
import {ListGroup, ListItem} from "../common/ListGroup.tsx";
import { AnnotationPage } from "../annotation/AnnotationPage.tsx";

export type ContainerDetailProps = {
  name: string
}

export function ContainerDetail(props: ContainerDetailProps) {

  const {name} = props;
  const query = {"body.purpose": "identifying"};

  const {data: container} = useContainer(name)
  const {data: searchResult} = useSearchContainer(name, query);
  const {data: containerFields} = useContainerFields(name);

  console.log('ContainerDetail', {container, searchResult, containerFields})

  if (!container || !searchResult || !containerFields) {
    return <Loading/>;
  }

  const fieldEntries = Object.entries(containerFields);
  return <div>
    <H1>{name} <Hint>container</Hint></H1>
    <ul className="mt-5"  >
      <li>Annotations: <Badge>{container.total}</Badge></li>
    </ul>
    <div className="mt-5">
      <H2>Annotation fields <Hint>by usage</Hint></H2>
      <ListGroup>
        {fieldEntries.sort(countDesc).map(([field, count], i) => {
          return <ListItem
            key={field}
            isLast={i >= fieldEntries.length - 1}
          >
            {field} <span
            className="inline-block float-right"><Badge>{count}</Badge></span>
          </ListItem>
        })}
      </ListGroup>
    </div>
    <AnnotationPage page={container.first}/>
  </div>
}

function countDesc(
  a: [string, number],
  b: [string, number]
) {
  if (a[1] > b[1]) {
    return -1;
  } else if (a[1] < b[1]) {
    return 1;
  } else {
    return 0;
  }
}
