import {PropsWithChildren} from "react";
import {Card} from "../common/Card.tsx";
import {A} from "../common/A.tsx";
import {External} from "../common/icon/External.tsx";
import {Link} from "@tanstack/react-router";
import {useContainer} from "../../client/endpoint/useContainer.tsx";
import {toName} from "../../util/toName.ts";
import {H5} from "../common/H5.tsx";
import {StatusMessage} from "../common/StatusMessage.tsx";


export function ContainerCard(props: PropsWithChildren<{
  name: string
}>) {
  const {name} = props;
  const containerRequest = useContainer(name)

  if (!containerRequest.isSuccess) {
    return <StatusMessage request={containerRequest}/>
  }

  const container = containerRequest.data;
  return <Card
    header={
      <Link
        to="/container/$containerName"
        params={{containerName: toName(container.id)}}
      ><H5>
        {container.label || ''}
      </H5></Link>
    }
    footer={
      <div className="text-right">
        <A href={toName(container.id)}>
          Raw
          <External className="ml-1"/>
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