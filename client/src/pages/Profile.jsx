import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-ink mb-6">Profile</h1>
      <div className="bg-white border border-slate-200 rounded-md p-6 max-w-md">
        <p className="text-sm text-slate-500 mb-1">Name</p>
        <p className="text-ink font-medium mb-4">{user?.name}</p>

        <p className="text-sm text-slate-500 mb-1">Email</p>
        <p className="text-ink font-medium mb-4">{user?.email}</p>

        <p className="text-sm text-slate-500 mb-1">Role</p>
        <span className="asset-tag">{user?.role}</span>
      </div>
    </div>
  );
}
