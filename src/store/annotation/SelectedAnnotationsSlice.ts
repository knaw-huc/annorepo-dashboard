import { SliceCreator } from "../query/SliceCreator.ts";

type Id = string;
export type SelectedAnnotationsState = {
  selectedAnnotationIds: Id[];
};

export type SelectedAnnotationsSlice = SelectedAnnotationsState & {
  setSelectedAnnotationsState: (
    update: Partial<SelectedAnnotationsState>,
  ) => void;
};

export const createSelectedAnnotationsSlice: SliceCreator<
  SelectedAnnotationsSlice
> = (set) => {
  return {
    selectedAnnotationIds: [],
    setSelectedAnnotationsState: (update: Partial<SelectedAnnotationsState>) =>
      set((prev) => ({ ...prev, ...update })),
  };
};
