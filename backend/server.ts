import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import stripe from 'stripe';
import { connectDB } from './db/connect';
import userRoutes from './routes/userRoutes';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// 🔑 Your Stripe Secret Key (get from https://dashboard.stripe.com/test/apikeys)
const secretKey = process.env.STRIPE_SECRET_KEY;
if (!secretKey) {
  throw new Error('STRIPE_SECRET_KEY is not set in environment variables');
}
const stripeInstance = new stripe(secretKey);

app.use(cors());
app.use(express.json());
app.use('/api', userRoutes);

// 📌 STRIPE PAYMENT ENDPOINT
app.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency } = req.body;

    if (typeof amount !== 'number' || amount <= 0 || !Number.isInteger(amount)) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    const paymentIntent = await stripeInstance.paymentIntents.create({
      amount,
      currency: currency || 'usd',
      automatic_payment_methods: { enabled: true },
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error: any) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));