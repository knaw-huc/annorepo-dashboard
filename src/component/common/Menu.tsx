import { Link } from "@tanstack/react-router";

export function Menu() {
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
            to="/custom-query"
            className="text-anrep-green-800 no-underline"
          >
            Custom Queries
          </Link>
        </li>
      </ul>
    </nav>
  );
}
