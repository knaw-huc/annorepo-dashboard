import { Link } from "@tanstack/react-router";

export function Menu() {
  return (
    <ul>
      <li>
        <Link to="/container">Containers</Link>
      </li>
      <li>
        <Link to="/custom-query">Custom Queries</Link>
      </li>
      <li className="text-slate-500 line-through">Annotations</li>
    </ul>
  );
}
