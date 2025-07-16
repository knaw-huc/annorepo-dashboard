import {PropsWithChildren, useContext, useEffect, useState} from "react";
import {createOpenApiClient} from "../../client/OpenApiClient.tsx";
import {OpenApiClientContext} from "../../client/OpenApiClientProvider.tsx";
import {LoginForm} from "./LoginForm.tsx";
import {useConfig} from "../ConfigProvider.tsx";
import {ArAboutData} from "../../model/ArModel.ts";

export function Login(props: PropsWithChildren<{}>) {

  const setClient = useContext(OpenApiClientContext).actions.setClient
  const client = useContext(OpenApiClientContext).state.client
  const config = useConfig()
  const [isWithAUth, setWithAuth] = useState(false)
  const createClient = (bearerToken: string) => {
    setClient(createOpenApiClient(bearerToken, config.AR_HOST))
  }

  useEffect(() => {
    fetch(`${config.AR_HOST}/about`).then(r => r.json().then(
      (body: ArAboutData) => setWithAuth(body.withAuthentication))
    )
  }, []);

  useEffect(() => {
    if (import.meta.env.DEV) {
      createClient('root')
    } else if (!isWithAUth) {
      createClient('root')
    }
  }, [isWithAUth]);

  return <>
    {client
      ? props.children
      : <LoginForm onSubmit={createClient}/>
    }
  </>

}

