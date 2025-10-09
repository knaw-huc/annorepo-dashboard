import { useConfig } from "../ConfigProvider.tsx";
import { DeprecatedButton } from "../common/DeprecatedButton.tsx";

import { NeutralButton } from "../common/Button.tsx";

export function LoginButton(props: { asLink?: boolean }) {
  const config = useConfig();

  function handleLogin() {
    window.location.href = `${config.AUTH_HOST.proxyUrl}/oidc/login`;
  }

  if (props.asLink) {
    return <NeutralButton onClick={handleLogin}>Login</NeutralButton>;
  }
  return <DeprecatedButton onClick={handleLogin}>Login</DeprecatedButton>;
}
