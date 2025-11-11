import { UserRole } from "./UserRole.tsx";

export function canEdit(role?: UserRole) {
  if (!role) {
    return false;
  }
  return [UserRole.ADMIN, UserRole.EDITOR].includes(role);
}
