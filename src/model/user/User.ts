export type User = {
  email: string;
  nickname: string;
};
export type UserStatus = AuthenticatedUser | UnauthenticatedUser;

type AuthenticatedUser = User & {
  authenticated: true;
};
export function isAuthenticated(user: UserStatus): user is AuthenticatedUser {
  return user.authenticated;
}

type UnauthenticatedUser = {
  authenticated: false;
};
