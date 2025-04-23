import {H1} from "../common/H1.tsx";
import {QR} from "../../client/useGet.tsx";
import {Loading} from "../common/Loading.tsx";
import {Card} from "../common/Card.tsx";
import {useMyContainerDetails} from "../../client/useMyContainerDetails.tsx";
import {PropsWithChildren} from "react";

export type MyContainers = {
  ROOT: string[]
}
export type ArContainer = {
  id: string,
  label: string
}

export function ContainerIndex() {
  const containers: QR<ArContainer>[] = useMyContainerDetails();

  return <div>
    <H1>Container index</H1>
    <div
      className="grid grid-cols-3 gap-5"
    >
      {containers.map((container, i) => <ContainerCard
        name={container.data?.label || ''}
        key={i}
      >{container.data
        ? <div>{JSON.stringify(container.data, null, 2)}</div>
        : <Loading/>
      }</ContainerCard>)
      }
    </div>
  </div>
}

export function ContainerCard(props: PropsWithChildren<{ name: string }>) {
  return <Card title={props.name}>
    {props.children}
  </Card>
}
