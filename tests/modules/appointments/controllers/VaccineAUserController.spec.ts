import { mock, MockProxy } from 'jest-mock-extended';
import { throwError, makeAppointment } from '@/tests/mocks';

import { VaccineAUserController } from '@/modules/appointments/controllers';
import { IAppointmentRepository } from '@/modules/appointments/repositories';

import { notFound, ok, serverError } from '@/shared/helpers';

describe('VaccineAUserController', () => {
  const appointment = makeAppointment();
  const httpRequest = { id: appointment.id };
  let appointmentRepositoryMock: MockProxy<IAppointmentRepository>;

  let sut: VaccineAUserController;

  const makeAppointmentRepositoryMock = () => {
    appointmentRepositoryMock = mock<IAppointmentRepository>();
    appointmentRepositoryMock.findById.mockReturnValue(
      Promise.resolve(appointment),
    );
    appointmentRepositoryMock.update.mockReturnValue(
      Promise.resolve({
        ...appointment,
        vaccinated: !appointment.vaccinated,
      }),
    );
    return appointmentRepositoryMock;
  };

  beforeEach(() => {
    sut = new VaccineAUserController(makeAppointmentRepositoryMock());
  });

  it('should call IAppointmentRepository.findById with correct value', async () => {
    await sut.handle(httpRequest);

    expect(appointmentRepositoryMock.findById).toHaveBeenCalledWith(
      httpRequest.id,
    );
  });

  it('should return 404 if not find appointment', async () => {
    appointmentRepositoryMock.findById.mockReturnValueOnce(
      Promise.resolve(null),
    );

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(
      notFound({ errorMsg: 'Agendamento não encontrado' }),
    );
  });

  it('should return 500 if IAppointmentRepository.findById throws', async () => {
    appointmentRepositoryMock.findById.mockImplementationOnce(throwError);

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(serverError({ errorMsg: 'Erro no servidor' }));
  });

  it('should call IAppointmentRepository.update with correct value', async () => {
    await sut.handle(httpRequest);

    expect(appointmentRepositoryMock.update).toHaveBeenCalledWith({
      ...appointment,
      vaccinated: !appointment.vaccinated,
    });
  });

  it('should return 500 if IAppointmentRepository.update throws', async () => {
    appointmentRepositoryMock.update.mockImplementationOnce(throwError);

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(serverError({ errorMsg: 'Erro no servidor' }));
  });

  it('should return 200 and the updated Appointment if valid data is provided', async () => {
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(
      ok({
        ...appointment,
        vaccinated: !appointment.vaccinated,
      }),
    );
  });
});
