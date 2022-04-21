import { Router } from 'express';
import { adaptExpressRoute } from '@/server/adapters';
import {
  makeListAppointmentsController,
  makeCreateAppointmentController,
  makeUpdateAppointmentController,
  makeVaccineAUserController,
} from '@/server/factories/controllers';

export default (router: Router): void => {
  router.get(
    '/appointments',
    adaptExpressRoute(makeListAppointmentsController()),
  );
  router.post(
    '/appointments',
    adaptExpressRoute(makeCreateAppointmentController()),
  );
  router.put(
    '/appointments/:id',
    adaptExpressRoute(makeUpdateAppointmentController()),
  );
  router.patch(
    '/appointments/:id/vaccine',
    adaptExpressRoute(makeVaccineAUserController()),
  );
};
