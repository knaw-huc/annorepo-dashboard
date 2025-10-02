import { useConfig } from "../ConfigProvider.tsx";
import { Button } from "../common/Button.tsx";

import { NeutralButton } from "./NeutralButton.tsx";

export function LoginButton(props: { asLink?: boolean }) {
  const config = useConfig();

  function handleLogin() {
    window.location.href = `${config.AUTH_HOST.proxyUrl}/oidc/login`;
  }

  if (props.asLink) {
    return <NeutralButton onClick={handleLogin}>Login</NeutralButton>;
  }
  return <Button onClick={handleLogin}>Login</Button>;
}
