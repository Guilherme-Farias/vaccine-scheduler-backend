import { Express } from 'express';
import { serve, setup } from 'swagger-ui-express';
import { noCache } from '@/server/middlewares';
import swaggerConfig from '@/server/docs';

export default (app: Express): void => {
  app.use('/api-docs', noCache, serve, setup(swaggerConfig));
};
