import { IAddAppointmentDTO } from '@/modules/appointments/dtos';
import { IAppointment } from '@/modules/appointments/models';

export interface IAppointmentRepository {
  list(): Promise<IAppointment[]>;
  create(data: IAddAppointmentDTO): Promise<IAppointment>;
  findByDateInterval(startDate: Date, finalDate: Date): Promise<IAppointment[]>;
}
