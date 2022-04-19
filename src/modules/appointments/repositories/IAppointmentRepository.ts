import {
  IAddAppointmentDTO,
  IUpdateAppointmentDTO,
} from '@/modules/appointments/dtos';
import { IAppointment } from '@/modules/appointments/models';

export interface IAppointmentRepository {
  findById(id: string): Promise<IAppointment | null>;
  list(): Promise<IAppointment[]>;
  create(data: IAddAppointmentDTO): Promise<IAppointment>;
  update(data: IUpdateAppointmentDTO): Promise<IAppointment>;
  findByDateInterval(startDate: Date, finalDate: Date): Promise<IAppointment[]>;
}
