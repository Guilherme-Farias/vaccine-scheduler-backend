import { prisma } from '@/infra/prisma';

import { IAppointment } from '../models';
import { IAddAppointmentDTO, IUpdateAppointmentDTO } from '../dtos';
import { IAppointmentRepository } from './IAppointmentRepository';

export class PrismaAppointmentRepository implements IAppointmentRepository {
  async findById(id: string): Promise<IAppointment | null> {
    const appointment = await prisma.appointment.findUnique({
      where: { id },
    });

    return appointment;
  }

  async list(): Promise<IAppointment[]> {
    const appointments = await prisma.appointment.findMany({});

    return appointments;
  }

  async create(data: IAddAppointmentDTO): Promise<IAppointment> {
    const appointment = await prisma.appointment.create({ data });

    return appointment;
  }

  async update(data: IUpdateAppointmentDTO): Promise<IAppointment> {
    const { id, ...rest } = data;
    const updatedAppointment = await prisma.appointment.update({
      where: { id },
      data: { ...rest },
    });

    return updatedAppointment;
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
