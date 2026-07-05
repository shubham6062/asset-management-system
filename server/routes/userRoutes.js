const express = require("express");
const router = express.Router();
const { getUsers, updateUser, deleteUser } = require("../controllers/userController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// All user-management routes require a logged-in admin
router.use(protect, adminOnly);

router.get("/", getUsers);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
