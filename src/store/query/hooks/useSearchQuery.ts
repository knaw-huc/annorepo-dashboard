import {toSearchQuery} from "../util/toSearchQuery.ts";
import {useStore} from "../../useStore.ts";
import {SearchQueryJson} from "../../../model/ArModel.ts";
import {hasErrors} from "../util/hasErrors.ts";

export const useSearchQuery = (asTemplate?: boolean): SearchQueryJson | undefined => useStore(store => {
  if(!store.forms.length) {
    return;
  }
  if(hasErrors(store.errors)) {
    return;
  }
  const params = asTemplate ? store.params : [];
  try {
    return toSearchQuery(store.forms, params);
  } catch (e) {
    console.info('Invalid search query, returning undefined')
    return undefined;
  }
})
