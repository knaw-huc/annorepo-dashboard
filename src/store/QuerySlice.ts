import {StateCreator} from "zustand";

export type SliceCreator<SLICE> = StateCreator<SLICE, [], [], SLICE>

export type QueryState = {
  foo: string
}
export type QuerySlice = QueryState & {
  setState: (update: QueryState) => void
}

export const createQuerySlice: SliceCreator<QuerySlice> = (set) => ({
  foo: '',
  setState: (update: QueryState) => set(() => ({ ...update })),
});

