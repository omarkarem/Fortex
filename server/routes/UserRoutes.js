import express from "express";
import { getUserProfile, updateEmail, deleteUser, updateUserProfile , updateUserBookings, getAuthenticatedUser } from "../controllers/UserController.js";
import { authenticateToken } from "../Middleware/authMiddleware.js";
import { body } from "express-validator";
import validationMiddleware from "../Middleware/validationMiddleware.js";

const router = express.Router();

router.get("/profile", authenticateToken, getUserProfile);

// Update Email
router.put(
  "/update-email",
  [
    body("Email").isEmail().withMessage("Invalid email format"),
  ],
  validationMiddleware,
  authenticateToken,
  updateEmail
);

router.put(
  "/update",
  [
    body("Email").optional().isEmail().withMessage("Invalid email format"),
    body("PhoneNumber")
      .optional()
      .isMobilePhone()
      .withMessage("Invalid phone number format"),
  ],
  validationMiddleware,
  authenticateToken,
  updateUserProfile
);

// Delete User
router.delete("/delete", authenticateToken, deleteUser);


router.post('/update-bookings', authenticateToken, updateUserBookings);


// Protected route to get authenticated user info
router.get("/me", authenticateToken, getAuthenticatedUser);

export default router;
