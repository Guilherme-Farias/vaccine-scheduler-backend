import { VaccineAUserController } from '@/modules/appointments/controllers';
import { PrismaAppointmentRepository } from '@/modules/appointments/repositories';

export const makeVaccineAUserController = () => {
  const appointmentRepository = new PrismaAppointmentRepository();
  const controller = new VaccineAUserController(appointmentRepository);
  return controller;
};
