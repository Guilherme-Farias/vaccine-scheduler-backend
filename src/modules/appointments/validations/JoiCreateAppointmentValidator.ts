import Joi from 'joi';
import { getFieldErrors } from '@/shared/helpers';

import { IParamErrors, IValidation } from '@/shared/protocols';
import { ICreateAppointmentControllerRequest } from '@/modules/appointments/controllers';

export class JoiCreateAppointmentValidator implements IValidation {
  validate(params: ICreateAppointmentControllerRequest): IParamErrors {
    const schema = Joi.object({
      name: Joi.string().required().messages({
        'string.base': '`name` deve ser do tipo `string`',
        'string.empty': 'O nome não pode ser vazio',
        'any.required': '`name` deve ser enviado',
      }),
      birth_date: Joi.date().iso().less('now').required().messages({
        'date.base': '`birth_date` deve ser do tipo `date`',
        'date.format': 'A data deve seguir padrão ISO',
        'date.less': 'A data de nascimento deve ser menor do que o dia atual',
        'any.required': '`birth_date` deve ser enviado',
      }),
      appointment_date: Joi.date().iso().min('now').required().messages({
        'date.base': '`birth_date` deve ser do tipo `date`',
        'date.format': 'A data deve seguir padrão ISO',
        'date.min': 'A data do agendamento deve maior do que o dia atual',
        'any.required': '`appointment_date` deve ser enviado',
      }),
    });

    return getFieldErrors(schema.validate(params, { abortEarly: false }));
  }
}
