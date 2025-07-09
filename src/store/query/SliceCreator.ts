import {StateCreator} from "zustand/index";

export type SliceCreator<SLICE> = StateCreator<SLICE, [], [], SLICE>