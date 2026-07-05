import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const { user: currentUser } = useAuth();

  useEffect(() => {
    api
      .get("/users")
      .then((res) => setUsers(res.data))
      .catch(() => setError("Could not load users."));
  }, []);

  const handleRoleChange = async (id, role) => {
    try {
      const { data } = await api.put(`/users/${id}`, { role });
      setUsers((prev) => prev.map((u) => (u._id === id ? { ...u, role: data.role } : u)));
    } catch {
      setError("Could not update role.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Remove this user?")) return;
    try {
      await api.delete(`/users/${id}`);
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Could not delete user.");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-ink mb-6">Users</h1>
      {error && <p className="text-rose-500 mb-4">{error}</p>}

      <div className="bg-white border border-slate-200 rounded-md divide-y divide-slate-100">
        {users.map((u) => (
          <div key={u._id} className="flex items-center justify-between px-4 py-3">
            <div>
              <p className="text-sm font-medium text-ink">{u.name}</p>
              <p className="text-xs text-slate-500">{u.email}</p>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={u.role}
                onChange={(e) => handleRoleChange(u._id, e.target.value)}
                disabled={u._id === currentUser?._id}
                className="text-sm border border-slate-200 rounded-md px-2 py-1"
              >
                <option value="user">user</option>
                <option value="admin">admin</option>
              </select>
              <button
                onClick={() => handleDelete(u._id)}
                disabled={u._id === currentUser?._id}
                className="text-sm text-rose-500 hover:underline disabled:opacity-40"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
