import { useMemo } from "react";
import { toArQuery } from "../util/toArQuery.ts";
import { useStore } from "../../useStore.ts";
import { ArQuery } from "../../../model/ArModel.ts";
import { hasErrors } from "../util/error/hasErrors.ts";

export const useSearchQuery = (
  asTemplate: boolean = false,
): ArQuery | undefined => {
  const { subqueries } = useStore();

  return useMemo(() => {
    if (!subqueries.length) {
      return undefined;
    }
    if (hasErrors(subqueries)) {
      return undefined;
    }
    try {
      return toArQuery(subqueries, asTemplate);
    } catch (error) {
      console.info("Invalid search query, returning undefined:", error);
      return undefined;
    }
  }, [subqueries, asTemplate]);
};
