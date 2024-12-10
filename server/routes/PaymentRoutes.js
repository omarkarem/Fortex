import express from "express";
import Stripe from "stripe";

const stripe = new Stripe("sk_test_51QUYDoIi56ujtN3Bj53eao4zvEschp1hMmetQ0miEpKB87QQRbxbkterhmKnLpOI4CMfrdPPcRLAj1fwT41rY0Ed00pJRCVHDQ");
const router = express.Router();

// Route to handle "Rent Now" payments
router.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount } = req.body; // Amount in smallest currency unit (e.g., cents for USD)

    if (!amount) {
      return res.status(400).json({ error: "Amount is required" });
    }

    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount, 
      currency: "usd", // Change as needed
      payment_method_types: ["card"],
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ error: "Failed to create payment intent" });
  }
});

export default router;
