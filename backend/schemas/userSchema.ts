import { z } from 'zod';

const noWhitespaceName = z
  .string()
  .trim()
  .min(1, 'This field is required')
  .regex(/^\S+$/, 'No spaces allowed');

export const createUserSchema = z.object({
  firstname: noWhitespaceName,
  surname: noWhitespaceName,
  email: z.string().trim().toLowerCase().email('Invalid email'),
  password: z
    .string()
    .trim()
    .min(6, 'Password must be at least 6 characters')
    .regex(/^\S+$/, 'No spaces allowed')
    .optional(),
});

export const updateUserSchema = createUserSchema.partial();