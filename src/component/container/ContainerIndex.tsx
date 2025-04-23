import {H1} from "../common/H1.tsx";
import {QR, useGet} from "../../client/useGet.tsx";
import {Loading} from "../common/Loading.tsx";
import {Card} from "../common/Card.tsx";

export type MyContainers = {
  ROOT: string[]
}

export function ContainerIndex() {
  const myContainers: QR<MyContainers> = useGet('/my/containers');

  return <div>
    <H1>Container index</H1>
    <div className="grid grid-cols-3 gap-5">
      {myContainers.data
        ? myContainers.data.ROOT.map((container, i) => <ContainerCard
          name={container}
          key={i}
        />)
        : <Loading/>
      }
    </div>
  </div>
}

export function ContainerCard(props: { name: string }) {
  return <Card title={props.name}>
    Container details
  </Card>
}
