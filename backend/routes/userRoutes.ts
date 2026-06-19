import { Router } from 'express';
import { User } from '../models/User';
import { createUserSchema, updateUserSchema } from '../schemas/userSchema';

const router = Router();

router.get('/users', async (req, res) => {
  const page = Number(req.query.page) || 1; //query params
  const limit = Number(req.query.limit) || 20;
  const users = await User.find()
    .skip((page - 1) * limit)//skip(n) and start counting from n+1
    .limit(limit);//how many to return 
  const total = await User.countDocuments();//to show total (150) users
  res.json({
    users,
    total,
    page,
    hasMore: page * limit < total,
  });
});

router.post('/users', async (req, res) => {
  const parsed = createUserSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ errors: parsed.error.flatten().fieldErrors });
  }
  try {
    const user = await User.create(parsed.data);
    res.status(201).json(user);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

router.patch('/users/:id', async (req, res) => {
  const parsed = updateUserSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ errors: parsed.error.flatten().fieldErrors });
  }
  try {
    const user = await User.findByIdAndUpdate(req.params.id, parsed.data, { new: true });
    res.json(user);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/users/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

export default router;


//skip = (1 - 1) * 20 = 0, limit = 20 -> returns documents 1–20
//skip = (2 - 1) * 20 = 20, limit = 20 -> skip first 20 return next 20