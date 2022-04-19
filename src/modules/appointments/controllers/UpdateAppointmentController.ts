import { IController, IHttpResponse, IValidation } from '@/shared/protocols';
import { IAppointmentRepository } from '@/modules/appointments/repositories';

import { badRequest, serverError, ok, notFound } from '@/shared/helpers';
import { IDateProvider } from '@/shared/providers/DateProvider';

export interface IUpdateAppointmentControllerRequestRouteParam {
  id: string;
}

export interface IUpdateAppointmentControllerRequestBody {
  name: string;
  birth_date: string;
  appointment_date: string;
  vaccinated: boolean;
}

export type IUpdateAppointmentControllerRequest =
  IUpdateAppointmentControllerRequestRouteParam &
    IUpdateAppointmentControllerRequestBody;

export class UpdateAppointmentController implements IController {
  constructor(
    private readonly updateAppointmentValidator: IValidation<IUpdateAppointmentControllerRequestBody>,
    private readonly dateProvider: IDateProvider,
    private readonly appointmentRepository: IAppointmentRepository,
  ) {}
  async handle(
    request: IUpdateAppointmentControllerRequest,
  ): Promise<IHttpResponse> {
    try {
      const { id, name, birth_date, appointment_date, vaccinated } = request;

      const appointment = await this.appointmentRepository.findById(id);
      if (!appointment) {
        return notFound({ errorMsg: 'Agendamento não encontrado' });
      }

      const errors = this.updateAppointmentValidator.validate({
        name,
        birth_date,
        appointment_date,
        vaccinated,
      });
      if (Object.keys(errors).length) {
        return badRequest({ errorMsg: 'Campos inválidos', params: errors });
      }

      const birth_date_parsed = this.dateProvider.parseISO(birth_date);
      const appointment_date_parsed =
        this.dateProvider.parseISO(appointment_date);

      const updatedAppointment = await this.appointmentRepository.update({
        id,
        name,
        birth_date: birth_date_parsed,
        appointment_date: appointment_date_parsed,
        vaccinated,
      });

      return ok(updatedAppointment);
    } catch (error) {
      return serverError({ errorMsg: 'Erro no servidor' });
    }
  }
}
