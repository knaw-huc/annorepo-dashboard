export type User = AnonymousUser | OidcUser | TokenUser;

export type AuthMethod = "oidc" | "token" | "anonymous";

export type BaseUser = {
  method: AuthMethod;
  authenticated: boolean;
};

export type OidcUser = BaseUser & {
  method: "oidc";
  authenticated: true;
  email: string;
  nickname: string;
};
export function isOidcUser(toTest: User): toTest is OidcUser {
  return toTest.method === "oidc";
}
export type TokenUser = BaseUser & {
  method: "token";
  authenticated: true;
  token: string;
};
export function isTokenUser(toTest: User): toTest is TokenUser {
  return toTest.method === "token";
}

type AuthenticatedUser = OidcUser | TokenUser;

export function isAuthenticated(
  user: TokenUser | OidcUser | AnonymousUser,
): user is AuthenticatedUser {
  return (user as OidcUser).authenticated;
}

export type AnonymousUser = BaseUser & {
  method: "anonymous";
  authenticated: false;
};

export function isAnonymousUser(toTest: User): toTest is AnonymousUser {
  return toTest.method === "anonymous";
}
