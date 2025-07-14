import {orThrow} from "../../../../util/orThrow.ts";
import {queryValueMappers} from "../queryValueMappers.ts";
import {QueryValue} from "../QueryValue.ts";

/**
 * @see queryValueMappers
 */
export function findMapperByValue(value: QueryValue) {
  return queryValueMappers.find(m => m.isType(value))
    ?? orThrow(`Could not find mapping by value ${value}`);
}