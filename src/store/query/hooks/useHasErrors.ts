import {useDashboardStore} from "../../DashboardStore.ts";

import {hasError} from "../util/hasError.ts";

export const useHasErrors = useDashboardStore(d => !!d.errors.find(e => hasError(e)))

