import {PropsWithChildren, useContext} from "react";
import {createOpenApiClient} from "../../client/OpenApiClient.tsx";
import {OpenApiClientContext} from "../../client/OpenApiClientProvider.tsx";
import {LoginForm} from "./LoginForm.tsx";
import {useConfig} from "../ConfigProvider.tsx";

export function Login(props: PropsWithChildren<{}>) {

  const setClient = useContext(OpenApiClientContext).actions.setClient
  const client = useContext(OpenApiClientContext).state.client
  const config = useConfig()

  const createClient = (bearerToken: string) => {
    setClient(createOpenApiClient(bearerToken, config.AR_HOST))
  }

  // useEffect(() => {
  //   if (import.meta.env.DEV) {
  //     createClient('root')
  //   }
  // }, []);

  return <>
    {client
      ? props.children
      : <LoginForm onSubmit={createClient}/>
    }
  </>

}

