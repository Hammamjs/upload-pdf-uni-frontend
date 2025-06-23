import { DEPARTMENTS, FILE_BELONG_TO, SEMESTER } from '@/data/departmentArray';
import { z } from 'zod';

export const updateStudentSchema = z
  .object({
    studentname: z.string().optional(),
    email: z.string().email().optional(),
    newPassword: z
      .string()
      .optional()
      .refine((val) => !val || val.length >= 8, {
        message: 'Password must be at least 8 characters',
      }),
    currentPassword: z.string().optional(),
    confirmPassword: z.string().optional(),
    year: z
      .enum(FILE_BELONG_TO, {
        required_error: 'Year is required',
        invalid_type_error: 'Please enter your current year to processed',
      })
      .optional(),
    semester: z
      .enum(SEMESTER, {
        required_error: 'Semester is required',
        invalid_type_error: 'Please enter your current semester to processed',
      })
      .optional(),
    department: z.enum(DEPARTMENTS, {
      required_error: 'Department is required',
      invalid_type_error: 'Please enter your Department to processed',
    }),
    index: z
      .string()
      .nonempty('Student index is required')
      .min(10, 'Student index Too short than expected')
      .max(11, 'Student index not valid')
      .regex(/^\d{2}-\d{8}$/, 'Invalid index pattern')
      .optional(),
  })
  .refine(
    ({ newPassword, confirmPassword }) => {
      if (!newPassword && !confirmPassword) return true;
      return newPassword === confirmPassword;
    },
    {
      message: 'Password must match',
      path: ['confirmPassword'],
    }
  );

export type updateStudentValidation = z.infer<typeof updateStudentSchema>;
