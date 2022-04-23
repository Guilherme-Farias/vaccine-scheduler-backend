import { faker } from '@faker-js/faker';
import { makeUpdateAppointmentControllerRequest } from '@/tests/mocks';
import { ICreateAppointmentControllerRequest } from '@/modules/appointments/controllers/';

import { JoiUpdateAppointmentValidator } from '@/modules/appointments/validations';

describe('JoiUpdateAppointmentValidator()', () => {
  let sut: JoiUpdateAppointmentValidator;

  beforeEach(() => {
    sut = new JoiUpdateAppointmentValidator();
  });

  it('should validate when no fields is provided', () => {
    const values = makeUpdateAppointmentControllerRequest({
      name: undefined,
      birth_date: undefined,
      appointment_date: undefined,
      vaccinated: undefined,
    });

    const errors = sut.validate({ ...values });

    expect(errors).toMatchObject({
      name: '`name` deve ser enviado',
      birth_date: '`birth_date` deve ser enviado',
      appointment_date: '`appointment_date` deve ser enviado',
      vaccinated: '`vaccinated` deve ser enviado',
    });
  });

  it('should validate empty fields', () => {
    const values = makeUpdateAppointmentControllerRequest({
      name: '',
      birth_date: '',
      appointment_date: '',
      vaccinated: '',
    } as unknown as ICreateAppointmentControllerRequest);

    const errors = sut.validate({ ...values });

    expect(errors).toMatchObject({
      name: 'O nome não pode ser vazio',
      birth_date: 'A data deve seguir padrão ISO',
      appointment_date: 'A data deve seguir padrão ISO',
      vaccinated: '`vaccinated` deve ser do tipo `boolean`',
    });
  });

  it('should validate birth_date when a future date is provided', () => {
    const values = makeUpdateAppointmentControllerRequest({
      birth_date: faker.date.future(10).toISOString(),
    });

    const errors = sut.validate({ ...values });

    expect(errors).toMatchObject({
      birth_date:
        'A data de nascimento deve ser menor do que o dia atual e horário atual',
    });
  });

  it('should validate appointment_date when an earlier date is provided', () => {
    const values = makeUpdateAppointmentControllerRequest({
      appointment_date: faker.date.past().toISOString(),
    });

    const errors = sut.validate({ ...values });

    expect(errors).toMatchObject({
      appointment_date:
        'A data do agendamento deve maior do que o dia atual e horário atual',
    });
  });

  it('should not return errors when fields are passed correctly', () => {
    const values = makeUpdateAppointmentControllerRequest();

    const errors = sut.validate({ ...values });

    expect(errors).toMatchObject({});
  });
});
