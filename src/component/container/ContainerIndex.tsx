import {H1} from "../common/H1.tsx";
import {QR} from "../../client/query/useGet.tsx";
import {Loading} from "../common/Loading.tsx";
import {
  useMyContainerDetails
} from "../../client/endpoint/useMyContainerDetails.tsx";
import {ArContainer} from "../../client/ArModel.ts";
import {ContainerCard} from "./ContainerCard.tsx";
import {toName} from "../../util/toName.ts";
import isNil from "lodash/isNil";

export function ContainerIndex() {
  const containers: QR<ArContainer>[] = useMyContainerDetails();

  if (containers.length && containers[0].isLoading) {
    return <Loading/>;
  }

  const names: string[] = containers
    .map(c => c.data && toName(c.data.id))
    .filter(name => !isNil(name))

  return <div>
    <H1>Containers</H1>
    <div
      className="grid grid-cols-3 gap-5"
    >
      {names.map((name, i) => <ContainerCard key={i} name={name}/>)}
    </div>
  </div>
}

