import {toSearchQuery} from "../util/toSearchQuery.ts";
import {useStore} from "../../useStore.ts";
import {SearchQuery} from "../../../client/ArModel.ts";
import {hasErrors} from "../util/hasErrors.ts";

export const useSearchQuery = (): SearchQuery | undefined => useStore(store => {
  if(!store.forms.length) {
    return;
  }
  if(hasErrors(store.errors)) {
    return;
  }
  return toSearchQuery(store.forms);
})