import { toContainerName } from "../../util/toContainerName.ts";
import { useContainer } from "../../client/endpoint/useContainer.tsx";
import { useGet } from "../../client/query/useGet.tsx";
import { QR } from "../../client/query/QR.tsx";
import { ArMyContainers } from "../../model/ArModel.ts";
import { getRolesByName } from "./getRolesByName.ts";
import { UserRole } from "../../model/user/UserRole.tsx";

export function useContainerRole(props: { idOrName: string }) {
  const name = toContainerName(props.idOrName);
  const container = useContainer(name);
  const myContainers = useGet("/my/containers") as QR<ArMyContainers>;
  if (!myContainers?.data || !container?.data) {
    return UserRole.UNKNOWN;
  }
  return (
    getRolesByName(myContainers.data)[toContainerName(container.data.id)] ??
    UserRole.UNKNOWN
  );
}
