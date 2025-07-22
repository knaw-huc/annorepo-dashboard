import {toSearchQuery} from "../util/toSearchQuery.ts";
import {useStore} from "../../useStore.ts";
import {SearchQueryJson} from "../../../model/ArModel.ts";
import {hasErrors} from "../util/hasErrors.ts";

export const useSearchQuery = (asTemplate?: boolean): SearchQueryJson | undefined => useStore(store => {
  if(!store.subqueries.length) {
    return;
  }
  if(hasErrors(store.subqueries)) {
    return;
  }
  const params = asTemplate ? store.params : [];
  try {
    return toSearchQuery(store.subqueries, params);
  } catch (error) {
    console.info('Invalid search query, returning undefined:', error)
    return undefined;
  }
})
