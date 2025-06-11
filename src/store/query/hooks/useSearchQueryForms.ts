import {useDashboardStore} from "../../DashboardStore.ts";

export const useSearchQueryForms = useDashboardStore(store => store.forms)