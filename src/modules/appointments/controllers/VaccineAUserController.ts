import { IController, IHttpResponse } from '@/shared/protocols';
import { IAppointmentRepository } from '@/modules/appointments/repositories';

import { serverError, ok, notFound } from '@/shared/helpers';

export interface IVaccineAUserControllerRequestRouteParam {
  id: string;
}

export type IVaccineAUserControllerRequest =
  IVaccineAUserControllerRequestRouteParam;

export class VaccineAUserController implements IController {
  constructor(private readonly appointmentRepository: IAppointmentRepository) {}
  async handle(
    request: IVaccineAUserControllerRequest,
  ): Promise<IHttpResponse> {
    try {
      const { id } = request;

      const appointment = await this.appointmentRepository.findById(id);
      if (!appointment) {
        return notFound({ errorMsg: 'Agendamento não encontrado' });
      }

      const updatedAppointment = await this.appointmentRepository.update({
        ...appointment,
        vaccinated: !appointment.vaccinated,
      });

      return ok(updatedAppointment);
    } catch (error) {
      return serverError({ errorMsg: 'Erro no servidor' });
    }
  }
}
