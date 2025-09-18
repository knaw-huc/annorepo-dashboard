import { useConfig } from "../ConfigProvider.tsx";
import { Button } from "../common/Button.tsx";

export function LoginButton() {
  const config = useConfig();

  function handleLogin() {
    window.location.href = `${config.AUTH_HOST}/oidc/login`;
  }

  return <Button onClick={handleLogin}>Login</Button>;
}
