import {findMapperByType} from "../common/search/util/findMapperByType.tsx";
import {QueryValueType} from "../../model/query/value/QueryValueType.ts";

export type AnnotationFieldType =
  | 'dateTime'
  | 'string'
  | 'number'

export function toDefaultAnnotationFieldValue(
  type: AnnotationFieldType
): string | number {
  switch (type) {
    case "dateTime":
      return new Date().toISOString();
    case "string":
      return ""
    case "number":
      return 0
    default:
      return ""
  }
}

export function toQueryValueType(
  type: AnnotationFieldType
): QueryValueType {
  if (type === 'dateTime') {
    return "string"
  }
  try {
    findMapperByType(type)
    return type
  } catch (e) {
    throw new Error(`Annotation type ${type} not a known query type`)
  }
}

