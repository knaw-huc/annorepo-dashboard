import { useStore } from "../../store/useStore.ts";
import {
  isAnonymousUser,
  isOidcUser,
  isTokenUser,
} from "../../model/user/User.ts";
import { NeutralButton } from "./NeutralButton.tsx";
import { LogoutButton } from "./LogoutButton.tsx";

export function AuthStatusBadge(props: { openLogin: () => void }) {
  const { user, authMethods } = useStore();

  return (
    <>
      {isOidcUser(user) && (
        <>
          <span>
            Logged in as <strong>{user.nickname}</strong>
          </span>{" "}
          <LogoutButton />
        </>
      )}
      {isTokenUser(user) && <span>Using token</span>}
      {isAnonymousUser(user) && (
        <>
          Not logged in
          {!!authMethods.length && (
            <>
              <NeutralButton onClick={props.openLogin}>Login</NeutralButton>
            </>
          )}
        </>
      )}
    </>
  );
}
