import { Link } from "@tanstack/react-router";

export function Menu() {
  return <ul>
    <li><Link to="/container">Containers</Link></li>
    <li>Users</li>
    <li>Annotations</li>
    <li>Custom queries</li>
  </ul>;
}
