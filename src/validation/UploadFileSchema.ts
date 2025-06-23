import { FILE_BELONG_TO, SEMESTER } from '@/data/departmentArray';
import z from 'zod';

export const UploadFileSchema = z.object({
  file: z
    .instanceof(FileList)
    .refine((file) => ['application/pdf'].includes(file[0].type), {
      message: 'Only pdf Files allowed',
    }),
  year: z.enum(FILE_BELONG_TO, {
    required_error: 'Year is required',
    invalid_type_error: 'Please enter your current year to processed',
  }),
  semester: z.enum(SEMESTER, {
    required_error: 'Semester is required',
    invalid_type_error: 'Please enter your current semester to processed',
  }),
  subject: z.string().min(2, 'Subject cannot contain one word'),
  title: z.string().min(2, 'Title cannot contain one word'),
});

export type UploadFileType = z.infer<typeof UploadFileSchema>;
