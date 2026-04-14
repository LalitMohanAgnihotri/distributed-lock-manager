import { NavLink } from "react-router-dom";

const links = [
  ["/", "Dashboard"],
  ["/locks", "Locks"],
  ["/deadlocks", "Deadlocks"],
  ["/metrics", "Metrics"],
  ["/policies", "Policies"]
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">LockOps</div>

      <nav className="nav-links">
        {links.map(([to, label]) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}