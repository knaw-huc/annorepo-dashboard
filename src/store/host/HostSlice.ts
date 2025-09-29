import { SliceCreator } from "../query/SliceCreator.ts";
import { HostQueryParam } from "../../component/Config.ts";

export type HostState = {
  selectedHost: HostQueryParam;
};

export type HostSlice = HostState & {
  setHostState: (update: Partial<HostState>) => void;
};

export const createHostSlice: SliceCreator<HostSlice> = (set) => {
  return {
    selectedHost: "",
    setHostState: (update: Partial<HostState>) =>
      set((prev) => ({ ...prev, ...update })),
  };
};
