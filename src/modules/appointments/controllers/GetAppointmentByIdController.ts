import { IController, IHttpResponse } from '@/shared/protocols';
import { IAppointmentRepository } from '@/modules/appointments/repositories';

import { serverError, ok, notFound } from '@/shared/helpers';

export interface IGetAppointmentByIdControllerRequestRouteParam {
  id: string;
}

export type IGetAppointmentByIdControllerRequest =
  IGetAppointmentByIdControllerRequestRouteParam;

export class GetAppointmentByIdController implements IController {
  constructor(private readonly appointmentRepository: IAppointmentRepository) {}
  async handle(
    request: IGetAppointmentByIdControllerRequest,
  ): Promise<IHttpResponse> {
    try {
      const { id } = request;

      const appointment = await this.appointmentRepository.findById(id);
      if (!appointment) {
        return notFound({ errorMsg: 'Agendamento não encontrado' });
      }

      return ok(appointment);
    } catch (error) {
      return serverError({ errorMsg: 'Erro no servidor' });
    }
  }
}
