import {PropsWithChildren} from "react";
import {ArContainer} from "../../client/ArModel.ts";
import {Loading} from "../common/Loading.tsx";
import {Card} from "../common/Card.tsx";
import {A} from "../common/A.tsx";
import {External} from "../common/icon/External.tsx";
import {Pipe} from "../common/Pipe.tsx";

export function ContainerCard(props: PropsWithChildren<{
  container: ArContainer
}>) {
  const {container} = props;

  if (!container) {
    return <Loading/>;
  }

  return <Card
    header={<h5 className="mt-2 text-xl font-medium leading-tight text-center">
      {container.label || ''}
    </h5>}
    footer={<A href={container.first.id}>
      Browse annotations
      <External/>
    </A>}
  >
    <div>
      <p className="mb-2">
        <A href={container.id}>
          Source
          <External/>
        </A>
        <Pipe/>
        {container.total} annotations
      </p>
      <p>
        Types: {container.type.join(', ')}
      </p>
    </div>
  </Card>
}