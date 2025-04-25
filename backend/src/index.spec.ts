import request from 'supertest';
import { createExpressApp } from './server';
import e from 'express';

describe('Server', () => {
  let app: e.Express;

  beforeAll(async () => {
    app = await createExpressApp();
  });

  it('should start server', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('Server is up and running');
  });

  it('should return response to GET /policies', async () => {
    const response = await request(app).get('/policies');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});