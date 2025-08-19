import { SliceCreator } from "../query/SliceCreator.ts";
import { UserStatus } from "../../model/user/User.ts";

export type UserState = {
  user: UserStatus;
};

export type UserSlice = UserState & {
  setUserState: (update: Partial<UserState>) => void;
};

export const createUserSlice: SliceCreator<UserSlice> = (set) => {
  return {
    user: { authenticated: false },
    setUserState: (update: Partial<UserState>) =>
      set((prev) => ({ ...prev, ...update })),
  };
};
