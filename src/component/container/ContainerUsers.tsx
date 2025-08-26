import { useContainerUsers } from "../../client/endpoint/useContainerUsers.tsx";
import { StatusMessage } from "../common/StatusMessage.tsx";
import { H2 } from "../common/H2.tsx";
import { Badge } from "../common/Badge.tsx";

export function ContainerUsers(props: { name: string }) {
  const { name } = props;
  const containerUsers = useContainerUsers(name);
  if (!containerUsers.isSuccess) {
    return <StatusMessage requests={[containerUsers]} />;
  }
  return (
    <div>
      <H2>Users</H2>
      {containerUsers.data.map((u) => (
        <Badge>
          {u.userName} ({u.role.toLowerCase()})
        </Badge>
      ))}
    </div>
  );
}
