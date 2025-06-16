import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().nonempty('Email is required').email('Invalid Email'),
  password: z.string().nonempty('Password is required'),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
