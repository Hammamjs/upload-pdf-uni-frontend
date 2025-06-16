import { z } from 'zod';

export const SignupSchema = z
  .object({
    studentname: z.string().nonempty('Student name is required'),
    email: z.string().nonempty('Email is required').email(),
    password: z
      .string()
      .nonempty('Password is required')
      .min(8, 'Password must be at least 8 charcters'),
    confirmPassword: z.string(),
    index: z
      .string()
      .nonempty('Student index is required')
      .min(10, 'Student index Too short than expected')
      .max(11, 'Student index not valid')
      .regex(/^\d{2}-\d{8}$/, 'Invalid index pattern'),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'Password must match',
    path: ['confirmPassword'],
  });

export type SignIpSchemaType = z.infer<typeof SignupSchema>;
