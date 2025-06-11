import {useDashboardStore} from "../../DashboardStore.ts";
import {
  toSearchQuery
} from "../util/toSearchQuery.ts";

export const useSearchQuery = useDashboardStore(store => toSearchQuery(store.forms))