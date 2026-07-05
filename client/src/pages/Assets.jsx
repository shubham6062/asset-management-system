import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import AssetCard from "../components/AssetCard";
import { useAuth } from "../context/AuthContext";

export default function Assets() {
  const [assets, setAssets] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { isAdmin } = useAuth();

  const fetchAssets = async (query = "") => {
    setLoading(true);
    try {
      const { data } = await api.get("/assets", { params: query ? { search: query } : {} });
      setAssets(data);
      setError("");
    } catch (err) {
      setError("Could not load assets.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchAssets(search);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this asset? This cannot be undone.")) return;
    try {
      await api.delete(`/assets/${id}`);
      setAssets((prev) => prev.filter((a) => a._id !== id));
    } catch {
      setError("Could not delete asset.");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-ink">Assets</h1>
        {isAdmin && (
          <Link
            to="/assets/add"
            className="bg-teal-500 hover:bg-teal-600 text-white text-sm px-4 py-2 rounded-md font-medium"
          >
            + Add Asset
          </Link>
        )}
      </div>

      <form onSubmit={handleSearch} className="mb-6 flex gap-2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, ID, owner, or category..."
          className="flex-1 border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <button
          type="submit"
          className="bg-ink text-white text-sm px-4 py-2 rounded-md font-medium"
        >
          Search
        </button>
      </form>

      {error && <p className="text-rose-500 mb-4">{error}</p>}
      {loading && <p className="text-slate-400">Loading assets...</p>}

      <div className="flex flex-col gap-3">
        {!loading && assets.length === 0 && (
          <p className="text-slate-400">No assets match your search.</p>
        )}
        {assets.map((asset) => (
          <AssetCard key={asset._id} asset={asset} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}
