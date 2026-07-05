import { useEffect, useState } from "react";
import api from "../services/api";

const statCards = [
  { key: "total", label: "Total Assets", color: "text-ink" },
  { key: "assigned", label: "Assigned", color: "text-blue-600" },
  { key: "available", label: "Available", color: "text-teal-600" },
  { key: "underRepair", label: "Under Repair", color: "text-amber-500" },
];

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/assets/stats/summary")
      .then((res) => setStats(res.data))
      .catch(() => setError("Could not load dashboard stats."));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-ink mb-6">Dashboard</h1>

      {error && <p className="text-rose-500 mb-4">{error}</p>}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {statCards.map((card) => (
          <div key={card.key} className="bg-white border border-slate-200 rounded-md p-5">
            <p className="text-sm text-slate-500 mb-1">{card.label}</p>
            <p className={`text-3xl font-semibold ${card.color}`}>
              {stats ? stats[card.key] : "—"}
            </p>
          </div>
        ))}
      </div>

      <h2 className="text-lg font-semibold text-ink mb-3">Recently added</h2>
      <div className="bg-white border border-slate-200 rounded-md divide-y divide-slate-100">
        {stats?.recent?.length ? (
          stats.recent.map((asset) => (
            <div key={asset._id} className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="asset-tag">{asset.assetId}</span>
                <span className="text-sm text-ink">{asset.assetName}</span>
              </div>
              <span className="text-sm text-slate-500">{asset.category}</span>
            </div>
          ))
        ) : (
          <p className="px-4 py-6 text-sm text-slate-400">No assets added yet.</p>
        )}
      </div>
    </div>
  );
}
