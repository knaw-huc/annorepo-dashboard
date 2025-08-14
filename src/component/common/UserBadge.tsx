import { useStore } from "../../store/useStore.ts";
import { isAuthenticatedUser } from "../../model/User.ts";

export function UserBadge() {
  const { user } = useStore();

  return (
    <div className="absolute top-2 right-4 text-sm text-gray-600">
      {isAuthenticatedUser(user) ? (
        <>
          Logged in as <strong>{user.name}</strong>
        </>
      ) : (
        <>Not logged in</>
      )}
    </div>
  );
}
