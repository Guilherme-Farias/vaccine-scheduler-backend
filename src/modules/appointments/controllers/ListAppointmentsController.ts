import { IController, IHttpResponse } from '@/shared/protocols';
import { IAppointmentRepository } from '@/modules/appointments/repositories';

import { ok, noContent, serverError } from '@/shared/helpers';

export class ListAppointmentsController implements IController {
  constructor(private readonly appointmentRepository: IAppointmentRepository) {}
  async handle(): Promise<IHttpResponse> {
    try {
      const appointments = await this.appointmentRepository.list();

      return appointments.length ? ok(appointments) : noContent();
    } catch (error) {
      return serverError({ errorMsg: 'Erro no servidor' });
    }
  }
}
