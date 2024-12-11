import express from "express";
import { getProperties, addProperty,getPropertyCount ,getTotalRevenue ,getPropertyById, getRecommendations, updateProperty, deleteProperty,getUserProperties, searchProperties } from "../controllers/PropertyController.js"
import { authenticateToken } from "../Middleware/authMiddleware.js";

const router = express.Router();

// GET /properties - Fetch all properties
router.get("/all", getProperties);

router.get("/search", searchProperties);
// Fetch recommendations
router.get("/recommendations", getRecommendations);

// Fetch single property by ID
router.get("/:id", getPropertyById);

// GET /properties - Fetch all user properties
router.get("/", authenticateToken, getUserProperties);

// Add a new property (owner-only action)
router.post("/", authenticateToken, addProperty);

// Get property count for the logged-in user
router.get("/property-count", authenticateToken, getPropertyCount);

// Get total revenue from properties
router.get("/total-revenue", authenticateToken, getTotalRevenue);

// Update a property (owner-only action)
router.put("/:id", authenticateToken, updateProperty);

// Delete a property (owner-only action)
router.delete("/:id", authenticateToken, deleteProperty);



export default router;