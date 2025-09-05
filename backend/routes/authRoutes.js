const express = require("express");

const router = express.Router();

// Auth Routes
router.post("/register", registerUser); // Register a new user
router.post("/login", loginUser); // Login a user
router.get("/profile", protect, getUserProfile); // Get user profile
router.put("/profile", protect, updateUserProfile); // Update user profile

module.exports = router;
