import {H1} from "../common/H1.tsx";
import {useGet} from "../../client/useGet.tsx";
import {Loading} from "../common/Loading.tsx";

export function ContainerIndex() {
  const myContainers = useGet('/my/containers');

  return <div>
    <H1>Container index</H1>
    <pre>
      {myContainers.data
        ? JSON.stringify(myContainers.data, null, 2)
        : <Loading/>
      }
    </pre>  </div>
}