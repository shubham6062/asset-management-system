import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
      <div className="font-semibold text-ink">AssetLedger</div>
      {user && (
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-600">
            {user.name} <span className="text-xs uppercase text-teal-600 ml-1">{user.role}</span>
          </span>
          <button
            onClick={handleLogout}
            className="text-sm px-3 py-1.5 rounded-md border border-slate-200 hover:bg-slate-50"
          >
            Log out
          </button>
        </div>
      )}
    </header>
  );
}
