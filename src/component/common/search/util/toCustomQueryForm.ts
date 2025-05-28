import {
  ArCustomQueryResult,
  CustomQueryForm,
  SearchQuery
} from "../../../../client/ArModel.ts";

export function toCustomQueryForm(arCustomQuery: ArCustomQueryResult): CustomQueryForm {
  const query: SearchQuery = JSON.parse(arCustomQuery.queryTemplate)
  return {
    ...arCustomQuery,
    query
  }
}