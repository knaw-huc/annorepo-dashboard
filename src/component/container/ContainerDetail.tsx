import {H1} from "../common/H1.tsx";
import {Hint} from "../common/Hint.tsx";
import {Loading} from "../common/Loading.tsx";
import {useSearchContainer} from "../../client/endpoint/useSearchContainer.tsx";
import {useContainer} from "../../client/endpoint/useContainer.tsx";
import {useContainerFields} from "../../client/endpoint/useContainerFields.tsx";
import {H2} from "../common/H2.tsx";
import { Badge } from "../common/Badge.tsx";

export type ContainerDetailProps = {
  name: string
}

export function ContainerDetail(props: ContainerDetailProps) {

  const {name} = props;
  const query = {"body.purpose": "identifying"};

  const {data: container} = useContainer(name)
  const {data: searchResult} = useSearchContainer(name, query);
  const {data: containerFields} = useContainerFields(name);

  if (!container || !searchResult || !containerFields) {
    return <Loading/>;
  }

  return <div>
    <H1>{name} <Hint>container</Hint></H1>
    <ul>
      <li>Annotations: <Badge>{container.total}</Badge></li>
    </ul>
    <div className="mt-5">
      <H2>Annotation fields <Hint>by usage</Hint></H2>
      <ul>
        {Object.entries(containerFields).sort(countDesc).map(([field, count]) =>
          <li key={field}>{field} <Badge>{count}</Badge></li>
        )}</ul>
    </div>
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
