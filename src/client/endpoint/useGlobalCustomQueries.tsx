import {QR, useGet} from "../query/useGet.tsx";
import {ArCustomQuery} from "../ArModel.ts";

/**
 * Get container for every name in my containers
 */
export function useGlobalCustomQueries() {
  return useGet('/global/custom-query') as QR<ArCustomQuery[]>
}

