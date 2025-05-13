import {createContext, PropsWithChildren, useContext} from 'react';

export type Config = {
  AR_HOST: string
}

const defaultConfig: Config = {
  AR_HOST: '/api',
};

export const ConfigContext = createContext({
  config: defaultConfig,
});

export const ConfigProvider = (props: PropsWithChildren<{
  config: Config
}>) => {

  const {config} = props;

  validateConfig(config);

  return (
    <ConfigContext.Provider value={{config}}>
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
