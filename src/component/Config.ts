import {AnnotationFieldType} from "./annotation/AnnotationFieldType.ts";

export type FieldConfig = {
  path: string,
  label: string,
  type: AnnotationFieldType
};

export type Config = {
  AR_HOST: string
  annotationPreview: {
    paths: string[]
    body: { paths: string[] }
  },
  annotationEditor: {
    /**
     * Obligatory fields
     */
    fields: FieldConfig[]
  }
}