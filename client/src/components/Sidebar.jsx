import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const linkClass = ({ isActive }) =>
  `block px-4 py-2.5 rounded-md text-sm transition-colors ${
    isActive ? "bg-teal-500 text-white" : "text-slate-300 hover:bg-white/5 hover:text-white"
  }`;

export default function Sidebar() {
  const { isAdmin } = useAuth();

  return (
    <aside className="w-56 bg-ink text-white min-h-screen flex flex-col py-6 px-3">
      <div className="px-3 mb-8">
        <p className="asset-tag">v1.0</p>
      </div>
      <nav className="flex flex-col gap-1">
        <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
        <NavLink to="/assets" className={linkClass}>Assets</NavLink>
        {isAdmin && <NavLink to="/assets/add" className={linkClass}>Add Asset</NavLink>}
        {isAdmin && <NavLink to="/users" className={linkClass}>Users</NavLink>}
        <NavLink to="/profile" className={linkClass}>Profile</NavLink>
        <NavLink to="/about" className={linkClass}>About</NavLink>
      </nav>
    </aside>
  );
}
