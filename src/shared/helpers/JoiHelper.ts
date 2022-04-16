import Joi from 'joi';
import { IParamErrors } from '@/shared/protocols';

export const getFieldErrors = (fields: Joi.ValidationResult): IParamErrors => {
  const errors: IParamErrors = {};
  if (fields.error) {
    fields.error.details.forEach(error => {
      errors[error.path.join('.')] = error.message;
    });
  }
  return errors;
};
