/* eslint-disable no-promise-executor-return */
import { mock, MockProxy } from 'jest-mock-extended';
import {
  makeCreateAppointmentControllerRequest,
  throwError,
} from '@/tests/mocks';

import { CreateAppointmentController } from '@/modules/appointments/controllers';
import { IValidation } from '@/shared/protocols';
import { IDateProvider } from '@/shared/providers/DateProvider';
import { IAppointmentRepository } from '@/modules/appointments/repositories';
import { IAppointment } from '@/modules/appointments/models';

import { badRequest, created, forbidden, serverError } from '@/shared/helpers';

describe('CreateAppointmentController', () => {
  const httpRequest = makeCreateAppointmentControllerRequest();
  let createAppointmentValidatorMock: MockProxy<IValidation>;
  let dateProviderMock: MockProxy<IDateProvider>;
  let appointmentRepositoryMock: MockProxy<IAppointmentRepository>;
  const start_of_day = 'start_of_day' as unknown as Date;
  const end_of_day = 'end_of_day' as unknown as Date;
  const start_of_hour = 'start_of_hour' as unknown as Date;
  const end_of_hour = 'end_of_hour' as unknown as Date;

  let sut: CreateAppointmentController;

  const makeCreateAppointmentValidatorMock = () => {
    createAppointmentValidatorMock = mock<IValidation>();
    createAppointmentValidatorMock.validate.mockReturnValue({});
    return createAppointmentValidatorMock;
  };

  const makeDateProviderMock = () => {
    dateProviderMock = mock<IDateProvider>();
    dateProviderMock.startOfDay.mockReturnValue(start_of_day);
    dateProviderMock.endOfDay.mockReturnValue(end_of_day);
    dateProviderMock.startOfHour.mockReturnValue(start_of_hour);
    dateProviderMock.endOfHour.mockReturnValue(end_of_hour);
    dateProviderMock.isWithinInterval.mockReturnValue(false);
    return dateProviderMock;
  };

  const makeAppointmentRepositoryMock = () => {
    appointmentRepositoryMock = mock<IAppointmentRepository>();
    appointmentRepositoryMock.findByDateInterval.mockReturnValue(
      Promise.resolve([]),
    );
    appointmentRepositoryMock.create.mockReturnValue(
      Promise.resolve({
        id: 'valid_id',
        name: httpRequest.name,
        birth_date: httpRequest.birth_date,
        appointment_date: httpRequest.appointment_date,
        vaccinated: false,
      }),
    );
    return appointmentRepositoryMock;
  };

  beforeEach(() => {
    sut = new CreateAppointmentController(
      makeCreateAppointmentValidatorMock(),
      makeDateProviderMock(),
      makeAppointmentRepositoryMock(),
    );
  });

  it('should call IValidation with correct values', async () => {
    await sut.handle(httpRequest);

    expect(createAppointmentValidatorMock.validate).toHaveBeenCalledWith({
      ...httpRequest,
    });

    expect(createAppointmentValidatorMock.validate).toReturnWith({});
  });

  it('should return 400 if an invalid data is provided', async () => {
    const errors = {
      name: 'invalid_param',
      birth_date: 'invalid_param',
      appointment_date: 'invalid_param',
    };
    createAppointmentValidatorMock.validate.mockReturnValueOnce(errors);

    const httpResponse = await sut.handle({
      name: 'invalid_name',
      birth_date: 'invalid_date' as unknown as Date,
      appointment_date: 'invalid_date' as unknown as Date,
    });

    expect(httpResponse).toEqual(
      badRequest({ errorMsg: 'Campos inválidos', params: errors }),
    );
  });

  it('should return 500 if IValidation throws', async () => {
    createAppointmentValidatorMock.validate.mockImplementationOnce(throwError);

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(serverError({ errorMsg: 'Erro no servidor' }));
  });

  it('should call IDateProvider.startOfDay with correct value', async () => {
    await sut.handle(httpRequest);

    expect(dateProviderMock.startOfDay).toHaveBeenCalledWith(
      httpRequest.appointment_date,
    );

    expect(dateProviderMock.startOfDay).toReturnWith(start_of_day);
  });

  it('should return 500 if IDateProvider.getDateWithoutHours throws', async () => {
    dateProviderMock.startOfDay.mockImplementationOnce(throwError);

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(serverError({ errorMsg: 'Erro no servidor' }));
  });

  it('should call IDateProvider.endOfDay with correct value', async () => {
    await sut.handle(httpRequest);

    expect(dateProviderMock.endOfDay).toHaveBeenCalledWith(
      httpRequest.appointment_date,
    );

    expect(dateProviderMock.endOfDay).toReturnWith(end_of_day);
  });

  it('should return 500 if IDateProvider.endOfDay throws', async () => {
    dateProviderMock.endOfDay.mockImplementationOnce(throwError);

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(serverError({ errorMsg: 'Erro no servidor' }));
  });

  it('should call IAppointmentRepository.findByDateInterval with correct value', async () => {
    await sut.handle(httpRequest);

    expect(appointmentRepositoryMock.findByDateInterval).toHaveBeenCalledWith(
      start_of_day,
      end_of_day,
    );
  });

  it('should return 500 if IAppointmentRepository.findByDateInterval throws', async () => {
    appointmentRepositoryMock.findByDateInterval.mockImplementationOnce(
      throwError,
    );

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(serverError({ errorMsg: 'Erro no servidor' }));
  });

  it('should return 403 if provided date have greater than or equal to 20 appointments', async () => {
    appointmentRepositoryMock.findByDateInterval.mockReturnValueOnce(
      Promise.resolve([...Array(20).keys()] as unknown as IAppointment[]),
    );

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(forbidden({ errorMsg: 'O dia está cheio' }));
  });

  it('should call IDateProvider.startOfHour with correct value', async () => {
    await sut.handle(httpRequest);

    expect(dateProviderMock.startOfHour).toHaveBeenCalledWith(
      httpRequest.appointment_date,
    );

    expect(dateProviderMock.startOfHour).toReturnWith(start_of_hour);
  });

  it('should return 500 if IDateProvider.startOfHour throws', async () => {
    dateProviderMock.startOfHour.mockImplementationOnce(throwError);

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(serverError({ errorMsg: 'Erro no servidor' }));
  });

  it('should call IDateProvider.endOfHour with correct value', async () => {
    await sut.handle(httpRequest);

    expect(dateProviderMock.endOfHour).toHaveBeenCalledWith(
      httpRequest.appointment_date,
    );

    expect(dateProviderMock.endOfHour).toReturnWith(end_of_hour);
  });

  it('should return 500 if IDateProvider.endOfHour throws', async () => {
    dateProviderMock.endOfHour.mockImplementationOnce(throwError);

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(serverError({ errorMsg: 'Erro no servidor' }));
  });

  it('should call IDateProvider.isWithinInterval with correct value', async () => {
    const listOfAppointments = [
      { appointment_date: 'date' },
    ] as unknown as IAppointment[];
    appointmentRepositoryMock.findByDateInterval.mockReturnValueOnce(
      Promise.resolve(listOfAppointments),
    );

    await sut.handle(httpRequest);

    expect(dateProviderMock.isWithinInterval).toHaveBeenCalledWith('date', {
      start: start_of_hour,
      end: end_of_hour,
    });

    expect(dateProviderMock.isWithinInterval).toReturnWith(false);
  });

  it('should return 500 if IDateProvider.isWithinInterval throws', async () => {
    appointmentRepositoryMock.findByDateInterval.mockReturnValueOnce(
      Promise.resolve([...Array(1).keys()] as unknown as IAppointment[]),
    );
    dateProviderMock.isWithinInterval.mockImplementationOnce(throwError);

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(serverError({ errorMsg: 'Erro no servidor' }));
  });

  it('should return 403 if provided date have greater than or equal to 2 appointments in same hour', async () => {
    appointmentRepositoryMock.findByDateInterval.mockReturnValueOnce(
      Promise.resolve([...Array(2).keys()] as unknown as IAppointment[]),
    );
    dateProviderMock.isWithinInterval.mockReturnValue(true);

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(
      forbidden({ errorMsg: 'Horário já está cheio' }),
    );
  });

  it('should call IAppointmentRepository.create with correct value', async () => {
    await sut.handle(httpRequest);

    expect(appointmentRepositoryMock.create).toHaveBeenCalledWith({
      name: httpRequest.name,
      birth_date: httpRequest.birth_date,
      appointment_date: httpRequest.appointment_date,
    });
  });

  it('should return 500 if IAppointmentRepository.create throws', async () => {
    appointmentRepositoryMock.create.mockImplementationOnce(throwError);

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(serverError({ errorMsg: 'Erro no servidor' }));
  });

  it('should return 201 and Appointment if valid data is provided', async () => {
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(
      created({
        id: 'valid_id',
        name: httpRequest.name,
        birth_date: httpRequest.birth_date,
        appointment_date: httpRequest.appointment_date,
        vaccinated: false,
      }),
    );
  });
});
