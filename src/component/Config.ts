export type AnnotationEditorFieldType =
  | 'dateTime'
  | 'text'

export type FieldConfig = {
  path: string,
  label: string,
  type: AnnotationEditorFieldType
};

export type Config = {
  AR_HOST: string
  annotationPreview: {
    paths: string[]
    body: { paths: string[] }
  },
  annotationEditor: {
    /**
     * Some basic lifecycle information fields
     */
    lifecycle:
      FieldConfig[]
  }
}