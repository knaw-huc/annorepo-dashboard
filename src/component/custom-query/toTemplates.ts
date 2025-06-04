import {FieldQueryForm} from "../common/search/QueryModel.ts";

export function toTemplates(query: FieldQueryForm[]): FieldQueryForm[] {
  return query.map(toTemplate)
}

export function toTemplate(query: FieldQueryForm): FieldQueryForm {
  const result = {...query};
  const key = result.field
  const keyWithoutDots = key.replaceAll('.', '-')
  result.value = `<${keyWithoutDots}>`
  return result
}
