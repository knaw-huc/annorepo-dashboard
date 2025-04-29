import {H1} from "../common/H1.tsx";
import {Hint} from "../common/Hint.tsx";
import {QR, useGet} from "../../client/useGet.tsx";
import {ArContainer} from "../../client/ArModel.ts";
import {Loading} from "../common/Loading.tsx";
import {getName} from "../../util/getName.ts";
import {useSearchContainer} from "../../client/useSearchContainer.tsx";

export type ContainerDetailProps = {
  id: string
}

export function ContainerDetail(props: ContainerDetailProps) {
  const {id} = props;
  const name = getName(new URL(id))
  const query = {"body.purpose": "identifying"};
  const containerName = getName(new URL(id))
  const searchResult = useSearchContainer(containerName, query);

  if (!searchResult.data) {
    return <Loading/>;
  }


  if(!name) {
    throw new Error(`No name found in id ${id}`)
  }
  const {data: container}: QR<ArContainer> = useGet('/w3c/{containerName}', {params: {path: {containerName: name}}})

  if(!container) {
    return <Loading />
  }
  return <div>
    <H1>{name} <Hint>container</Hint></H1>
    <ul>
      <li>{container.total} annotations</li>
    </ul>
    <pre>{JSON.stringify(searchResult.data, null, 2)}</pre>
  </div>
}