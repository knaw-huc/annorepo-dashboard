import {H1} from "../common/H1.tsx";
import {Hint} from "../common/Hint.tsx";
import {Loading} from "../common/Loading.tsx";
import {useSearchContainer} from "../../client/endpoint/useSearchContainer.tsx";
import {useContainer} from "../../client/endpoint/useContainer.tsx";

export type ContainerDetailProps = {
  name: string
}

export function ContainerDetail(props: ContainerDetailProps) {

  const {name} = props;
  const query = {"body.purpose": "identifying"};

  const {data: container} = useContainer(name)
  const {data: searchResult} = useSearchContainer(name, query);

  if (!container || !searchResult) {
    return <Loading/>;
  }

  return <div>
    <H1>{name} <Hint>container</Hint></H1>
    <ul>
      <li>{container.total} annotations</li>
    </ul>
    <pre>{JSON.stringify(searchResult, null, 2)}</pre>
  </div>
}