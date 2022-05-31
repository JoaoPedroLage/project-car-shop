import { z } from 'zod';

export const VehicleZodSchema = z.object({
  model: z.string({
    required_error: 'Model is required',
    invalid_type_error: 'Model must be a string',
  })
    .min(3, { message: 'Model must be 3 or more characters long' }),
  year: z.number({
    required_error: 'Year is required',
    invalid_type_error: 'Year must be a number',
  })
    .min(1900, { message: 'Year must be 1900 or more' })
    .max(2022, { message: 'Year must be 2022 or less' }),
  color: z.string({
    required_error: 'Color is required',
    invalid_type_error: 'Color must be a string',
  })
    .min(3, { message: 'Color must be 3 or more characters long' }),
  status: z.boolean({
    required_error: 'status is required',
    invalid_type_error: 'status must be a boolean',
  })
    .optional(),
  buyValue: z.number({
    required_error: 'Model is required',
    invalid_type_error: 'Model must be a string',
  })
    .int({ message: 'buyValue must be a integer' }),
});

export type Vehicle = z.infer<typeof VehicleZodSchema>;