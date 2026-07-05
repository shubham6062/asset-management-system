const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema(
  {
    assetId: { type: String, required: true, unique: true, trim: true }, // e.g. LAP-001
    assetName: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true }, // Laptop, Desktop, Router, Printer...
    owner: { type: String, required: true, trim: true }, // person or department
    classification: {
      type: String,
      enum: ["Public", "Internal", "Confidential", "Restricted"],
      default: "Internal",
    },
    status: {
      type: String,
      enum: ["Available", "Assigned", "Under Repair", "Retired"],
      default: "Available",
    },
  },
  { timestamps: true }
);

// Allow text search across the fields users will actually search by
assetSchema.index({ assetName: "text", assetId: "text", category: "text", owner: "text" });

module.exports = mongoose.model("Asset", assetSchema);
