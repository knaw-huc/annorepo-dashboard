import { Link } from "@tanstack/react-router";

export function Menu() {
  return (
    <div>
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
