import express from "express";
import { register, login, validateToken } from "../controllers/authController.js";
import { authenticateToken } from "../Middleware/authMiddleware.js";
import { body } from "express-validator";
import validationMiddleware from "../Middleware/validationMiddleware.js";

const router = express.Router();

router.post(
  "/register",
  [
    body("FirstName").notEmpty().withMessage("First name is required"),
    body("LastName").notEmpty().withMessage("Last name is required"),
    body("Email").isEmail().withMessage("Invalid email format"),
    body("Password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase letter")
      .matches(/\d/)
      .withMessage("Password must contain at least one number"),
    body("Type").isIn(["Renter", "Owner"]).withMessage("Invalid user type"),
  ],
  validationMiddleware,
  register
);

router.post(
  "/login",
  [
    body("Email").isEmail().withMessage("Invalid email format"),
    body("Password").notEmpty().withMessage("Password is required"),
  ],
  validationMiddleware,
  login
);

router.post("/validate-token", authenticateToken, validateToken);

export default router;
