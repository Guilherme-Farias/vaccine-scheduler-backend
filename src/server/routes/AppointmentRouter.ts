import { Router } from 'express';
import { adaptExpressRoute } from '@/server/adapters';
import { makeCreateAppointmentController } from '@/server/factories/controllers';

export default (router: Router): void => {
  router.post(
    '/appointments',
    adaptExpressRoute(makeCreateAppointmentController()),
  );
};
