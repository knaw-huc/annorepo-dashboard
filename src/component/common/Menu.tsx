import { Link } from "@tanstack/react-router";
import { isAuthenticated } from "../../model/user/User";
import { Tooltip } from "./Tooltip.tsx";
import { Lock } from "./icon/Lock.tsx";
import { useStore } from "../../store/useStore.ts";

export function Menu() {
  const { user } = useStore();

  return (
    <nav>
      <ul className="flex flex-row xl:flex-col gap-4">
        <li>
          <Link to="/container" className="text-anrep-green-800 no-underline">
            Containers
          </Link>
        </li>
        <li>
          <Link
            className={`no-underline ${!isAuthenticated(user) ? "text-gray-400" : "text-anrep-green-800"}`}
            disabled={!isAuthenticated(user)}
            to="/custom-query"
          >
            Custom Queries{" "}
            {!isAuthenticated(user) && (
              <Tooltip text="Please login">
                <Lock />
              </Tooltip>
            )}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
