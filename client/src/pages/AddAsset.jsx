import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const initialForm = {
  assetId: "",
  assetName: "",
  category: "",
  owner: "",
  classification: "Internal",
  status: "Available",
};

export default function AddAsset() {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      await api.post("/assets", form);
      navigate("/assets");
    } catch (err) {
      setError(err.response?.data?.message || "Could not add asset.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-ink mb-6">Add Asset</h1>

      <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-md p-6 max-w-lg">
        {error && (
          <p className="text-sm text-rose-500 bg-rose-50 border border-rose-100 rounded-md px-3 py-2 mb-4">
            {error}
          </p>
        )}

        <label className="block text-sm font-medium text-slate-700 mb-1">Asset ID</label>
        <input
          name="assetId"
          required
          value={form.assetId}
          onChange={handleChange}
          placeholder="LAP-001"
          className="w-full border border-slate-200 rounded-md px-3 py-2 mb-4 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-teal-500"
        />

        <label className="block text-sm font-medium text-slate-700 mb-1">Asset Name</label>
        <input
          name="assetName"
          required
          value={form.assetName}
          onChange={handleChange}
          placeholder="Dell Latitude"
          className="w-full border border-slate-200 rounded-md px-3 py-2 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        />

        <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
        <input
          name="category"
          required
          value={form.category}
          onChange={handleChange}
          placeholder="Laptop"
          className="w-full border border-slate-200 rounded-md px-3 py-2 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        />

        <label className="block text-sm font-medium text-slate-700 mb-1">Owner</label>
        <input
          name="owner"
          required
          value={form.owner}
          onChange={handleChange}
          placeholder="IT Department"
          className="w-full border border-slate-200 rounded-md px-3 py-2 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        />

        <label className="block text-sm font-medium text-slate-700 mb-1">Classification</label>
        <select
          name="classification"
          value={form.classification}
          onChange={handleChange}
          className="w-full border border-slate-200 rounded-md px-3 py-2 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <option>Public</option>
          <option>Internal</option>
          <option>Confidential</option>
          <option>Restricted</option>
        </select>

        <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border border-slate-200 rounded-md px-3 py-2 mb-6 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <option>Available</option>
          <option>Assigned</option>
          <option>Under Repair</option>
          <option>Retired</option>
        </select>

        <button
          type="submit"
          disabled={saving}
          className="bg-teal-500 hover:bg-teal-600 disabled:opacity-60 text-white rounded-md px-5 py-2.5 font-medium"
        >
          {saving ? "Saving..." : "Save Asset"}
        </button>
      </form>
    </div>
  );
}
