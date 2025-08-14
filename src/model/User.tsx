export type User = {
  email: string;
  name: string;
};
export type UserStatus = AuthenticatedUser | UnauthenticatedUser;

type AuthenticatedUser = User & {
  authenticated: true;
};
export function isAuthenticatedUser(
  user: UserStatus,
): user is AuthenticatedUser {
  return user.authenticated;
}

type UnauthenticatedUser = {
  authenticated: false;
};
