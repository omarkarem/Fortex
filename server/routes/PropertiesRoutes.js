import express from "express";
import { body, param, query } from "express-validator";
import {
  getProperties,
  addProperty,
  getPropertyCount,
  getTotalRevenue,
  getPropertyById,
  getRecommendations,
  updateProperty,
  deleteProperty,
  getUserProperties,
} from "../controllers/PropertyController.js";
import { authenticateToken } from "../Middleware/authMiddleware.js";
import validationMiddleware from "../Middleware/validationMiddleware.js";

const router = express.Router();

// Fetch all properties
router.get("/all", getProperties);

// Fetch single property by ID
router.get(
  "/:id",
  [
    param("id").isMongoId().withMessage("Invalid property ID"),
  ],
  validationMiddleware,
  getPropertyById
);

// Update a property
router.put(
  "/:id",
  authenticateToken,
  [
    param("id").isMongoId().withMessage("Invalid property ID"),
    body("location").optional().notEmpty().withMessage("Location is required"),
    body("bedrooms").optional().isInt({ min: 0 }).withMessage("Bedrooms must be a positive integer"),
    body("bathrooms").optional().isInt({ min: 0 }).withMessage("Bathrooms must be a positive integer"),
    body("price").optional().isFloat({ min: 0 }).withMessage("Price must be a positive number"),
    body("type").optional().isIn(["Apartment", "Villa", "Studio"]).withMessage("Invalid property type"),
    body("size").optional().isFloat({ min: 0 }).withMessage("Size must be a positive number"),
  ],
  validationMiddleware,
  updateProperty
);

// Delete a property
router.delete(
  "/:id",
  authenticateToken,
  [
    param("id").isMongoId().withMessage("Invalid property ID"),
  ],
  validationMiddleware,
  deleteProperty
);

export default router;
