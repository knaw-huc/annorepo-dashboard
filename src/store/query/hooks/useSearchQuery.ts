import {toSearchQuery} from "../util/toSearchQuery.ts";
import {useStore} from "../../useStore.ts";
import {SearchQueryJson} from "../../../model/ArModel.ts";
import {hasErrors} from "../util/hasErrors.ts";

export const useSearchQuery = (
  // TODO: how to remove this param?
  asTemplate: boolean = false
): SearchQueryJson | undefined => useStore((store) => {
    if (!store.subqueries.length) {
      return;
    }
    if (hasErrors(store.subqueries)) {
      return;
    }
    try {
      return toSearchQuery(store.subqueries, asTemplate);
    } catch (error) {
      console.info('Invalid search query, returning undefined:', error)
      return undefined;
    }
  }
)
