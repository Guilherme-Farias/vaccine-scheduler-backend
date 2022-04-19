import Joi from 'joi';
import { getFieldErrors } from '@/shared/helpers';

import { IParamErrors, IValidation } from '@/shared/protocols';
import { IUpdateAppointmentControllerRequestBody } from '@/modules/appointments/controllers';
import { fieldsValidations } from './fieldsValidations';

export class JoiUpdateAppointmentValidator implements IValidation {
  validate(params: IUpdateAppointmentControllerRequestBody): IParamErrors {
    const { name, birth_date, appointment_date } = fieldsValidations;

    const schema = Joi.object({
      name,
      birth_date,
      appointment_date,
      vaccinated: Joi.boolean().strict().required().messages({
        'boolean.base': '`vaccinated` deve ser do tipo `boolean`',
        'any.required': '`vaccinated` deve ser enviado',
      }),
    });

    return getFieldErrors(schema.validate(params, { abortEarly: false }));
  }
}
