import { prisma } from '@/infra/prisma';

import { IAppointment } from '../models';
import { IAddAppointmentDTO } from '../dtos';
import { IAppointmentRepository } from './IAppointmentRepository';

export class PrismaAppointmentRepository implements IAppointmentRepository {
  async create(data: IAddAppointmentDTO): Promise<IAppointment> {
    const appointment = await prisma.appointment.create({ data });

    return appointment;
  }

  async findByDateInterval(
    startDate: Date,
    finalDate: Date,
  ): Promise<IAppointment[]> {
    const appointmentsInInterval = await prisma.appointment.findMany({
      where: {
        appointment_date: {
          gte: startDate,
          lte: finalDate,
        },
      },
    });
    return appointmentsInInterval;
  }
}
