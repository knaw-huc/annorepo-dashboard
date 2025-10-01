import { QuerySlice } from "./query/QuerySlice.ts";
import { SelectedAnnotationsSlice } from "./annotation/SelectedAnnotationsSlice.ts";
import { AuthSlice } from "./user/AuthSlice.ts";
import { HostSlice } from "./host/HostSlice.ts";

export type Store = QuerySlice &
  SelectedAnnotationsSlice &
  AuthSlice &
  HostSlice;
