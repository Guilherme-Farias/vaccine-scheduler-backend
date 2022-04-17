import { ListAppointmentsController } from '@/modules/appointments/controllers';
import { PrismaAppointmentRepository } from '@/modules/appointments/repositories';

export const makeListAppointmentsController = () => {
  const appointmentRepository = new PrismaAppointmentRepository();
  const controller = new ListAppointmentsController(appointmentRepository);
  return controller;
};
