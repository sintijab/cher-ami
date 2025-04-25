import request from 'supertest';
import express from 'express';
import customerRouter from './routes/customers';
import prisma from './prisma';

jest.mock('./prisma', () => ({
  customer: {
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

const app = express();
app.use(express.json());
app.use('/customers', customerRouter);

describe('Customer Routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /customers', () => {
    it('returns all customers without filters', async () => {
      (prisma.customer.findMany as jest.Mock).mockResolvedValue([
        {
          id: '123',
          firstName: 'Alice',
          lastName: 'Smith',
          dateOfBirth: '1990-01-01',
          policies: [],
        },
      ]);

      const res = await request(app).get('/customers');
      expect(res.statusCode).toBe(200);
      expect(prisma.customer.findMany).toHaveBeenCalledWith({
        where: {},
        include: { policies: true },
      });
    });

    it('filters customers by full name', async () => {
      await request(app).get('/customers').query({ name: 'Alice Smith' });

      expect(prisma.customer.findMany).toHaveBeenCalledWith({
        where: {
          AND: [
            { firstName: { contains: 'Alice', mode: 'insensitive' } },
            { lastName: { contains: 'Smith', mode: 'insensitive' } },
          ],
        },
        include: { policies: true },
      });
    });

    it('filters customers by single name', async () => {
      await request(app).get('/customers').query({ name: 'Alice' });

      expect(prisma.customer.findMany).toHaveBeenCalledWith({
        where: {
          OR: [
            { firstName: { contains: 'Alice', mode: 'insensitive' } },
            { lastName: { contains: 'Alice', mode: 'insensitive' } },
          ],
        },
        include: { policies: true },
      });
    });

    it('filters customers by policy ID', async () => {
      await request(app).get('/customers').query({ policyId: 'policy123' });

      expect(prisma.customer.findMany).toHaveBeenCalledWith({
        where: {
          policies: {
            some: {
              id: 'policy123',
            },
          },
        },
        include: { policies: true },
      });
    });
  });

  describe('POST /customers', () => {
    it('creates a customer', async () => {
      const customerData = {
        firstName: 'Jane',
        lastName: 'Doe',
        dateOfBirth: '1985-12-12',
      };

      (prisma.customer.create as jest.Mock).mockResolvedValue({ id: '456', ...customerData });

      const res = await request(app).post('/customers').send(customerData);
      expect(res.statusCode).toBe(200);
      expect(res.body.firstName).toBe('Jane');
      expect(prisma.customer.create).toHaveBeenCalledWith({ data: customerData });
    });
  });

  describe('PUT /customers/:id', () => {
    it('updates a customer', async () => {
      const update = { lastName: 'Updated' };

      (prisma.customer.update as jest.Mock).mockResolvedValue({ id: '123', ...update });

      const res = await request(app).put('/customers/123').send(update);
      expect(res.statusCode).toBe(200);
      expect(res.body.lastName).toBe('Updated');
    });
  });

  describe('DELETE /customers/:id', () => {
    it('deletes a customer', async () => {
      (prisma.customer.delete as jest.Mock).mockResolvedValue({});

      const res = await request(app).delete('/customers/123');
      expect(res.statusCode).toBe(204);
      expect(prisma.customer.delete).toHaveBeenCalledWith({ where: { id: '123' } });
    });
  });
});
