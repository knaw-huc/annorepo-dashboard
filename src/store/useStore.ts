import {createWithEqualityFn as create} from "zustand/traditional";
import {createQuerySlice} from "./query/QuerySlice.ts";
import {Store} from "./Store.ts";

export const useStore = create<Store>()((...a) => ({
  ...createQuerySlice(...a),
}));