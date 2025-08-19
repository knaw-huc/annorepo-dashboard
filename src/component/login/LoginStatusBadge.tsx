import { useStore } from "../../store/useStore.ts";
import { isAuthenticatedUser } from "../../model/user/User.ts";

export function LoginStatusBadge() {
  const { user } = useStore();

  return (
    <div className="absolute top-2 right-3 text-sm text-gray-600">
      {isAuthenticatedUser(user) ? (
        <>
          Logged in as <strong>{user.nickname}</strong>
        </>
      ) : (
        <>Not logged in</>
      )}
    </div>
  );
}
