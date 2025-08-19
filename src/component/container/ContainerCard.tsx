import { PropsWithChildren } from "react";
import { Card } from "../common/Card.tsx";
import { Link } from "@tanstack/react-router";
import { useContainer } from "../../client/endpoint/useContainer.tsx";
import { toName } from "../../util/toName.ts";
import { H5 } from "../common/H5.tsx";
import { StatusMessage } from "../common/StatusMessage.tsx";
import { ContainerSummary } from "./ContainerSummary.tsx";
import { UserRole } from "../../model/user/UserRole.tsx";

export function ContainerCard(
  props: PropsWithChildren<{
    name: string;
    role: UserRole;
  }>,
) {
  const { name } = props;
  const container = useContainer(name);

  if (!container.isSuccess) {
    return <StatusMessage requests={[container]} />;
  }

  return (
    <Card
      header={
        <Link
          to="/container/$containerName"
          params={{ containerName: toName(container.data.id) }}
        >
          <H5>{container.data.label || ""}</H5>
        </Link>
      }
    >
      <ContainerSummary name={name} role={props.role} className="mb-3" />
    </Card>
  );
}
