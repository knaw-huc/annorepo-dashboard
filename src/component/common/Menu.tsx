import { Link } from "@tanstack/react-router";
import { isAuthenticated } from "../../model/user/User";
import { useStore } from "../../store/useStore.ts";
import { Tooltip } from "./Tooltip.tsx";
import { Lock } from "./icon/Lock.tsx";

export function Menu() {
  const { user } = useStore();

  return (
    <div>
      <ul>
        <li>
          <Link to="/container">Containers</Link>
        </li>
        <li>
          <Link
            className={!isAuthenticated(user) ? "text-gray-400" : ""}
            disabled={!isAuthenticated(user)}
            to="/custom-query"
          >
            Custom Queries{" "}
            <Tooltip text="Please login">
              <Lock />
            </Tooltip>
          </Link>
        </li>
      </ul>
    </div>
  );
}
