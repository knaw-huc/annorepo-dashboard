import { toArQuery } from "../util/toArQuery.ts";
import { useStore } from "../../useStore.ts";
import { ArQuery } from "../../../model/ArModel.ts";
import { hasErrors } from "../util/error/hasErrors.ts";

export const useSearchQuery = (
  asTemplate: boolean = false,
): ArQuery | undefined =>
  useStore((store) => {
    if (!store.subqueries.length) {
      return;
    }
    if (hasErrors(store.subqueries)) {
      return;
    }
    try {
      return toArQuery(store.subqueries, asTemplate);
    } catch (error) {
      console.info("Invalid search query, returning undefined:", error);
      return undefined;
    }
  });
