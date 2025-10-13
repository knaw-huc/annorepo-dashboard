import { useConfig } from "../ConfigProvider.tsx";

import { NeutralButton } from "../common/NeutralButton.tsx";

export function LogoutButton() {
  const config = useConfig();

  function handleLogout() {
    const next = encodeURIComponent(window.location.origin + "/logout");
    window.location.href = `${config.AUTH_HOST.proxyUrl}/oidc/logout?next=${next}`;
  }

  return <NeutralButton onClick={handleLogout}>Log out</NeutralButton>;
}
