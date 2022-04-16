import { faker } from '@faker-js/faker';
import { ICreateAppointmentControllerRequest } from '@/modules/appointments/controllers';
import { IAddAppointmentDTO } from '@/modules/appointments/dtos';

export const makeCreateAppointmentControllerRequest = (
  overrides?: Partial<ICreateAppointmentControllerRequest>,
): ICreateAppointmentControllerRequest => ({
  name: faker.name.findName(),
  birth_date: faker.date.past(10).toISOString(),
  appointment_date: faker.date.future().toISOString(),
  ...overrides,
});

export const makeIncompleteAppointment = (
  overrides?: Partial<IAddAppointmentDTO>,
): IAddAppointmentDTO => ({
  name: faker.name.findName(),
  birth_date: faker.date.past(10),
  appointment_date: faker.date.future(),
  ...overrides,
});
