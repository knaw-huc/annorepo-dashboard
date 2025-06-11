import {H1} from "../common/H1.tsx";
import {
  useMyContainerDetails
} from "../../client/endpoint/useMyContainerDetails.tsx";
import {ContainerCard} from "./ContainerCard.tsx";
import {toName} from "../../util/toName.ts";
import isNil from "lodash/isNil";
import {StatusMessage} from "../common/StatusMessage.tsx";
import {Button} from "../common/Button.tsx";
import {Add} from "../common/icon/Add.tsx";
import {useEffect} from "react";
import {useDashboardStore} from "../../store/DashboardStore.ts";

export function ContainerIndex(props: {
  onClickCreateContainer: () => void
}) {
  const {myContainers, details} = useMyContainerDetails();
  const {foo, setState} = useDashboardStore()

  useEffect(() => {
    setTimeout(() => setState({foo: 'bar'}), 1000)
  }, []);

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
    foo: {foo}
    <Button
      onClick={props.onClickCreateContainer}
      className="mt-2"
    >
      Add
      <Add className="ml-1"/>
    </Button>
    <div
      className="grid grid-cols-3 gap-5"
    >
      {names.map((name, i) => <ContainerCard key={i} name={name}/>)}
    </div>
  </div>
}

