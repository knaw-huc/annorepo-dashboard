import { useStore } from "../../store/useStore.ts";
import {
  isAnonymousUser,
  isOidcUser,
  isTokenUser,
} from "../../model/user/User.ts";
import { LinkButton } from "./LinkButton.tsx";
import { LogoutButton } from "./LogoutButton.tsx";

export function AuthStatusBadge(props: { openLogin: () => void }) {
  const { user, authMethods } = useStore();

  return (
    <div className="absolute top-2 right-3 text-sm text-gray-600">
      {isOidcUser(user) && (
        <>
          Logged in as <strong>{user.nickname}</strong> | <LogoutButton />
        </>
      )}
      {isTokenUser(user) && <>Using token</>}
      {isAnonymousUser(user) && (
        <>
          Not logged in
          {!!authMethods.length && (
            <>
              {" "}
              | <LinkButton onClick={() => props.openLogin()}>Login</LinkButton>
            </>
          )}
        </>
      )}
    </div>
  );
}
