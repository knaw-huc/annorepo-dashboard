import {useContainer} from "../../client/endpoint/useContainer.tsx";
import {StatusMessage} from "../common/StatusMessage.tsx";
import {Badge} from "../common/Badge.tsx";
import {Pipe} from "../common/Pipe.tsx";
import {toName} from "../../util/toName.ts";
import {A} from "../common/A.tsx";
import {External} from "../common/icon/External.tsx";

export function ContainerSummary(props: { name: string, className: string }) {
  const {name} = props;
  const container = useContainer(name)

  let className = "mt-2 space-y-3"
  if (props.className) {
    className += ` ${props.className}`
  }

  if (!container.isSuccess) {
    return <StatusMessage requests={[container]}/>
  }

  return <p className={className}>
    <span>Annotations: <Badge>{container.data.total}</Badge></span>
    <Pipe/>
    <span>Name: <Badge>{toName(container.data.id)}</Badge></span>
    <Pipe/>
    <span>
      <A href={container.data.id}>
        Source<External className="ml-1"/>
      </A>
    </span>
  </p>
}