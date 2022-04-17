import { IAddAppointmentDTO } from '@/modules/appointments/dtos';
import { IAppointment } from '@/modules/appointments/models';

export interface IAppointmentRepository {
  create(data: IAddAppointmentDTO): Promise<IAppointment>;
  findByDateInterval(startDate: Date, finalDate: Date): Promise<IAppointment[]>;
}
