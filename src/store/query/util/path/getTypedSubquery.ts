import { Subquery } from "../../../../model/query/QueryModel.ts";
import { PropertyName } from "lodash";
import { getOrThrow } from "./getOrThrow.ts";

export function getTypedSubquery<T extends Subquery>(
  subqueries: Subquery[],
  path: PropertyName[],
  typeguard: (toTest: Subquery) => toTest is T,
): T {
  const found = getOrThrow(subqueries, path);
  if (!typeguard(found)) {
    throw new Error(
      `Subquery at ${JSON.stringify(path)} did not match ${typeguard.name}: ${JSON.stringify(found)}`,
    );
  }
  return found;
}
