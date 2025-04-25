import { Router,  Request, Response } from 'express';
import prisma from '../prisma';

const router = Router();

export async function getCustomers(req: Request, res: Response) {
  const { name, policyId } = req.query;
  try {
    let where: any = {};

    if (name) {
      const parts = (name as string).trim().split(/\s+/);

      if (parts.length >= 2) {
        where.AND = [
          { firstName: { contains: parts[0], mode: 'insensitive' } },
          { lastName: { contains: parts[1], mode: 'insensitive' } },
        ];
      } else {
        where.OR = [
          { firstName: { contains: parts[0], mode: 'insensitive' } },
          { lastName: { contains: parts[0], mode: 'insensitive' } },
        ];
      }
    }

    if (policyId) {
      where.policies = {
        some: {
          id: policyId as string,
        },
      };
    }

    const customers = await prisma.customer.findMany({
      where,
      include: { policies: true },
    });

    res.json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch customers' });
  }
}

router.get('/', getCustomers);

router.post('/', async (req, res) => {
  try {
    const newCustomer = await prisma.customer.create({
      data: req.body,
    });
    res.json(newCustomer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create customer' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const updated = await prisma.customer.update({
      where: { id },
      data: req.body,
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: `Failed to update customer with id ${id}` });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.customer.delete({ where: { id } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: `Failed to delete customer with id ${id}` });
  }
});

export default router;