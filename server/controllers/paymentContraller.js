import Stripe from "stripe";
import User from "../models/User.js"; // Assuming you have a user model
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async (req, res) => {
  const { amount, userId } = req.body; // Amount is in cents
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Amount in cents
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ message: "Failed to create payment intent", error });
  }
};

export const handlePaymentSuccess = async (req, res) => {
  const { userId, propertyId, amount } = req.body;

  try {
    // Update user data with payment information
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.bookings = user.bookings || []; // Initialize bookings array if not exists
    user.bookings.push({ propertyId, amount, date: new Date() });
    await user.save();

    res.status(200).json({ message: "Payment recorded successfully" });
  } catch (error) {
    console.error("Error recording payment:", error);
    res.status(500).json({ message: "Failed to record payment", error });
  }
};
