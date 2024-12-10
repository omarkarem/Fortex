import express from 'express';
import { createPaymentIntent } from '../controllers/paymentController.js';

const router = express.Router();

// POST /api/payment-intent - Create a Payment Intent
router.post('/payment-intent', createPaymentIntent);

export default router;
