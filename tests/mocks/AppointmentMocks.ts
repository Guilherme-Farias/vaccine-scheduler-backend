import { faker } from '@faker-js/faker';
import { setHours } from 'date-fns';

import { ICreateAppointmentControllerRequest } from '@/modules/appointments/controllers';
import { IAddAppointmentDTO } from '@/modules/appointments/dtos';
import { IAppointment } from '@/modules/appointments/models';

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

export const makeAppointment = (
  overrides?: Partial<IAppointment>,
): IAppointment => ({
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  birth_date: faker.date.past(10),
  appointment_date: faker.date.future(),
  vaccinated: false,
  ...overrides,
});

type MakeDayWithoutAppointmentAvailabilityRequestsProps = {
  quantity?: number;
  overrides?: Partial<ICreateAppointmentControllerRequest>;
};

// TODO Refacto this method
export const makeCreateAppointmentControllerRequestList = ({
  quantity = 20,
  overrides,
}: MakeDayWithoutAppointmentAvailabilityRequestsProps = {}) => {
  const futureDate = faker.date.future();

  const httpRequest = makeCreateAppointmentControllerRequest({
    appointment_date: futureDate.toISOString(),
    ...overrides,
  });

  const httpRequests: ICreateAppointmentControllerRequest[] = [];
  for (let i = 0; i < quantity; i += 1) {
    httpRequests.push({
      ...httpRequest,
      appointment_date: setHours(futureDate, i).toISOString(),
    });
  }

  return { httpRequest, httpRequests };
};
