import request from 'supertest';
import express from 'express';
import policyRouter from './routes/policies';
import prisma from './prisma';

jest.mock('./prisma', () => ({
  policy: {
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  customer: {
    upsert: jest.fn(),
    create: jest.fn(),
  },
}));

const app = express();
app.use(express.json());
app.use('/policies', policyRouter);

describe('Policy Routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /policies', () => {
    it('returns list of policies', async () => {
      (prisma.policy.findMany as jest.Mock).mockResolvedValue([
        {
          id: '1',
          provider: 'BARMER',
          insuranceType: 'HEALTH',
          status: 'ACTIVE',
          startDate: new Date(),
          endDate: null,
          customer: {
            id: '123',
            firstName: 'Alice',
            lastName: 'Smith',
            dateOfBirth: new Date('1990-01-01'),
          },
        },
      ]);

      const res = await request(app).get('/policies');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(prisma.policy.findMany).toHaveBeenCalled();
    });
  });

  describe('POST /policies', () => {
    it('creates a new policy and customer', async () => {
      const customerData = {
        id: undefined,
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: '1990-01-01',
      };

      const policyData = {
        provider: 'BARMER',
        insuranceType: 'LIABILITY',
        status: 'PENDING',
        startDate: 'Thu Apr 24 2025 20:56:52 GMT+0200 (Central European Summer Time)',
      };

      (prisma.customer.create as jest.Mock).mockResolvedValue({
        ...customerData,
        id: '456',
      });

      (prisma.policy.create as jest.Mock).mockResolvedValue({
        id: '123',
        ...policyData,
        customerId: '456',
      });

      const res = await request(app).post('/policies').send({ policy: policyData, customer: customerData });
      expect(res.statusCode).toBe(200);
      expect(prisma.customer.create).toHaveBeenCalled();
      expect(prisma.policy.create).toHaveBeenCalled();
    });
  });

  describe('PUT /policies/:id', () => {
    it('updates a policy', async () => {
      const updateData = { status: 'CANCELLED' };
      (prisma.policy.update as jest.Mock).mockResolvedValue({
        id: '123',
        ...updateData,
      });

      const res = await request(app).put('/policies/policy-id').send(updateData);
      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('CANCELLED');
    });
  });

  describe('DELETE /policies/:id', () => {
    it('deletes a policy', async () => {
      (prisma.policy.delete as jest.Mock).mockResolvedValue({});

      const res = await request(app).delete('/policies/policy-id');
      expect(res.statusCode).toBe(204);
      expect(prisma.policy.delete).toHaveBeenCalledWith({ where: { id: 'policy-id' } });
    });
  });
});
