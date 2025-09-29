import { AnnotationFieldType } from "./annotation/AnnotationFieldType.ts";

export type FieldConfig = {
  path: string;
  label: string;
  type: AnnotationFieldType;
};

export type HostQueryParam = string;
export type HostUrl = string;
export type HostOptions = Record<HostQueryParam, HostUrl>;

export type Config = {
  /**
   * Configure hosts
   */
  AR_HOSTS: HostOptions;
  AUTH_HOST: {
    proxyUrl: string;
    providerUrl: string;
  };

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
