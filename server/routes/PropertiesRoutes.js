import express from "express";
import { getProperties, addProperty,getPropertyCount ,getTotalRevenue ,getPropertyById, getRecommendations, updateProperty, deleteProperty,getUserProperties, searchProperties,getOwnerPropertiesWithTenants } from "../controllers/PropertyController.js"
import { authenticateToken } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.get("/owner-with-tenants", authenticateToken, getOwnerPropertiesWithTenants);
router.get("/all", getProperties);
router.get("/search", searchProperties);
router.get("/recommendations", getRecommendations);

// Protected routes
router.get("/property-count", authenticateToken, getPropertyCount);
router.get("/total-revenue", authenticateToken, getTotalRevenue);

// Fetch user properties must be after the above routes
router.get("/", authenticateToken, getUserProperties);

router.get("/:id", getPropertyById);

// Add, update, delete property
router.post("/", authenticateToken, addProperty);
router.put("/:id", authenticateToken, updateProperty);
router.delete("/:id", authenticateToken, deleteProperty);


export default router;