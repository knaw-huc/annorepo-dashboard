import { useContainer } from "../../client/endpoint/useContainer.tsx";
import { StatusMessage } from "../common/StatusMessage.tsx";
import { Badge } from "../common/Badge.tsx";
import { Pipe } from "../common/Pipe.tsx";
import { A } from "../common/A.tsx";
import { External } from "../common/icon/External.tsx";
import { UserRole } from "../../model/user/UserRole.tsx";

export function ContainerSummary(props: {
  name: string;
  className: string;
  role: UserRole;
}) {
  const { name } = props;
  const container = useContainer(name);

  let className = "mt-2 space-y-3";
  if (props.className) {
    className += ` ${props.className}`;
  }

  if (!container.isSuccess) {
    return <StatusMessage requests={[container]} />;
  }

  return (
    <p className={className}>
      <span className="capitalize">{props.role.toLowerCase()} role</span>
      <Pipe />
      <span>
        Annotations: <Badge>{container.data.total}</Badge>
      </span>
      <Pipe />
      <span>
        <A href={container.data.id}>
          Source
          <External className="ml-1" />
        </A>
      </span>
    </p>
  );
}
