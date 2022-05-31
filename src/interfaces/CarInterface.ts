import { z } from 'zod';
import { VehicleZodSchema } from './VehicleInterface';

export const carZodSchema = VehicleZodSchema.extend({
  doorsQty: z.number({
    required_error: 'buyValue is required',
    invalid_type_error: 'buyValue must be a number',
  })
    .min(2, { message: 'doorsQty must be 2 or more' })
    .max(4, { message: 'doorsQty must be 4 or less' }),
  seatsQty: z.number({
    required_error: 'buyValue is required',
    invalid_type_error: 'buyValue must be a number',
  })
    .min(2, { message: 'seatsQty must be 2 or more' })
    .max(7, { message: 'seatsQty must be 7 or less' }),
}); 

export type Car = z.infer<typeof carZodSchema>;