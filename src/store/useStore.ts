import {createWithEqualityFn as create} from "zustand/traditional";
import {createQuerySlice} from "./query/QuerySlice.ts";
import {Store} from "./Store.ts";
import {createSelectedAnnotationsSlice} from "./query/SelectedAnnotationsSlice.ts";

export const useStore = create<Store>()((...a) => ({
  ...createQuerySlice(...a),
  ...createSelectedAnnotationsSlice(...a),
}));