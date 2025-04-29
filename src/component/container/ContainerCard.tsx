import {PropsWithChildren} from "react";
import {Card} from "../common/Card.tsx";
import {A} from "../common/A.tsx";
import {External} from "../common/icon/External.tsx";
import {Pipe} from "../common/Pipe.tsx";
import {Link} from "@tanstack/react-router";
import {getName} from "../../util/getName.ts";
import {Loading} from "../common/Loading.tsx";
import {useContainer} from "../../client/endpoint/useContainer.tsx";


export function ContainerCard(props: PropsWithChildren<{
  id: string
}>) {
  const name = getName(new URL(props.id))
  const {data: container} = useContainer(name)

  if (!container) {
    return <Loading/>;
  }

  return <Card
    header={
      <Link
        to="/container/$containerId"
        params={{containerId: container.id}}
      ><h5
        className="mt-2 text-xl font-medium leading-tight text-center"
      >
        {container.label || ''}
      </h5></Link>
    }
    footer={
      <div className="text-right">
        <A href={container.id}>
          Source
          <External/>
        </A>
        <Pipe/>
        <A href={container.first.id}>
          Browse annotations
          <External/>
        </A>
      </div>
    }
  >
    <div>
      <p className="mb-2">
        Annotations: {container.total}
      </p>
      <p>
        Type: {container.type.join(', ')}
      </p>
    </div>
  </Card>
}