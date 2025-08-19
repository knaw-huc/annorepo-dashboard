import { UserRole } from "./UserRole.tsx";

export function canEdit(role: UserRole) {
  return [UserRole.ADMIN, UserRole.EDITOR].includes(role);
}
