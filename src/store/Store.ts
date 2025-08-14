import { QuerySlice } from "./query/QuerySlice.ts";
import { SelectedAnnotationsSlice } from "./annotation/SelectedAnnotationsSlice.ts";
import { UserSlice } from "./user/UserSlice.ts";

export type Store = QuerySlice & SelectedAnnotationsSlice & UserSlice;
