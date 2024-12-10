import express from "express";
import { register, login, validateToken } from "../controllers/authController.js";
import { authenticateToken } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/validate-token", authenticateToken, validateToken);

export default router;