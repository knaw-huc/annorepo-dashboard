import {createContext, PropsWithChildren, useContext} from 'react';
import {merge} from "lodash";

export type AnnotationEditorFieldType =
  | 'dateTime'
  | 'userName'
  | 'text'

export type FieldConfig = {
  path: string,
  label: string,
  type: AnnotationEditorFieldType
};

export type Config = {
  AR_HOST: string
  annotationCard: {
    paths: string[]
    body: { paths: string[] }
  },
  annotationEditor: {
    fields:
      FieldConfig[]

  }
}

const defaultConfig: Config = {
  AR_HOST: '/api',
  annotationCard: {paths: [], body: {paths: []}},
  annotationEditor: {fields: [{path: "generated", label: "generated", type: "dateTime"}]}
};

export const ConfigContext = createContext({
  config: defaultConfig,
});

export const ConfigProvider = (props: PropsWithChildren<{
  config: Partial<Config>
}>) => {

  const {config} = props;

  const mergedConfig: Config = merge(defaultConfig, config);
  validateConfig(mergedConfig);

  return (
    <ConfigContext.Provider value={{config: mergedConfig}}>
      {props.children}
    </ConfigContext.Provider>
  )
}

function validateConfig(config: Config) {
  const expectedProps = Object
    .keys(defaultConfig);
  const hasAllProps = expectedProps
    .every(k => config[k as keyof Config]);
  if (!hasAllProps) {
    throw new Error(`Expected config ${JSON.stringify(config)} to contain keys: ${expectedProps}`)
  }
}

export function useConfig(): Config {
  return useContext(ConfigContext).config;
}
