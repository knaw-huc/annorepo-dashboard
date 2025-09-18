import { AnnotationFieldType } from "./annotation/AnnotationFieldType.ts";

export type FieldConfig = {
  path: string;
  label: string;
  type: AnnotationFieldType;
};

type HostQueryParam = string;
type HostUrl = string;

export type Config = {
  /**
   * Configure hosts
   */
  AR_HOSTS: Record<HostQueryParam, HostUrl>;
  AUTH_HOST: string;

  annotationPreview: {
    paths: string[];
    body: { paths: string[] };
  };
  annotationEditor: {
    /**
     * Obligatory fields
     */
    fields: FieldConfig[];
  };
};
