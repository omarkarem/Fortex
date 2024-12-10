import express from "express";
import { createPaymentIntent, handlePaymentSuccess } from "../controllers/paymentController.js";

const router = express.Router();

// Route to create a payment intent
router.post("/create-payment-intent", createPaymentIntent);

// Route to handle payment success (optional)
router.post("/payment-success", handlePaymentSuccess);

export default router;
