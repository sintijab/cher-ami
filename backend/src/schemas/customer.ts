import { z } from 'zod';
import { isValidAge } from './utils';

export const customerSchema = z.object({
  id: z.string().uuid().optional(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email().min(1),
  dateOfBirth: z.string().refine((val) => {
    const age = isValidAge(val);
    return age >= 18 && age < 130;
  }, {
    message: 'Customer must be at least 18 or younger than 130 years.',
  }),
});
