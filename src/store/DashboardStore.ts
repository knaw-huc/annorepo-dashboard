import {createQuerySlice, QuerySlice} from "./QuerySlice.ts";
import {create} from "zustand/index";

export type DashboardStore = QuerySlice;

export const useDashboardStore = create<DashboardStore>()((...a) => ({
  ...createQuerySlice(...a),
}));