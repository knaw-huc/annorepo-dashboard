import { QuerySlice } from "./query/QuerySlice.ts";
import { SelectedAnnotationsSlice } from "./annotation/SelectedAnnotationsSlice.ts";

export type Store = QuerySlice & SelectedAnnotationsSlice;
