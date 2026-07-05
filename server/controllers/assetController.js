const Asset = require("../models/Asset");

// GET /api/assets?search=&category=&status=
const getAssets = async (req, res) => {
  try {
    const { search, category, status } = req.query;
    const filter = {};

    if (search) {
      filter.$or = [
        { assetName: { $regex: search, $options: "i" } },
        { assetId: { $regex: search, $options: "i" } },
        { owner: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }
    if (category) filter.category = category;
    if (status) filter.status = status;

    const assets = await Asset.find(filter).sort({ createdAt: -1 });
    res.json(assets);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch assets", error: error.message });
  }
};

// GET /api/assets/:id
const getAssetById = async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);
    if (!asset) return res.status(404).json({ message: "Asset not found" });
    res.json(asset);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch asset", error: error.message });
  }
};

// POST /api/assets
const createAsset = async (req, res) => {
  try {
    const { assetId, assetName, category, owner, classification, status } = req.body;

    if (!assetId || !assetName || !category || !owner) {
      return res.status(400).json({ message: "assetId, assetName, category and owner are required" });
    }

    const existing = await Asset.findOne({ assetId });
    if (existing) {
      return res.status(400).json({ message: `Asset ID "${assetId}" is already in use` });
    }

    const asset = await Asset.create({ assetId, assetName, category, owner, classification, status });
    res.status(201).json(asset);
  } catch (error) {
    res.status(500).json({ message: "Failed to create asset", error: error.message });
  }
};

// PUT /api/assets/:id
const updateAsset = async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);
    if (!asset) return res.status(404).json({ message: "Asset not found" });

    Object.assign(asset, req.body);
    await asset.save();
    res.json(asset);
  } catch (error) {
    res.status(500).json({ message: "Failed to update asset", error: error.message });
  }
};

// DELETE /api/assets/:id
const deleteAsset = async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);
    if (!asset) return res.status(404).json({ message: "Asset not found" });

    await asset.deleteOne();
    res.json({ message: "Asset deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete asset", error: error.message });
  }
};

// GET /api/assets/stats/summary  -> dashboard counts
const getAssetStats = async (req, res) => {
  try {
    const total = await Asset.countDocuments();
    const assigned = await Asset.countDocuments({ status: "Assigned" });
    const available = await Asset.countDocuments({ status: "Available" });
    const underRepair = await Asset.countDocuments({ status: "Under Repair" });
    const retired = await Asset.countDocuments({ status: "Retired" });
    const recent = await Asset.find().sort({ createdAt: -1 }).limit(5);

    res.json({ total, assigned, available, underRepair, retired, recent });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch stats", error: error.message });
  }
};

module.exports = { getAssets, getAssetById, createAsset, updateAsset, deleteAsset, getAssetStats };
