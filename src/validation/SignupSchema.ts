import { DEPARTMENTS, FILE_BELONG_TO, SEMESTER } from '@/data/departmentArray';
import { z } from 'zod';

export const SignupSchema = z
  .object({
    studentname: z.string().nonempty('Student name is required'),
    email: z.string().nonempty('Email is required').email(),
    newPassword: z
      .string()
      .nonempty('Password is required')
      .min(8, 'Password must be at least 8 charcters'),
    confirmPassword: z.string(),
    year: z.enum(FILE_BELONG_TO, {
      required_error: 'Year is required',
      invalid_type_error: 'Please enter your current year to processed',
    }),
    semester: z.enum(SEMESTER, {
      required_error: 'Semester is required',
      invalid_type_error: 'Please enter your current semester to processed',
    }),
    department: z.enum(DEPARTMENTS, {
      required_error: 'Department is required',
      invalid_type_error: 'Please enter your Department to processed',
    }),
    index: z
      .string()
      .nonempty('Student index is required')
      .min(10, 'Student index Too short than expected')
      .max(11, 'Student index not valid')
      .regex(/^\d{2}-\d{8}$/, 'Invalid index pattern'),
  })
  .refine(
    ({ newPassword, confirmPassword }) => newPassword === confirmPassword,
    {
      message: 'Password must match',
      path: ['confirmPassword'],
    }
  );

export type SignIpSchemaType = z.infer<typeof SignupSchema>;
