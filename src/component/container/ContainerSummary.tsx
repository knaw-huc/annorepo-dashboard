import { useContainer } from "../../client/endpoint/useContainer.tsx";
import { StatusMessage } from "../common/StatusMessage.tsx";
import { Pipe } from "../common/Pipe.tsx";
import { UserRole } from "../../model/user/UserRole.tsx";

export function ContainerSummary(props: {
  name: string;
  color?: string;
  role: UserRole;
}) {
  const { name, role } = props;
  const container = useContainer(name);

  let className = "text-sm ";
  className += " " + (props.color ?? "text-neutral-500");

  if (!container.isSuccess) {
    return <StatusMessage name="container" requests={[container]} />;
  }

  return (
    <div className={className}>
      <span>{name}</span>
      <Pipe />
      <span>{role.toLowerCase()} role</span>
    </div>
  );
}
