import {QuerySlice} from "./query/QuerySlice.ts";
import {SelectedAnnotationsSlice} from "./query/SelectedAnnotationsSlice.ts";

export type Store = QuerySlice & SelectedAnnotationsSlice;

