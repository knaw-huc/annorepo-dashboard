import { SliceCreator } from "../query/SliceCreator.ts";
import {
  OidcUser,
  TokenUser,
  AnonymousUser,
  AuthMethod,
} from "../../model/user/User.ts";

export type AuthState = {
  withAuthentication: boolean;
  authMethods: AuthMethod[];
  selectedAuthMethod: AuthMethod | null;
  isAuthenticating: boolean;
} & (OidcUserState | TokenUserState | UnauthenticatedState);

export type OidcUserState = {
  withAuthentication: true;
  user: OidcUser;
};

export type TokenUserState = {
  withAuthentication: true;
  user: TokenUser;
};

export type UnauthenticatedState = {
  user: AnonymousUser;
};

export type AuthSlice = AuthState & {
  setAuthState: (update: Partial<AuthState>) => void;
};

export const createUserSlice: SliceCreator<AuthSlice> = (set) => {
  return {
    withAuthentication: false,
    authMethods: [],
    selectedAuthMethod: null,
    isAuthenticating: false,
    user: {
      authenticated: false,
      method: "anonymous",
    },
    setAuthState: (update: Partial<AuthState>) => {
      set((prev) => ({ prev, ...update }));
    },
  };
};
