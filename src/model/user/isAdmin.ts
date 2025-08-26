import { UserRole } from "./UserRole.tsx";

export function isAdmin(role: UserRole) {
  return UserRole.ADMIN === role;
}
