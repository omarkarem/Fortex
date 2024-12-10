import express from "express";
import { getUserProfile, updateEmail, deleteUser, updateUserProfile  } from "../controllers/UserController.js";
import { authenticateToken } from "../Middleware/authMiddleware.js";

const router = express.Router();

// Get User Profile
router.get("/profile", authenticateToken, getUserProfile);

// Update Email
router.put("/update-email", authenticateToken, updateEmail);

// Delete Account
router.delete("/delete", authenticateToken, deleteUser);

// PUT /user/profile - Update user profile
router.put("/update", authenticateToken, updateUserProfile);


export default router;