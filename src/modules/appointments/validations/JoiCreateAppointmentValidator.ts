import Joi from 'joi';
import { getFieldErrors } from '@/shared/helpers';

import { IParamErrors, IValidation } from '@/shared/protocols';
import { ICreateAppointmentControllerRequest } from '@/modules/appointments/controllers';
import { fieldsValidations } from './fieldsValidations';

export class JoiCreateAppointmentValidator implements IValidation {
  validate(params: ICreateAppointmentControllerRequest): IParamErrors {
    const { name, birth_date, appointment_date } = fieldsValidations;

    const schema = Joi.object({ name, birth_date, appointment_date });

    return getFieldErrors(schema.validate(params, { abortEarly: false }));
  }
}
