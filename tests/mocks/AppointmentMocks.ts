import { faker } from '@faker-js/faker';
import { ICreateAppointmentControllerRequest } from '@/modules/appointments/controllers';

export const makeCreateAppointmentControllerRequest = (
  overrides?: Partial<ICreateAppointmentControllerRequest>,
): ICreateAppointmentControllerRequest => ({
  name: faker.name.findName(),
  birth_date: faker.date.past(10),
  appointment_date: faker.date.future(),
  ...overrides,
});
