const express = require("express");
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const { exportTaskReport, exportUserReport } = require("../controllers/reportController");
const router = express.Router();

router.get("/export/tasks", protect, adminOnly, exportTaskReport); // Export tasks report (Admin only)
router.get("/export/users", protect, adminOnly, exportUserReport); // Export users report (Admin only)

module.exports = router;
