import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const statusClass = {
  Available: "status-available",
  Assigned: "status-assigned",
  "Under Repair": "status-repair",
  Retired: "status-retired",
};

export default function AssetCard({ asset, onDelete }) {
  const { isAdmin } = useAuth();

  return (
    <div className="bg-white border border-slate-200 rounded-md p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <span className="asset-tag">{asset.assetId}</span>
        <div>
          <p className="font-medium text-ink">{asset.assetName}</p>
          <p className="text-sm text-slate-500">
            {asset.category} · {asset.owner}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className={`status-badge ${statusClass[asset.status] || "status-available"}`}>
          {asset.status}
        </span>
        {isAdmin && (
          <>
            <Link
              to={`/assets/edit/${asset._id}`}
              className="text-sm text-teal-600 hover:underline"
            >
              Edit
            </Link>
            <button
              onClick={() => onDelete(asset._id)}
              className="text-sm text-rose-500 hover:underline"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}
