import { createWithEqualityFn as create } from "zustand/traditional";
import { createQuerySlice } from "./query/QuerySlice.ts";
import { Store } from "./Store.ts";
import { createSelectedAnnotationsSlice } from "./annotation/SelectedAnnotationsSlice.ts";
import { createUserSlice } from "./user/UserSlice.ts";

export const useStore = create<Store>()((...a) => ({
  ...createQuerySlice(...a),
  ...createSelectedAnnotationsSlice(...a),
  ...createUserSlice(...a),
}));
