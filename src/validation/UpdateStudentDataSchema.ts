import { z } from 'zod';

export const updateStudentSchema = z.object({
  studentname: z.string().nonempty('Student name is required'),
  email: z.string().nonempty('Email is required').email(),
  studentIdx: z
    .string()
    .nonempty('Student index is required')
    .min(10, 'Student index Too short than expected')
    .max(11, 'Student index not valid')
    .regex(/^\d{2}-\d{8}$/, 'Invalid index pattern'),
});

export type updateStudentValidation = z.infer<typeof updateStudentSchema>;
