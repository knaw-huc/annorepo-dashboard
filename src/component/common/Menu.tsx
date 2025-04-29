import { Link } from "@tanstack/react-router";

export function Menu() {
  return <ul>
    <li><Link to="/container">Containers</Link></li>
    <li className="text-slate-500 line-through">Users</li>
    <li className="text-slate-500 line-through">Annotations</li>
    <li className="text-slate-500 line-through">Queries</li>
  </ul>;
}
