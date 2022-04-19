import { mock, MockProxy } from 'jest-mock-extended';
import {
  makeUpdateAppointmentControllerRequest,
  throwError,
} from '@/tests/mocks';

import {
  UpdateAppointmentController,
  IUpdateAppointmentControllerRequest,
} from '@/modules/appointments/controllers';
import { IValidation } from '@/shared/protocols';
import { IDateProvider } from '@/shared/providers/DateProvider';
import { IAppointmentRepository } from '@/modules/appointments/repositories';

import { badRequest, notFound, ok, serverError } from '@/shared/helpers';

describe('UpdateAppointmentController', () => {
  const httpRequest = makeUpdateAppointmentControllerRequest();
  let updateAppointmentValidatorMock: MockProxy<IValidation>;
  let dateProviderMock: MockProxy<IDateProvider>;
  let appointmentRepositoryMock: MockProxy<IAppointmentRepository>;
  const parsed_birth_date = 'parsed_birth_date' as unknown as Date;
  const parsed_appointment_date = 'parsed_appointment_date' as unknown as Date;

  let sut: UpdateAppointmentController;

  const makeUpdateAppointmentValidatorMock = () => {
    updateAppointmentValidatorMock = mock<IValidation>();
    updateAppointmentValidatorMock.validate.mockReturnValue({});
    return updateAppointmentValidatorMock;
  };

  const makeDateProviderMock = () => {
    dateProviderMock = mock<IDateProvider>();
    dateProviderMock.parseISO
      .mockReturnValueOnce(parsed_birth_date)
      .mockReturnValueOnce(parsed_appointment_date);
    return dateProviderMock;
  };

  const makeAppointmentRepositoryMock = () => {
    appointmentRepositoryMock = mock<IAppointmentRepository>();
    appointmentRepositoryMock.findById.mockReturnValue(
      Promise.resolve({
        id: httpRequest.id,
        name: httpRequest.name,
        birth_date: parsed_birth_date,
        appointment_date: parsed_appointment_date,
        vaccinated: false,
      }),
    );
    appointmentRepositoryMock.update.mockReturnValue(
      Promise.resolve({
        id: httpRequest.id,
        name: httpRequest.name,
        birth_date: parsed_birth_date,
        appointment_date: parsed_appointment_date,
        vaccinated: true,
      }),
    );
    return appointmentRepositoryMock;
  };

  beforeEach(() => {
    sut = new UpdateAppointmentController(
      makeUpdateAppointmentValidatorMock(),
      makeDateProviderMock(),
      makeAppointmentRepositoryMock(),
    );
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

  it('should call IValidation with correct values', async () => {
    await sut.handle(httpRequest);

    expect(updateAppointmentValidatorMock.validate).toHaveBeenCalledWith({
      name: httpRequest.name,
      birth_date: httpRequest.birth_date,
      appointment_date: httpRequest.appointment_date,
      vaccinated: httpRequest.vaccinated,
    });

    expect(updateAppointmentValidatorMock.validate).toReturnWith({});
  });

  it('should return 400 if an invalid data is provided', async () => {
    const errors = {
      id: 'invalid_id',
      name: 'invalid_param',
      birth_date: 'invalid_param',
      appointment_date: 'invalid_param',
      vaccinated: 'invalid_vaccinated',
    };
    updateAppointmentValidatorMock.validate.mockReturnValueOnce(errors);

    const httpResponse = await sut.handle({
      id: 'invalid_id',
      name: 'invalid_name',
      birth_date: 'invalid_date',
      appointment_date: 'invalid_date',
      vaccinated: 'invalid_vaccinated',
    } as unknown as IUpdateAppointmentControllerRequest);

    expect(httpResponse).toEqual(
      badRequest({ errorMsg: 'Campos inválidos', params: errors }),
    );
  });

  it('should return 500 if IValidation throws', async () => {
    updateAppointmentValidatorMock.validate.mockImplementationOnce(throwError);

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(serverError({ errorMsg: 'Erro no servidor' }));
  });

  it('should call IDateProvider.parseISO with correct value', async () => {
    await sut.handle(httpRequest);

    expect(dateProviderMock.parseISO).nthCalledWith(1, httpRequest.birth_date);
    expect(dateProviderMock.parseISO).nthReturnedWith(1, parsed_birth_date);

    expect(dateProviderMock.parseISO).nthCalledWith(
      2,
      httpRequest.appointment_date,
    );
    expect(dateProviderMock.parseISO).nthReturnedWith(
      2,
      parsed_appointment_date,
    );
  });

  it('should return 500 if IDateProvider.parseISO throws', async () => {
    dateProviderMock.parseISO.mockImplementationOnce(throwError);

    await sut.handle(httpRequest);

    expect(dateProviderMock.parseISO).toThrow();
  });

  it('should call IAppointmentRepository.update with correct value', async () => {
    await sut.handle(httpRequest);

    expect(appointmentRepositoryMock.update).toHaveBeenCalledWith({
      id: httpRequest.id,
      name: httpRequest.name,
      birth_date: parsed_birth_date,
      appointment_date: parsed_appointment_date,
      vaccinated: httpRequest.vaccinated,
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
        id: httpRequest.id,
        name: httpRequest.name,
        birth_date: parsed_birth_date,
        appointment_date: parsed_appointment_date,
        vaccinated: true,
      }),
    );
  });
});
