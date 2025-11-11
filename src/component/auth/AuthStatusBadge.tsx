import { useStore } from "../../store/useStore.ts";
import {
  isAnonymousUser,
  isOidcUser,
  isTokenUser,
} from "../../model/user/User.ts";
import { LogoutButton } from "./LogoutButton.tsx";
import { NeutralButton } from "../common/NeutralButton.tsx";

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
      {isTokenUser(user) && <span>Logged in using token</span>}
      {isAnonymousUser(user) && (
        <>
          Not logged in
          {!!authMethods.length && (
            <>
              <NeutralButton className="ml-3" onClick={props.openLogin}>
                Login
              </NeutralButton>
            </>
          )}
        </>
      )}
    </>
  );
}
