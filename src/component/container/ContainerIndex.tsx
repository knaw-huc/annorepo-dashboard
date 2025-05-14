import {H1} from "../common/H1.tsx";
import {
  useMyContainerDetails
} from "../../client/endpoint/useMyContainerDetails.tsx";
import {ContainerCard} from "./ContainerCard.tsx";
import {toName} from "../../util/toName.ts";
import isNil from "lodash/isNil";
import {StatusMessage} from "../common/StatusMessage.tsx";

export function ContainerIndex() {
  const {myContainers, details} = useMyContainerDetails();

  if(!myContainers.isSuccess || !details.every(d => d.isSuccess)) {
    return <StatusMessage requests={details} />
  }

  if(!details.length) {
    return null;
  }

  const names: string[] = details
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

