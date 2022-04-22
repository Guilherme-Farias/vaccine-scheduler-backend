import { GetAppointmentByIdController } from '@/modules/appointments/controllers';
import { PrismaAppointmentRepository } from '@/modules/appointments/repositories';

export const makeGetAppointmentByIdController = () => {
  const appointmentRepository = new PrismaAppointmentRepository();
  const controller = new GetAppointmentByIdController(appointmentRepository);
  return controller;
};
