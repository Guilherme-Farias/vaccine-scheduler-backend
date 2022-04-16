/**
 * @jest-environment ./src/infra/prisma/prisma-test-environment
 */

import { makeIncompleteAppointment } from '@/tests/mocks';
import faker from '@faker-js/faker';

import { prisma } from '@/infra/prisma';

import { PrismaAppointmentRepository } from '@/modules/appointments/repositories';

describe('PrismaAppointmentRepository', () => {
  let sut: PrismaAppointmentRepository;

  beforeEach(async () => {
    await prisma.appointment.deleteMany({});
    sut = new PrismaAppointmentRepository();
  });

  describe('create()', () => {
    it('should be able to create a new appointment', async () => {
      const appointment = makeIncompleteAppointment();

      const response = await sut.create(appointment);

      expect(response).toHaveProperty('id');
      expect(response.vaccinated).toEqual(false);
    });
  });

  describe('findByDateInterval()', () => {
    it('should be able to find appointments by date range', async () => {
      const appointment = makeIncompleteAppointment();

      const createdAppointment = await sut.create(appointment);

      const response = await sut.findByDateInterval(
        appointment.appointment_date,
        appointment.appointment_date,
      );

      expect(response.length).toBe(1);
      expect(response[0]).toEqual(createdAppointment);
    });
    it('should be able to return an empty list when not finding appointments by date range', async () => {
      const response = await sut.findByDateInterval(
        faker.date.past(),
        faker.date.future(),
      );

      expect(response.length).toBe(0);
    });
  });
});
