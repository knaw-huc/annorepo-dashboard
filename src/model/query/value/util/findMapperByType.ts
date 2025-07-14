import {orThrow} from "../../../../util/orThrow.ts";
import {QueryValueType} from "../QueryValueType.ts";
import {queryValueMappers} from "../queryValueMappers.ts";

/**
 * @see queryValueMappers
 */
export function findMapperByType(type: QueryValueType) {
  return queryValueMappers.find(m => m.type === type)
    ?? orThrow(`Could not find mapping by type ${type}`);
}