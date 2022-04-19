import { mock, MockProxy } from 'jest-mock-extended';
import { makeAppointment, throwError } from '@/tests/mocks';

import { IAppointmentRepository } from '@/modules/appointments/repositories';
import { ok, noContent, serverError } from '@/shared/helpers';

import { ListAppointmentsController } from '@/modules/appointments/controllers';

describe('ListAppointmentsController', () => {
  const appointments = [makeAppointment()];
  let appointmentRepositoryMock: MockProxy<IAppointmentRepository>;

  let sut: ListAppointmentsController;

  const makeAppointmentRepositoryMock = () => {
    appointmentRepositoryMock = mock<IAppointmentRepository>();
    appointmentRepositoryMock.list.mockReturnValue(
      Promise.resolve(appointments),
    );
    return appointmentRepositoryMock;
  };

  beforeEach(() => {
    sut = new ListAppointmentsController(makeAppointmentRepositoryMock());
  });

  it('should call IAppointmentRepository.list with correct value', async () => {
    await sut.handle();

    expect(appointmentRepositoryMock.list).toHaveBeenCalledTimes(1);
  });

  it('should return 500 if IAppointmentRepository.list throws', async () => {
    appointmentRepositoryMock.list.mockImplementationOnce(throwError);

    const httpResponse = await sut.handle();

    expect(httpResponse).toEqual(serverError({ errorMsg: 'Erro no servidor' }));
  });

  it('should return 204 if IAppointmentRepository.list return empty', async () => {
    appointmentRepositoryMock.list.mockReturnValueOnce(Promise.resolve([]));

    const httpResponse = await sut.handle();

    expect(httpResponse).toEqual(noContent());
  });

  it('should return 200 on success', async () => {
    const httpResponse = await sut.handle();

    expect(httpResponse).toEqual(ok(appointments));
  });
});
