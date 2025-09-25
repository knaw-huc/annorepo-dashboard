import { useStore } from "../../store/useStore.ts";
import {
  isAnonymousUser,
  isOidcUser,
  isTokenUser,
} from "../../model/user/User.ts";
import { PropsWithChildren } from "react";
import { useConfig } from "../ConfigProvider.tsx";

export function LoginStatusBadge() {
  const { user } = useStore();

  return (
    <div className="absolute top-2 right-3 text-sm text-gray-600">
      {isOidcUser(user) && (
        <>
          Logged in as <strong>{user.nickname}</strong> | <LogoutButton />
        </>
      )}
      {isTokenUser(user) && <>Using token</>}
      {isAnonymousUser(user) && <>Not logged in</>}
    </div>
  );
}

export function LogoutButton() {
  const config = useConfig();

  function handleLogout() {
    const next = encodeURIComponent(window.location.origin + "/logout");
    window.location.href = `${config.AUTH_HOST.proxyUrl}/oidc/logout?next=${next}`;
  }

  return <LinkButton onClick={handleLogout}>Log out</LinkButton>;
}

export function LinkButton(
  props: PropsWithChildren<{
    onClick: () => void;
  }>,
) {
  return (
    <button
      onClick={props.onClick}
      className="underline hover:text-slate-900 cursor-pointer"
    >
      {props.children}
    </button>
  );
}
