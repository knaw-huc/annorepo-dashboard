import {useDashboardStore} from "../../DashboardStore.ts";

import {hasError} from "../util/hasError.ts";

export const useHasFormErrors = (formIndex: number) => useDashboardStore(d => hasError(d.errors[formIndex]))