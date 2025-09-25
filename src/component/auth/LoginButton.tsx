import { useConfig } from "../ConfigProvider.tsx";
import { Button } from "../common/Button.tsx";

export function LoginButton() {
  const config = useConfig();

  function handleLogin() {
    console.log("Login", config.AUTH_HOST, config.AUTH_HOST.proxyUrl);
    window.location.href = `${config.AUTH_HOST.proxyUrl}/oidc/login`;
  }

  return <Button onClick={handleLogin}>Login</Button>;
}
