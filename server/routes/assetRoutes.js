const express = require("express");
const router = express.Router();
const {
  getAssets,
  getAssetById,
  createAsset,
  updateAsset,
  deleteAsset,
  getAssetStats,
} = require("../controllers/assetController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// All asset routes require a logged-in user
router.use(protect);

router.get("/stats/summary", getAssetStats);
router.get("/", getAssets);
router.get("/:id", getAssetById);

// Only admins can add, edit, or delete assets
router.post("/", adminOnly, createAsset);
router.put("/:id", adminOnly, updateAsset);
router.delete("/:id", adminOnly, deleteAsset);

module.exports = router;
