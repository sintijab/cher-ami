import { Prisma } from '@prisma/client';
import { Request, Response, Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import prisma from '../prisma';
import { policyCreationSchema } from '../schemas';
import { validateData } from '../middleware/schemaValidation';

const router = Router();

export async function getPolicies(req: Request, res: Response) {
  const { search } = req.query;

  const or: Prisma.PolicyWhereInput = search
    ? {
      OR: [
        { provider: { contains: search as string, mode: 'insensitive' } },
        {
          customer: {
            firstName: { contains: search as string, mode: 'insensitive' },
          },
        },
        {
          customer: {
            lastName: { contains: search as string, mode: 'insensitive' },
          },
        },
        {
          customer: {
            email: { contains: search as string, mode: 'insensitive' },
          },
        },
      ],
    }
    : {};

  const policies = await prisma.policy.findMany({
    where: {
      ...or,
    },
    select: {
      id: true,
      provider: true,
      insuranceType: true,
      status: true,
      startDate: true,
      price: true,
      endDate: true,
      customer: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          dateOfBirth: true,
        },
      },
    },
  });

  res.json(policies);
}

router.get('/', getPolicies);

router.post('/', validateData(policyCreationSchema), async (req, res) => {
  const { policy, customer } = req.body;

  try {
    let customerRecord;

    if (customer.id) {
      customerRecord = await prisma.customer.upsert({
        where: { id: customer.id },
        update: {
          firstName: customer.firstName,
          lastName: customer.lastName,
          email: customer.email,
          dateOfBirth: new Date(customer.dateOfBirth),
        },
        create: {
          id: customer.id,
          firstName: customer.firstName,
          lastName: customer.lastName,
          email: customer.email,
          dateOfBirth: new Date(customer.dateOfBirth),
        },
      });
    } else {
      customerRecord = await prisma.customer.create({
        data: {
          id: uuidv4(),
          firstName: customer.firstName,
          lastName: customer.lastName,
          email: customer.email,
          dateOfBirth: new Date(customer.dateOfBirth),
        },
      });
    }

    const newPolicy = await prisma.policy.create({
      data: {
        ...policy,
        customerId: customerRecord.id,
      },
    });

    res.json(newPolicy);
  } catch (error) {
    res.status(500).json({ error: `Failed to create policy for customer ${customer.id || 'new'}` });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const updated = await prisma.policy.update({
      where: { id },
      data,
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: `Failed to update policy with id ${id}` });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.policy.delete({ where: { id } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: `Failed to delete policy with id ${id}` });
  }
});

export default router;