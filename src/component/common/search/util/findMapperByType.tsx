import {orThrow} from "../../../../util/orThrow.ts";
import {QueryValueType} from "../../../../model/query/value/QueryValueType.ts";
import {queryValueMappers} from "../../../../model/query/value/queryValueMappers.ts";

export function findMapperByType(type: QueryValueType) {
  return queryValueMappers.find(m => m.type === type)
    ?? orThrow(`Could not find mapping by type ${type}`);
}