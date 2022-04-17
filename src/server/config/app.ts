import express, { Express } from 'express';

import setupSwagger from './swagger';
import { setupMiddlewares } from './middlewares';
import { setupRoutes } from './routes';

export const setupApp = (): Express => {
  const app = express();
  setupSwagger(app);
  setupMiddlewares(app);
  setupRoutes(app);
  return app;
};
