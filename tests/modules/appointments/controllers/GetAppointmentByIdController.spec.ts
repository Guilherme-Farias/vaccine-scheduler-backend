import { mock, MockProxy } from 'jest-mock-extended';
import { makeAppointment, throwError } from '@/tests/mocks';

import { GetAppointmentByIdController } from '@/modules/appointments/controllers';
import { IAppointmentRepository } from '@/modules/appointments/repositories';

import { notFound, ok, serverError } from '@/shared/helpers';

describe('GetAppointmentByIdController', () => {
  const appointment = makeAppointment();
  const httpRequest = { id: appointment.id };
  let appointmentRepositoryMock: MockProxy<IAppointmentRepository>;
  const parsed_birth_date = 'parsed_birth_date' as unknown as Date;
  const parsed_appointment_date = 'parsed_appointment_date' as unknown as Date;

  let sut: GetAppointmentByIdController;

  const makeAppointmentRepositoryMock = () => {
    appointmentRepositoryMock = mock<IAppointmentRepository>();
    appointmentRepositoryMock.findById.mockReturnValue(
      Promise.resolve({
        id: appointment.id,
        name: appointment.name,
        birth_date: parsed_birth_date,
        appointment_date: parsed_appointment_date,
        vaccinated: false,
      }),
    );
    return appointmentRepositoryMock;
  };

  beforeEach(() => {
    sut = new GetAppointmentByIdController(makeAppointmentRepositoryMock());
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

  it('should return 200 and the appointment found if valid data is provided', async () => {
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(
      ok({
        id: appointment.id,
        name: appointment.name,
        birth_date: parsed_birth_date,
        appointment_date: parsed_appointment_date,
        vaccinated: appointment.vaccinated,
      }),
    );
  });
});
