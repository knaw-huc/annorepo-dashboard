import {useDashboardStore} from "../../DashboardStore.ts";

export const useSearchQuerySlice = useDashboardStore(store => ({
  forms: store.forms
}))