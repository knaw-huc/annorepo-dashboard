import { Link } from "@tanstack/react-router";
import { HostDropdown } from "./HostDropdown.tsx";

export function Menu() {
  return (
    <div>
      <HostDropdown />

      <ul>
        <li>
          <Link to="/container">Containers</Link>
        </li>
        <li>
          <Link to="/custom-query">Custom Queries</Link>
        </li>
      </ul>
    </div>
  );
}
