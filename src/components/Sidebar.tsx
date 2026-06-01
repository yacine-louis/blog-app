import { NavLink } from "react-router";

export default function Sidebar() {
  return (
    <aside className="w-56 bg-gray-800 p-4">
      <ul className="space-y-2">
        <li>
          <NavLink to="/" className="text-white block hover:text-blue-500">
            Home
          </NavLink>
        </li>

        <li>
          <NavLink to="/blog" className="text-white block hover:text-blue-500">
            Blog
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin" className="text-white block hover:text-blue-500">
            Admin
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}
