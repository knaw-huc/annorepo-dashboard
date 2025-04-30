import {FormEvent, useState} from "react";
import {Input} from "../common/Input.tsx";
import {Button} from "../common/Button.tsx";

export function LoginForm(props: {
  onSubmit: (bearerToken: string) => void
}) {
  const [token, setToken] = useState('')

  const handleSubmit = (event?: FormEvent) => {
    event?.preventDefault()
    if (token) {
      props.onSubmit(token)
    }
  };

  return <form
    onSubmit={handleSubmit}
    className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-4"
  >
    <Input value={token} onChange={setToken}/>
    <Button fullWidth onClick={handleSubmit}>Login</Button>
  </form>
}