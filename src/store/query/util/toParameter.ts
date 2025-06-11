import {FieldQueryForm} from "../../../component/common/search/QueryModel.ts";

export function toParameter(query: FieldQueryForm): string {
  const key = query.field
  const keyWithoutDots = key.replaceAll('.', '-')
  return `<${keyWithoutDots}>`
}