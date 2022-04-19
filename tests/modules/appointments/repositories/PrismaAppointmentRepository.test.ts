/**
 * @jest-environment ./src/infra/prisma/prisma-test-environment
 */

import { makeAppointment, makeIncompleteAppointment } from '@/tests/mocks';
import faker from '@faker-js/faker';

import { prisma } from '@/infra/prisma';

import { PrismaAppointmentRepository } from '@/modules/appointments/repositories';

describe('PrismaAppointmentRepository', () => {
  let sut: PrismaAppointmentRepository;

  beforeEach(async () => {
    await prisma.appointment.deleteMany({});
    sut = new PrismaAppointmentRepository();
  });

  describe('findById()', () => {
    it('should be able to return an appointment by id', async () => {
      const appointment = makeIncompleteAppointment();
      const createdAppointment = await sut.create(appointment);

      const response = await sut.findById(createdAppointment.id);

      expect(response).toEqual(createdAppointment);
    });

    it('should be able to return null when not find appointment', async () => {
      const response = await sut.findById('any_id');

      expect(response).toBe(null);
    });
  });

  describe('list()', () => {
    it('should be able to list appointments', async () => {
      const appointment = makeIncompleteAppointment();
      const createdAppointment = await sut.create(appointment);

      const response = await sut.list();

      expect(response.length).toBe(1);
      expect(response[0]).toEqual(createdAppointment);
    });
    it('should be able to return an empty appointment list', async () => {
      const response = await sut.list();

      expect(response.length).toBe(0);
    });
  });

  describe('create()', () => {
    it('should be able to create a new appointment', async () => {
      const appointment = makeIncompleteAppointment();

      const response = await sut.create(appointment);

      expect(response).toHaveProperty('id');
      expect(response.vaccinated).toEqual(false);
    });
  });

  describe('update()', () => {
    it('should be able to update an appointment by id', async () => {
      const appointment = makeIncompleteAppointment();
      const createdAppointment = await sut.create(appointment);

      const response = await sut.update({
        ...createdAppointment,
        vaccinated: true,
      });

      expect(response).toEqual({ ...createdAppointment, vaccinated: true });
    });

    it('should be able to throw error when appointment not found', async () => {
      const appointment = makeAppointment();
      const response = sut.update({ ...appointment, id: 'invalid_id' });

      expect(response).rejects.toThrow();
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
