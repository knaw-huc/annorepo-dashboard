import {PropsWithChildren, useEffect} from "react";
import {useOpenApiContext} from "../../client/OpenApiClientProvider.tsx";
import {createOpenApiClient} from "../../client/createOpenApiClient.tsx";
import {LoginForm} from "./LoginForm.tsx";

export function Login(props: PropsWithChildren<{}>) {
  const [client, setClient] = useOpenApiContext()
  const createClient = (bearerToken: string) => {
    setClient(createOpenApiClient(bearerToken))
  }
  useEffect(() => {
    setClient(createOpenApiClient('root'))
  }, []);
  return <>
    {client
      ? props.children
      : <LoginForm onSubmit={createClient}/>
    }
  </>

}

