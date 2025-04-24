import {H1} from "../common/H1.tsx";
import {QR} from "../../client/useGet.tsx";
import {Loading} from "../common/Loading.tsx";
import {Card} from "../common/Card.tsx";
import {useMyContainerDetails} from "../../client/useMyContainerDetails.tsx";
import {PropsWithChildren} from "react";
import React from "react";
import {ExternalLink} from "react-feather";
import {Pipe} from "../common/Pipe.tsx";
import {A} from "../common/A.tsx";

export type MyContainers = {
  ROOT: string[]
}

export type ArContainerPage = {
  "id": string,
  "type": "AnnotationPage",
  "partOf": string,
  "startIndex": number,
  "items": []
};

export type ArContainer = {
  id: string,
  label: string
  type: string[]
  total: number
  first: ArContainerPage
  last: string
}

export function ContainerIndex() {
  const containers: QR<ArContainer>[] = useMyContainerDetails();

  return <div>
    <H1>Container index</H1>
    <div
      className="grid grid-cols-3 gap-5"
    >
      {containers.map((container, i) => <React.Fragment
        key={i}>
        {container.data ? <ContainerCard
          container={container?.data}
        /> : <Loading/>}
      </React.Fragment>)}
    </div>
  </div>
}

export function ContainerCard(props: PropsWithChildren<{
  container: ArContainer
}>) {
  const {container} = props;

  if (!container) {
    return <Loading/>;
  }

  return <Card
    title={container.label || ''}
    footer={<A href={container.first.id}>
      Browse annotations
      <ExternalLink className="inline align-text-top ml-1" size="16"/>
    </A>}
  >
    <div>
      <p className="mb-2">
        <A href={container.id}>
          Source
          <ExternalLink className="inline align-middle ml-1" size="16"/>
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
