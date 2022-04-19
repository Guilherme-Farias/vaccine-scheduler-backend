import { UpdateAppointmentController } from '@/modules/appointments/controllers';
import { JoiUpdateAppointmentValidator } from '@/modules/appointments/validations';
import { DateFnsProvider } from '@/shared/providers/DateProvider';
import { PrismaAppointmentRepository } from '@/modules/appointments/repositories';

export const makeUpdateAppointmentController = () => {
  const updateAppointmentValidator = new JoiUpdateAppointmentValidator();
  const dateProvider = new DateFnsProvider();

  const appointmentRepository = new PrismaAppointmentRepository();

  const controller = new UpdateAppointmentController(
    updateAppointmentValidator,
    dateProvider,
    appointmentRepository,
  );
  return controller;
};
