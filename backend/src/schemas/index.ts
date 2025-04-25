import { customerSchema } from "./customer";
import { policySchema } from "./policy";
import { z } from 'zod';

export const policyCreationSchema = z.object({
  policy: policySchema,
  customer: customerSchema,
});
