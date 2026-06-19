import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import stripe from 'stripe';
import { connectDB } from './db/connect';
import userRoutes from './routes/userRoutes';
import { paymentSchema } from './schemas/paymentSchema';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

const secretKey = process.env.STRIPE_SECRET_KEY;
if (!secretKey) {
  throw new Error('STRIPE_SECRET_KEY is not set in environment variables');
}
const stripeInstance = new stripe(secretKey);

app.use(cors());
app.use(express.json());
app.use('/api', userRoutes);

app.post('/create-payment-intent', async (req, res) => {
  const parsed = paymentSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten().fieldErrors });
  }
  try {
    const paymentIntent = await stripeInstance.paymentIntents.create({
      amount: parsed.data.amount,
      currency: 'inr',
      automatic_payment_methods: { enabled: true },
    });
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error: any) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));