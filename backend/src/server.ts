import cors from 'cors';
import express, { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import policyRoutes from './routes/policies';
import customersRoutes from './routes/customers';
import YAML from 'yamljs';

export async function createExpressApp(): Promise<Express> {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use('/policies', policyRoutes);
  app.use('/customers', customersRoutes);

  const swaggerDocument = YAML.load('./src/swagger/openapi.yaml');
  app.use('/api-docs', swaggerUi.serve as unknown as express.RequestHandler);  
  app.get('/api-docs', swaggerUi.setup(swaggerDocument, { explorer: true }) as unknown as express.RequestHandler);

  app.get('/', (req, res) => {
    res.send('Server is up and running 🚀');
  });

  return app;
}
