import { SliceCreator } from "../query/SliceCreator.ts";
import { OidcUser, TokenUser, AnonymousUser } from "../../model/user/User.ts";

export type UserState = {
  withAuthentication: boolean;
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

export type UserSlice = UserState & {
  setUserState: (update: Partial<UserState>) => void;
};

export const createUserSlice: SliceCreator<UserSlice> = (set) => {
  return {
    status: "loading",
    withAuthentication: false,
    user: {
      authenticated: false,
      method: "anonymous",
    },
    setUserState: (update: Partial<UserState>) => {
      console.log("setUserState", update);
      set((prev) => ({ prev, ...update }));
    },
  };
};
