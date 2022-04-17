import { IController, IHttpResponse, IValidation } from '@/shared/protocols';
import { IDateProvider } from '@/shared/providers/DateProvider';
import { IAppointmentRepository } from '@/modules/appointments/repositories';

import { badRequest, created, forbidden, serverError } from '@/shared/helpers';

export interface ICreateAppointmentControllerRequest {
  name: string;
  birth_date: string;
  appointment_date: string;
}

export class CreateAppointmentController implements IController {
  constructor(
    private readonly createAppointmentValidator: IValidation<ICreateAppointmentControllerRequest>,
    private readonly dateProvider: IDateProvider,
    private readonly appointmentRepository: IAppointmentRepository,
  ) {}
  async handle(
    request: ICreateAppointmentControllerRequest,
  ): Promise<IHttpResponse> {
    try {
      const { name, birth_date, appointment_date } = request;

      const errors = this.createAppointmentValidator.validate({
        name,
        birth_date,
        appointment_date,
      });
      if (Object.keys(errors).length) {
        return badRequest({ errorMsg: 'Campos inválidos', params: errors });
      }

      const birth_date_parsed = this.dateProvider.parseISO(birth_date);
      const appointment_date_parsed =
        this.dateProvider.parseISO(appointment_date);

      const startDay = this.dateProvider.startOfDay(appointment_date_parsed);
      const endDay = this.dateProvider.endOfDay(appointment_date_parsed);

      const appointmentsInDay =
        await this.appointmentRepository.findByDateInterval(startDay, endDay);

      if (appointmentsInDay.length >= 20) {
        return forbidden({ errorMsg: 'O dia está cheio' });
      }

      const appointmentStartHour = this.dateProvider.startOfHour(
        appointment_date_parsed,
      );
      const appointmentEndHour = this.dateProvider.endOfHour(
        appointment_date_parsed,
      );

      const appointmentsInSameHour = appointmentsInDay.filter(
        appointmentInDay =>
          this.dateProvider.isWithinInterval(
            appointmentInDay.appointment_date,
            { start: appointmentStartHour, end: appointmentEndHour },
          ),
      );

      if (appointmentsInSameHour.length >= 2) {
        return forbidden({ errorMsg: 'Horário já está cheio' });
      }

      const appointment = await this.appointmentRepository.create({
        name,
        birth_date: birth_date_parsed,
        appointment_date: appointment_date_parsed,
      });

      return created(appointment);
    } catch (error) {
      return serverError({ errorMsg: 'Erro no servidor' });
    }
  }
}
