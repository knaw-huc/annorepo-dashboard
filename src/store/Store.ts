import { QuerySlice } from "./query/QuerySlice.ts";
import { SelectedAnnotationsSlice } from "./annotation/SelectedAnnotationsSlice.ts";
import { UserSlice } from "./user/UserSlice.ts";
import { HostSlice } from "./host/HostSlice.ts";

export type Store = QuerySlice &
  SelectedAnnotationsSlice &
  UserSlice &
  HostSlice;
