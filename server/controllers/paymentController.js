import Stripe from 'stripe';
import User from '../models/User.js';
import Property from '../models/Property.js';
import mongoose from "mongoose";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
  const { amount, userId, propertyId } = req.body; // Include userId and propertyId

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Property Rent',
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'https://fortex-llc.vercel.app/renter/dashboard', // Redirect to profile
      cancel_url: 'https://fortex-llc.vercel.app/cancel', // Cancel page
      metadata: {
        userId,    // Pass user ID
        propertyId // Pass property ID
      },
    });

    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
};

export const stripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    const userId = session.metadata.userId;
    const propertyId = session.metadata.propertyId;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      console.error('Invalid userId format');
      return res.status(400).json({ error: 'Invalid userId format' });
    }
    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      console.error('Invalid propertyId format');
      return res.status(400).json({ error: 'Invalid propertyId format' });
    }

    try {
      // Update user's bookings
      await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            bookings: {
              propertyId,
              amount: session.amount_total / 100, 
              date: new Date(),
            },
          },
        },
        { new: true }
      );

      await Property.findByIdAndUpdate(
        propertyId,
        { tenantId: userId }, // Link property to tenant
        { new: true }
      );

      return res.status(200).json({ received: true });
    } catch (error) {
      console.error('Error updating database:', error.message);
      return res.status(500).json({ error: 'Failed to process booking' });
    }
  } else {
    return res.status(400).json({ error: 'Unhandled event type' });
  }
};
