import {PropsWithChildren} from "react";
import {ArContainer} from "../../client/ArModel.ts";
import {Loading} from "../common/Loading.tsx";
import {Card} from "../common/Card.tsx";
import {A} from "../common/A.tsx";
import {External} from "../common/icon/External.tsx";
import {Pipe} from "../common/Pipe.tsx";
import {Link} from "@tanstack/react-router";
import {useSearchContainer} from "../../client/useSearchContainer.tsx";
import {getName} from "../../util/getName.tsx";


export function ContainerCard(props: PropsWithChildren<{
  container: ArContainer
}>) {
  const {container} = props;
  const query = {"body.purpose": "identifying"};

  const containerName = getName(new URL(container.id))

  const searchResult = useSearchContainer(containerName, query);

  if (!searchResult.data) {
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
        {container.total} annotations
      </p>
      <div className="mb-2">
        Last edit:
        <pre>{JSON.stringify(searchResult.data, null, 2)}</pre>
      </div>
      <p>
        Type: {container.type.join(', ')}
      </p>
    </div>
  </Card>
}