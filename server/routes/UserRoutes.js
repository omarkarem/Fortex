import express from "express";
import { getUserProfile, updateEmail, deleteUser, updateUserProfile , updateUserBookings} from "../controllers/UserController.js";
import { authenticateToken } from "../Middleware/authMiddleware.js";
import { body } from "express-validator";
import validationMiddleware from "../Middleware/validationMiddleware.js";

const router = express.Router();

// Get User Profile
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

// Update User Profile
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

export default router;
