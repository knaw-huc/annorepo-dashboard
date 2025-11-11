import { PropsWithChildren } from "react";
import { Link } from "@tanstack/react-router";
import { useContainer } from "../../client/endpoint/useContainer.tsx";
import { StatusMessage } from "../common/StatusMessage.tsx";
import { UserRole } from "../../model/user/UserRole.tsx";
import { toContainerName } from "../../util/toContainerName.ts";
import { ContainerSummary } from "./ContainerSummary.tsx";
import { useContainerRole } from "./useContainerRole.tsx";

export function ContainerCard(
  props: PropsWithChildren<{
    name: string;
    role: UserRole;
  }>,
) {
  const { name } = props;
  const container = useContainer(name);
  const role = useContainerRole({ idOrName: name });

  if (!container.isSuccess) {
    return <StatusMessage name="container" requests={[container]} />;
  }

  return (
    <Link
      to="/container/$containerName"
      params={{ containerName: toContainerName(container.data.id) }}
      className="rounded no-underline border border-white hover:border-anrep-green-200 transition"
    >
      <div className="bg-anrep-green-100 p-4 rounded-t">
        <div className="flex justify-between">
          <h2 className="text-anrep-green-900">{container.data.label || ""}</h2>
          <div>
            <img src="/images/icon-container.png" className="h-4 w-4" alt="" />
          </div>
        </div>
        <ContainerSummary
          name={name}
          role={role}
          color="text-anrep-green-700"
        />
      </div>
      <div className="bg-anrep-blue-50 flex justify-between p-4 rounded-b text-anrep-blue-700">
        <div>Annotations</div>
        <div className="flex gap-1 items-center">
          {container.data.total}
          <img src="/images/icon-annotation.png" className="h-4 w-4" alt="" />
        </div>
      </div>
    </Link>
  );
}
