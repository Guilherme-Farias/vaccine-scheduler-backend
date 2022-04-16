import { faker } from '@faker-js/faker';
import { makeCreateAppointmentControllerRequest } from '@/tests/mocks';
import { ICreateAppointmentControllerRequest } from '@/modules/appointments/controllers/';

import { JoiCreateAppointmentValidator } from '@/modules/appointments/validations';

describe('JoiCreateAppointmentValidator()', () => {
  let sut: JoiCreateAppointmentValidator;

  beforeEach(() => {
    sut = new JoiCreateAppointmentValidator();
  });

  it('should validate when no fields is provided', () => {
    const values = makeCreateAppointmentControllerRequest({
      name: undefined,
      birth_date: undefined,
      appointment_date: undefined,
    });

    const errors = sut.validate({ ...values });

    expect(errors).toMatchObject({
      name: '`name` deve ser enviado',
      birth_date: '`birth_date` deve ser enviado',
      appointment_date: '`appointment_date` deve ser enviado',
    });
  });

  it('should validate empty fields', () => {
    const values = makeCreateAppointmentControllerRequest({
      name: '',
      birth_date: '',
      appointment_date: '',
    } as unknown as ICreateAppointmentControllerRequest);

    const errors = sut.validate({ ...values });

    expect(errors).toMatchObject({
      name: 'O nome não pode ser vazio',
      birth_date: 'A data deve seguir padrão ISO',
      appointment_date: 'A data deve seguir padrão ISO',
    });
  });

  it('should validate birth_date when future date is provided', () => {
    const values = makeCreateAppointmentControllerRequest({
      birth_date: faker.date.future(),
    });

    const errors = sut.validate({ ...values });

    expect(errors).toMatchObject({
      birth_date: 'A data de nascimento deve ser menor do que o dia atual',
    });
  });
  it('should validate appointment_date when past date is provided', () => {
    const values = makeCreateAppointmentControllerRequest({
      appointment_date: faker.date.past(),
    });

    const errors = sut.validate({ ...values });

    expect(errors).toMatchObject({
      appointment_date: 'A data do agendamento deve maior do que o dia atual',
    });
  });

  it('should not return errors when fields are passed correctly', () => {
    const values = makeCreateAppointmentControllerRequest();

    const errors = sut.validate({ ...values });

    expect(errors).toMatchObject({});
  });
});
