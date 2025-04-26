import { z } from 'zod';
import { InsuranceType, PolicyStatus } from '../types';
import { isDateTime } from './utils';

export const policySchema = z.object({
  provider: z.string().min(1),
  insuranceType: z.enum([InsuranceType.HEALTH, InsuranceType.LIABILITY, InsuranceType.HOUSEHOLD]),
  status: z.enum([PolicyStatus.ACTIVE, PolicyStatus.PENDING, PolicyStatus.CANCELLED, PolicyStatus.DROPPED_OUT]),
  startDate: z.string().refine(isDateTime, {
    message: "Invalid start date. Must be a valid date-time string (e.g., '2023-04-01T00:00:00Z')",
  }),
  endDate: z.string().refine(isDateTime, {
    message: "Invalid end date. Must be a valid date-time string (e.g., '2023-04-01T00:00:00Z')",
  }).optional(),
  price: z.string().min(1),
});