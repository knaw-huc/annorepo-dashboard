import {H1} from "../common/H1.tsx";
import {QR} from "../../client/useGet.tsx";
import {Loading} from "../common/Loading.tsx";
import {useMyContainerDetails} from "../../client/useMyContainerDetails.tsx";
import React from "react";
import {ArContainer} from "../../client/ArModel.ts";
import {ContainerCard} from "./ContainerCard.tsx";

export function ContainerIndex() {
  const containers: QR<ArContainer>[] = useMyContainerDetails();

  return <div>
    <H1>Containers</H1>
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

