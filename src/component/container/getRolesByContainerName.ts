import { ArMyContainers } from "../../model/ArModel.ts";
import { UserRole } from "../../model/user/UserRole.tsx";

export function getRolesByContainerName(
  containersByRole: ArMyContainers,
): Record<string, UserRole> {
  return Object.fromEntries(
    Object.entries(containersByRole).flatMap(([role, containerNames]) => {
      return containerNames.map((name) => [name, role as UserRole]);
    }),
  );
}
