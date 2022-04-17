import { CreateAppointmentController } from '@/modules/appointments/controllers';
import { JoiCreateAppointmentValidator } from '@/modules/appointments/validations';
import { PrismaAppointmentRepository } from '@/modules/appointments/repositories';
import { DateFnsProvider } from '@/shared/providers/DateProvider';

export const makeCreateAppointmentController = () => {
  const createAppointmentValidator = new JoiCreateAppointmentValidator();
  const dateProvider = new DateFnsProvider();
  const appointmentRepository = new PrismaAppointmentRepository();
  const controller = new CreateAppointmentController(
    createAppointmentValidator,
    dateProvider,
    appointmentRepository,
  );
  return controller;
};
